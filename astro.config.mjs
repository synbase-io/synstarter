import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import logger from "@inox-tools/runtime-logger";
import tailwindcss from "@tailwindcss/vite";
import https from "@vitejs/plugin-basic-ssl";
import favicon from "astro-favicons";
import { defineConfig, fontProviders } from "astro/config";

const siteUrl = process.env.SITE_URL ?? "https://localhost:4321";

/** @type {import('astro').AstroConfig} */
export default defineConfig({
    site: siteUrl,
    adapter: node({ mode: "standalone" }),
    integrations: [
        react({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        favicon(),
        logger(),
        sitemap(),
        mdx(),
    ],
    experimental: {
        fonts: [
            {
                name: "JetBrains Mono",
                cssVariable: "--font-jetbrains-mono",
                provider: fontProviders.fontsource(),
                subsets: ["latin"],
                fallbacks: ["monospace"],
            },
        ],
    },
    env: {
        schema: {
            ASTRO_KEY: {
                context: "server",
                access: "secret",
                type: "string",
            },
            TURSO_DB_URL: {
                context: "server",
                access: "secret",
                type: "string",
            },
            TURSO_DB_AUTH_TOKEN: {
                context: "server",
                access: "secret",
                type: "string",
            },
            SITE_URL: {
                context: "server",
                access: "public",
                type: "string",
                default: siteUrl,
            },
        },
    },
    vite: {
        plugins: [https(), tailwindcss()],
        server: {
            https: import.meta.env.DEV,
        },
    },
});
