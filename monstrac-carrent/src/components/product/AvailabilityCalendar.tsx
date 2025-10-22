"use client";

import { useMemo } from "react";
import { addDays, format, isSameDay } from "date-fns";

export function AvailabilityCalendar({
  blockedDates = [],
}: {
  blockedDates?: Date[];
}) {
  const today = new Date();
  const days = useMemo(() => Array.from({ length: 28 }, (_, i) => addDays(today, i)), [today]);
  return (
    <div className="grid grid-cols-7 gap-1 text-xs">
      {days.map((d) => {
        const blocked = blockedDates.some((bd) => isSameDay(bd, d));
        return (
          <div
            key={d.toISOString()}
            className={`rounded-md border p-2 text-center ${
              blocked
                ? "border-[color:var(--border)]/60 bg-[color:var(--surface-2)]/40 text-zinc-500"
                : "border-[color:var(--border)] bg-[color:var(--surface)]/60"
            }`}
          >
            {format(d, "dd MMM")}
          </div>
        );
      })}
    </div>
  );
}
