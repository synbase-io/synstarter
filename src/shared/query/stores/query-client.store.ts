import { QueryClient } from "@tanstack/react-query";
import { atom } from "nanostores";

// TODO: Add error handling for 401 Unauthorized. Redirect to login page using the callbackURL parameter.
export const queryClientAtom = atom(
    new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnMount: false,
                refetchOnReconnect: false,
                refetchOnWindowFocus: false,
                retry: 2,
            },
        },
    }),
);
