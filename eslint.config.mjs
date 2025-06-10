import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config} */
export default ts.config(
    js.configs.recommended,
    ts.configs.recommended,
    {
        files: ["*.js", "*.ts", "*.mjs"],
        language:{
            env: "node"
        }
    },
    {
        files: ["*.jsx", "*.tsx"],
        extends: [react.configs.flat.recommended],
        settings: { react: { version: "detect" } },
    },
    {
        files: ["*.jsx", "*.tsx"],
        plugins: {
            reactCompiler,
        },
    },
    {
        files: ["*.astro"],
        plugins: {
            astro,
        },
        extends: [
            astro.configs.recommended,
        ],
    },
    prettier,
);
