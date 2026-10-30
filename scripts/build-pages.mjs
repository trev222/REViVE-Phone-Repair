import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { builtinModules } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const staging = await mkdtemp(join(root, ".pages-build-"));
const output = join(root, "out");

try {
  // Export an isolated copy. The normal Next.js server and contact route stay intact.
  await cp(join(root, "src"), join(staging, "src"), {
    recursive: true,
    filter: (path) => path !== join(root, "src/app/api"),
  });
  for (const file of [
    "public",
    "package.json",
    "tsconfig.json",
    "postcss.config.mjs",
    "tailwind.config.ts",
  ]) {
    await cp(join(root, file), join(staging, file), { recursive: true });
  }
  // Metadata routes also need explicit static generation in export mode.
  for (const name of ["sitemap.ts", "robots.ts", "manifest.ts"]) {
    const path = join(staging, "src/app", name);
    await writeFile(
      path,
      (await readFile(path, "utf8")) +
        '\nexport const dynamic = "force-static";\n',
    );
  }
  await writeFile(
    join(staging, "next.config.mjs"),
    'export default { output: "export", poweredByHeader: false };\n',
  );
  const result = spawnSync(
    process.execPath,
    [join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
    {
      cwd: staging,
      stdio: "inherit",
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    },
  );
  if (result.status !== 0) throw new Error("Next.js Pages export failed.");
  await rm(output, { recursive: true, force: true });
  await cp(join(staging, "out"), output, { recursive: true });

  // Bundle the shared, server-only contact handler into the Pages advanced-mode Function.
  const builtins = new Set(
    builtinModules.map((name) => name.replace(/^node:/, "")),
  );
  await build({
    entryPoints: [join(root, "cloudflare/worker.ts")],
    outfile: join(output, "_worker.js"),
    bundle: true,
    format: "esm",
    platform: "node",
    target: "es2022",
    minify: true,
    banner: {
      js: 'import { createRequire } from "node:module"; const require = createRequire("/_worker.js");',
    },
    plugins: [
      {
        name: "node-builtins",
        setup(builder) {
          builder.onResolve({ filter: /.*/ }, ({ path }) => {
            const name = path.replace(/^node:/, "");
            if (builtins.has(name))
              return { path: `node:${name}`, external: true };
          });
        },
      },
    ],
  });
  await writeFile(
    join(output, "_routes.json"),
    JSON.stringify({ version: 1, include: ["/api/contact"], exclude: [] }),
  );
  const redirects = [];
  for (const route of [
    "index",
    "about",
    "services",
    "location",
    "locations",
    "contact",
  ]) {
    const target =
      route === "index"
        ? "/"
        : route === "location"
          ? "/locations"
          : `/${route}`;
    for (const extension of [".php", ".html"])
      redirects.push(`/${route}${extension} ${target} 308`);
    if (["index", "location"].includes(route))
      redirects.push(`/${route} ${target} 308`);
  }
  await writeFile(join(output, "_redirects"), redirects.join("\n") + "\n");
  await writeFile(
    join(output, "_headers"),
    "/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n",
  );
  console.log("Cloudflare Pages deployment is ready in out/.");
} finally {
  await rm(staging, { recursive: true, force: true });
}
