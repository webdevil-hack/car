"use client";

import { useMemo, useState } from "react";
import { CarCard, type Car } from "@/components/catalog/CarCard";
import { FilterPanel, type Filters } from "@/components/catalog/FilterPanel";

const allCars: Car[] = [
  { id: "1", name: "Tesla Model 3", model: "2024", seats: 5, transmission: "Auto", fuel: "Electric", pricePerDay: 89, rating: 4.8, badge: "Best Seller" },
  { id: "2", name: "BMW X5", model: "2023", seats: 5, transmission: "Auto", fuel: "Diesel", pricePerDay: 120, rating: 4.7 },
  { id: "3", name: "Audi A6", model: "2022", seats: 5, transmission: "Auto", fuel: "Petrol", pricePerDay: 110, rating: 4.6 },
  { id: "4", name: "Toyota Fortuner", model: "2021", seats: 7, transmission: "Manual", fuel: "Diesel", pricePerDay: 80, rating: 4.5 },
  { id: "5", name: "Hyundai i20", model: "2024", seats: 5, transmission: "Manual", fuel: "Petrol", pricePerDay: 35, rating: 4.3 },
];

function matches(car: Car, f: Filters) {
  if (f.seats && String(car.seats) !== f.seats) return false;
  if (f.transmission && car.transmission !== f.transmission) return false;
  if (f.fuel && car.fuel !== f.fuel) return false;
  if (typeof f.minPrice === "number" && f.minPrice > 0 && car.pricePerDay < f.minPrice) return false;
  if (typeof f.maxPrice === "number" && f.maxPrice > 0 && car.pricePerDay > f.maxPrice) return false;
  return true;
}

export default function CarsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const cars = useMemo(() => allCars.filter((c) => matches(c, filters)), [filters]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl gap-6 px-6 py-10 sm:px-10 md:grid md:grid-cols-[280px_1fr]">
      <div className="md:order-1">
        <FilterPanel onChange={setFilters} />
      </div>
      <section className="order-1">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Cars</h1>
          <div className="text-sm text-zinc-400">{cars.length} results</div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}
