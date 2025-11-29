import type { AstroIntegrationLogger } from "astro";
import chalk from "chalk";

/**
 * Logs a debug message using the Astro integration logger.
 *
 * @param {AstroIntegrationLogger} logger - The Astro integration logger instance
 * @param {...any} args - Arguments to be formatted and logged
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log(logger: AstroIntegrationLogger, ...args: any[]): void {
    logger.info(chalk.gray(args.join(" ")));
}

/**
 * Logs an informational message using the Astro integration logger.
 *
 * @param {AstroIntegrationLogger} logger - The Astro integration logger instance
 * @param {...any} args - Arguments to be formatted and logged
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function info(logger: AstroIntegrationLogger, ...args: any[]): void {
    logger.info(args.join(" "));
}

/**
 * Logs an error message in red using the Astro integration logger.
 *
 * @param {AstroIntegrationLogger} logger - The Astro integration logger instance
 * @param {...any} args - Arguments to be formatted and logged
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fail(logger: AstroIntegrationLogger, ...args: any[]): void {
    logger.error(chalk.red(args.join(" ")));
}

/**
 * Logs a warning message in yellow using the Astro integration logger.
 *
 * @param {AstroIntegrationLogger} logger - The Astro integration logger instance
 * @param {...any} args - Arguments to be formatted and logged
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function warn(logger: AstroIntegrationLogger, ...args: any[]): void {
    logger.warn(chalk.yellow(args.join(" ")));
}

/**
 * Logs a success message in green using the Astro integration logger.
 *
 * @param {AstroIntegrationLogger} logger - The Astro integration logger instance
 * @param {...any} args - Arguments to be formatted and logged
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function success(logger: AstroIntegrationLogger, ...args: any[]): void {
    logger.info(chalk.green(args.join(" ")));
}
