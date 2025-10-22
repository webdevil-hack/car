"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type = "text", ...props}, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-11 w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-3 text-sm text-foreground placeholder:text-[color:var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
