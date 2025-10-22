import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export type Car = {
  id: string;
  name: string;
  model: string;
  seats: number;
  transmission: "Auto" | "Manual";
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  pricePerDay: number;
  rating: number;
  badge?: string;
};

export function CarCard({ car }: { car: Car }) {
  return (
    <Card className="group p-5 transition hover:-translate-y-1">
      <div className="mb-3 h-36 rounded-lg bg-gradient-to-tr from-[#06141a] to-[#110a1d]" />
      <div className="flex items-start justify-between">
        <div>
          <div className="font-medium">{car.name}</div>
          <div className="text-sm text-zinc-400">{car.model} • {car.seats} seats</div>
        </div>
        {car.badge && <Badge>{car.badge}</Badge>}
      </div>
      <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
        <span>
          {car.transmission} • {car.fuel}
        </span>
        <span className="text-foreground font-medium">${car.pricePerDay}/day</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <a className="text-[color:var(--primary)] hover:underline" href={`/cars/${car.id}`}>View details</a>
        <button className="text-sm text-zinc-300 hover:text-white">Quick book</button>
      </div>
    </Card>
  );
}
