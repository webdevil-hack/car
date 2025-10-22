import * as React from "react";
import {cn} from "@/lib/utils";

export function Badge({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-2.5 py-1 text-xs text-foreground",
        className
      )}
      {...props}
    />
  );
}

export default Badge;
