import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import logger from "@inox-tools/runtime-logger";
import tailwindcss from "@tailwindcss/vite";
import https from "@vitejs/plugin-basic-ssl";
import favicon from "astro-favicons";
import { defineConfig, fontProviders } from "astro/config";
import { getHttpsConfig } from "./ssl.config.ts";

const site = process.env.SITE_URL ? `https://${process.env.SITE_URL}` : "https://localhost:4321";

const httpsConfig = getHttpsConfig();

/** @type {import('astro').AstroConfig} */
export default defineConfig({
    site,
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
            DB_URL: {
                context: "server",
                access: "secret",
                type: "string",
            },
            DB_AUTH_TOKEN: {
                context: "server",
                access: "secret",
                type: "string",
            },
            DB_REPLICA_PATH: {
                context: "server",
                access: "secret",
                type: "string",
                optional: true,
            },
            DB_REPLICA_SYNC_INTERVAL: {
                context: "server",
                access: "secret",
                type: "number",
                optional: true,
            },
            SITE_URL: {
                context: "server",
                access: "public",
                type: "string",
                default: site,
            },
        },
    },
    vite: {
        plugins: [...(import.meta.env.DEV && !httpsConfig ? [https()] : []), tailwindcss()],
        server: {
            https: httpsConfig,
        },
    },
});
