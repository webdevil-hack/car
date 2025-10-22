"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({className, children, ...props}, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";
