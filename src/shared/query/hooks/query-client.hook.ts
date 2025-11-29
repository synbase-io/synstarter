import { queryClientAtom } from "@/shared/query/stores/query-client.store";
import { useStore } from "@nanostores/react";

export function useQueryClient() {
    const queryClient = useStore(queryClientAtom);

    return queryClient;
}
