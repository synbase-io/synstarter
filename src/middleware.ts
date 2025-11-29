import { sequence } from "astro:middleware";

// Add middleware here
// It's recommended to save the middleware result to the `Astro.locals` object.
// You can change the type of the `Astro.locals` object by modifying the `App.Locals` interface in `/src/env.d.ts`.
export const onRequest = sequence();
