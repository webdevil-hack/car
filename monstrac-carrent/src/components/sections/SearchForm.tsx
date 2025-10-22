"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

export function SearchForm() {
  const [withDriver, setWithDriver] = useState(false);
  return (
    <section id="search" className="px-6 pb-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-2xl p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Input placeholder="Pickup location" aria-label="Pickup location" />
            <Input placeholder="Drop-off location (optional)" aria-label="Drop-off location" />
            <Input type="datetime-local" aria-label="Pickup date and time" />
            <Input type="datetime-local" aria-label="Return date and time" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-5">
            <Select aria-label="Passengers">
              <option value="">Passengers</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </Select>
            <Select aria-label="Car type">
              <option value="">Car type</option>
              <option>Hatchback</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Luxury</option>
              <option>Electric</option>
              <option>Vans</option>
            </Select>
            <Input placeholder="Promo code" aria-label="Promo code" />
            <div className="flex items-center gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 px-3">
              <span className="text-sm text-zinc-400">Driver required?</span>
              <Toggle checked={withDriver} onChange={setWithDriver} />
            </div>
            <div className="flex items-stretch">
              <Button className="w-full">Search availability</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
