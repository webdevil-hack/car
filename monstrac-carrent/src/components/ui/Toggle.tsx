"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({checked, onChange, className, ...props}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex h-6 w-11 items-center rounded-full border border-[color:var(--border)] p-0.5 transition",
        checked ? "bg-[color:var(--primary)]" : "bg-[color:var(--surface)]",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "block h-5 w-5 rounded-full bg-white transition",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
