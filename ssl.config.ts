import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Returns `cert` and `key` of local certificates, if found.
 *
 * This is meant to be used for local development only.
 * While on Azure, SSL is provided by the platform and this function just returns `null`.
 * Astro will start in `http`-mode but Azure proxies the request to use `https`.
 */
export function getHttpsConfig(
    args: { certPath: string; keyPath: string } = {
        certPath: join(process.cwd(), ".certs/localhost.pem"),
        keyPath: join(process.cwd(), ".certs/localhost-key.pem"),
    },
): {
    cert: Buffer;
    key: Buffer;
} | null {
    const { certPath, keyPath } = args;

    if (existsSync(certPath) && existsSync(keyPath)) {
        // Use mkcert certificates for trusted HTTPS
        return { cert: readFileSync(certPath), key: readFileSync(keyPath) };
    }

    // Fallback to basic SSL plugin if mkcert certificates don't exist
    console.warn(
        "⚠️  Local certificates not found. Using basic SSL plugin.\n" +
            "   To enable trusted certificates for Cursor's browser, run:\n" +
            `   mkdir .certs && mkcert -key-file ${keyPath} -cert-file ${certPath} localhost 127.0.0.1 ::1`,
    );

    return null;
}
