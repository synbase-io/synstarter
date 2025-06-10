import { useQueryClient } from "@/ui/hooks/query-client.hook";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { ActionError, type ActionClient } from "astro:actions";
import type { z } from "astro:schema";

export interface UseActionOptions<TInputSchema extends z.ZodType, TOutput>
    extends Omit<
        UseMutationOptions<TOutput, Error, z.infer<TInputSchema>>,
        "mutationKey" | "mutationFn"
    > {
    action: ActionClient<TOutput, undefined, TInputSchema>;
}

export default function useAction<TInputSchema extends z.ZodType, TOutput>(
    options: UseActionOptions<TInputSchema, TOutput>,
) {
    const { action, ...mutationOptions } = options;

    const queryClient = useQueryClient();

    const mutation = useMutation<TOutput, ActionError, z.infer<TInputSchema>>(
        {
            mutationFn: async (input) => {
                const { data, error } = await action(input);

                if (error) {
                    throw error;
                }

                if (!data) {
                    throw new Error("Action didn't respond any content.");
                }

                return data;
            },
            ...mutationOptions,
        },
        queryClient,
    );

    return mutation;
}
