"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";

export type Filters = {
  type?: string;
  seats?: string;
  transmission?: string;
  fuel?: string;
  withDriver?: boolean;
  minPrice?: number;
  maxPrice?: number;
};

export function FilterPanel({ onChange }: { onChange: (f: Filters) => void }) {
  const [filters, setFilters] = useState<Filters>({});

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onChange(next);
  }

  return (
    <aside className="glass sticky top-20 h-max rounded-2xl p-4">
      <div className="mb-3 text-sm font-medium">Filters</div>
      <div className="grid gap-3 text-sm">
        <Select aria-label="Type" onChange={(e) => update("type", e.target.value)}>
          <option value="">Car Type</option>
          <option>Hatchback</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Luxury</option>
          <option>Electric</option>
          <option>Vans</option>
        </Select>
        <Select aria-label="Seats" onChange={(e) => update("seats", e.target.value)}>
          <option value="">Seats</option>
          <option>2</option>
          <option>4</option>
          <option>5</option>
          <option>7</option>
        </Select>
        <Select aria-label="Transmission" onChange={(e) => update("transmission", e.target.value)}>
          <option value="">Transmission</option>
          <option>Auto</option>
          <option>Manual</option>
        </Select>
        <Select aria-label="Fuel" onChange={(e) => update("fuel", e.target.value)}>
          <option value="">Fuel type</option>
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </Select>
        <div className="flex items-center justify-between rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-3 py-2">
          <span className="text-zinc-400">With driver</span>
          <Toggle checked={!!filters.withDriver} onChange={(v) => update("withDriver", v)} />
        </div>
        <Input placeholder="Min price" type="number" onChange={(e) => update("minPrice", Number(e.target.value))} />
        <Input placeholder="Max price" type="number" onChange={(e) => update("maxPrice", Number(e.target.value))} />
      </div>
    </aside>
  );
}
