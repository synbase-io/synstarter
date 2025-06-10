/**
 * Creates a URL-friendly slug from any string.
 *
 * @example slugify("A really c0nfusing <string>! $$$"); // a-really-c0nfusing-string
 */
export function slugify(value: string): string {
    // First convert to lowercase and trim
    const processed = value.trim().toLowerCase();

    // Replace special characters with a space
    const spacedString = processed.replace(/[^a-z0-9\s-]/g, " ");

    // Convert spaces to dashes and clean up multiple dashes
    return spacedString
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-") // Replace multiple dashes with single dash
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}
