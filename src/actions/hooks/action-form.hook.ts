import ActionField from "@/actions/components/ActionField";
import useAction, { type UseActionOptions } from "@/actions/hooks/action.hook";
import {
    createFormHook,
    createFormHookContexts,
    type FormAsyncValidateOrFn,
    type FormOptions,
    type FormValidateOrFn,
} from "@tanstack/react-form";
import { isInputError, type ActionClient } from "astro:actions";
import type { z } from "astro:schema";
import { objectify } from "radash";

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm: useForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        ActionField,
    },
    formComponents: {},
});

interface UseActionFormOptions<
    TInputSchema extends z.ZodType,
    TOutput,
> /* extends Omit<Parameters<typeof useForm>[0], "defaultValues"> */ {
    schema: TInputSchema;
    action: ActionClient<TOutput, undefined, TInputSchema>;
    defaultValues: z.infer<TInputSchema>;
    formOptions?: Omit<
        FormOptions<
            z.infer<TInputSchema>,
            FormValidateOrFn<z.infer<TInputSchema>>,
            FormValidateOrFn<z.infer<TInputSchema>>,
            FormAsyncValidateOrFn<z.infer<TInputSchema>>,
            FormValidateOrFn<z.infer<TInputSchema>>,
            FormAsyncValidateOrFn<z.infer<TInputSchema>>,
            FormValidateOrFn<z.infer<TInputSchema>>,
            FormAsyncValidateOrFn<z.infer<TInputSchema>>,
            FormAsyncValidateOrFn<z.infer<TInputSchema>>
        >,
        "onSubmit"
    >;
    mutationOptions?: Omit<UseActionOptions<TInputSchema, TOutput>, "action" | "defaultValues">;
}

export default function useActionForm<TInputSchema extends z.ZodType, TOutput>({
    schema,
    action,
    defaultValues,
    formOptions,
    mutationOptions,
}: UseActionFormOptions<TInputSchema, TOutput>) {
    const actionMutation = useAction<TInputSchema, TOutput>({
        action,
        ...mutationOptions,
        onError: (error, variables, context) => {
            if (isInputError(error)) {
                // TODO: Test if this works with arrays
                return { fields: objectify(error.issues, (issue) => issue.path.join(".")) };
            }

            mutationOptions?.onError?.(error, variables, context);
        },
    });

    const actionForm = useForm({
        defaultValues,
        onSubmit: async ({ value }) => await actionMutation.mutateAsync(value),
        ...formOptions,
        validators: {
            onChange: schema,
            ...formOptions?.validators,
        },
    });

    return { mutation: actionMutation, form: actionForm };
}
