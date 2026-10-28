import { handleContact, type ContactEnvironment } from "../src/lib/contact";

type Environment = ContactEnvironment & {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

export default {
  async fetch(request: Request, environment: Environment): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Use the contact form to send a message." },
          { status: 405, headers: { Allow: "POST" } },
        );
      }
      const response = await handleContact(request, environment);
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
    if (url.pathname.startsWith("/api/")) {
      return Response.json({ error: "Not found." }, { status: 404 });
    }
    return environment.ASSETS.fetch(request);
  },
};
