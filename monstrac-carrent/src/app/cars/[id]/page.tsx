"use client";

import { useMemo, useState } from "react";
import { AvailabilityCalendar } from "@/components/product/AvailabilityCalendar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const sample = {
  id: "1",
  title: "Tesla Model 3 Performance",
  priceDay: 95,
  priceHour: 15,
  deposit: 200,
  specs: {
    make: "Tesla",
    model: "Model 3",
    year: 2024,
    fuel: "Electric",
    transmission: "Auto",
    seats: 5,
  },
};

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const blocked = useMemo(() => [new Date(Date.now() + 86400000 * 2), new Date(Date.now() + 86400000 * 5)], []);
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");
  const [pickupLoc, setPickupLoc] = useState<string>("");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <div className="grid gap-8 md:grid-cols-[1fr_380px]">
        <section>
          <div className="mb-4 h-72 w-full rounded-2xl bg-gradient-to-tr from-[#06141a] to-[#110a1d]" />
          <h1 className="mb-2 text-2xl font-semibold">{sample.title}</h1>
          <div className="grid gap-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-4 text-sm text-zinc-300 md:grid-cols-2">
            <div>Make: {sample.specs.make}</div>
            <div>Model: {sample.specs.model}</div>
            <div>Year: {sample.specs.year}</div>
            <div>Fuel: {sample.specs.fuel}</div>
            <div>Transmission: {sample.specs.transmission}</div>
            <div>Seats: {sample.specs.seats}</div>
          </div>
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-medium">Availability</h2>
            <AvailabilityCalendar blockedDates={blocked} />
          </div>
        </section>
        <aside className="h-max rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)]/30 p-5">
          <div className="mb-3 text-lg font-semibold">Reserve now</div>
          <div className="grid gap-3">
            <Input type="datetime-local" value={pickup} onChange={(e) => setPickup(e.target.value)} aria-label="Pickup" />
            <Input type="datetime-local" value={dropoff} onChange={(e) => setDropoff(e.target.value)} aria-label="Return" />
            <Input placeholder="Pickup location" value={pickupLoc} onChange={(e) => setPickupLoc(e.target.value)} />
            <Select aria-label="Add-ons">
              <option value="">Add-ons</option>
              <option>Driver per day</option>
              <option>Child seat</option>
              <option>Insurance upgrade</option>
            </Select>
            <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-3 text-sm text-zinc-300">
              <div className="flex items-center justify-between"><span>Daily</span><span>${sample.priceDay}</span></div>
              <div className="flex items-center justify-between"><span>Deposit</span><span>${sample.deposit}</span></div>
              <div className="flex items-center justify-between"><span>Taxes</span><span>$14</span></div>
              <div className="mt-2 flex items-center justify-between font-medium"><span>Total</span><span>$109</span></div>
            </div>
            <Button>Proceed to payment</Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
