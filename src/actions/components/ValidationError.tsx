import { cn } from "@/ui/utils/cn";
import type { ComponentProps } from "react";

export interface ValidationErrorProps extends ComponentProps<"p"> {
    iconProps?: ComponentProps<"span">;
    messageProps?: ComponentProps<"p">;
}

export default function ValidationError(props: ValidationErrorProps) {
    const { children, iconProps, messageProps, ...divProps } = props;

    return (
        <div {...divProps} className={cn("text-error flex items-center gap-2", divProps.className)}>
            <span className="iconify material-symbols--error-rounded" {...iconProps} />

            <p {...messageProps} className={cn("font-bold", messageProps?.className)}>
                {children}
            </p>
        </div>
    );
}
