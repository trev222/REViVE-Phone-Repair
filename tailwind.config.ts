import type { Config } from "tailwindcss";

const color = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: Object.fromEntries(
        [
          "background",
          "foreground",
          "card",
          "card-foreground",
          "primary",
          "primary-foreground",
          "secondary",
          "secondary-foreground",
          "muted",
          "muted-foreground",
          "accent",
          "accent-foreground",
          "border",
          "input",
          "ring",
        ].map((name) => [name, color(name)]),
      ),
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
