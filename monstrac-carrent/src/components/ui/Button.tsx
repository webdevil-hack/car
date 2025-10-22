"use client";

import * as React from "react";
import {cn} from "@/lib/utils";

type StyleProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export type ButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & StyleProps & { href?: undefined })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & { href: string });

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-[color:var(--primary)] text-[color:var(--primary-contrast)] shadow-[0_0_24px_-6px] shadow-[color:var(--primary)] hover:brightness-110",
    outline:
      "border border-[color:var(--border)] text-foreground hover:bg-[color:var(--surface)]",
    ghost: "text-foreground hover:bg-[color:var(--surface)]/60",
  };
  const classes = cn(base, sizeClasses[size!], variants[variant!], className);
  if ("href" in props && props.href) {
    const { href, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
