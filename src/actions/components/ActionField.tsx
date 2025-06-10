import ValidationError, { type ValidationErrorProps } from "@/actions/components/ValidationError";
import { useFieldContext } from "@/actions/hooks/action-form.hook";
import { cn } from "@/ui/utils/cn";
import type { ZodIssue } from "astro:schema";
import { type ComponentProps, type ReactNode } from "react";

export interface ActionFieldProps extends ComponentProps<"div"> {
    label: ReactNode;
    labelProps?: ComponentProps<"label">;
    description?: ReactNode;
    descriptionProps?: ComponentProps<"p">;
    validationErrorProps?: Partial<ValidationErrorProps>;
    inputProps?: ComponentProps<"div">;
    inputErrorClassName?: string;
}

/**
 * A re-useable field component that a streamlined appearance and error handling.
 *
 * Can be used by forms created by using `useActionForm()`.
 *
 * @example
 * <form.AppField name="title">
 *  {(appField) =>
 *      <appField.ActionField label="Title">
 *          <input value={field.meta.value} />
 *      </appField.ActionField>
 *  }
 * <form.AppField>
 */
export default function ActionField(props: ActionFieldProps) {
    const {
        children,
        label,
        labelProps,
        description,
        descriptionProps,
        validationErrorProps,
        inputProps,
        inputErrorClassName,
        ...divProps
    } = props;

    const field = useFieldContext();

    const showError =
        (field.form.state.submissionAttempts > 0 || field.state.meta.isBlurred) &&
        field.state.meta.errors.length > 0;

    return (
        <div
            {...divProps}
            className={cn(
                "flex flex-col gap-4 border-l-4 border-transparent pl-4",
                showError && "border-error",
                divProps.className,
            )}
        >
            <label
                htmlFor={field.name}
                {...labelProps}
                className={cn("text-xl font-semibold", labelProps?.className)}
            >
                {label}
            </label>

            {description && (
                <p
                    {...descriptionProps}
                    className={cn("text-base-content/60 text-sm", descriptionProps?.className)}
                >
                    {description}
                </p>
            )}

            <div
                {...inputProps}
                className={cn(showError && inputErrorClassName, inputProps?.className)}
            >
                {children}
            </div>

            {showError &&
                field.state.meta.errors.map(
                    (issue: ZodIssue, index) =>
                        issue && (
                            <ValidationError
                                key={`${field.name}-error-${index}`}
                                {...validationErrorProps}
                            >
                                {issue.message}
                            </ValidationError>
                        ),
                )}
        </div>
    );
}
