import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const cars = [
  { id: 1, name: "Tesla Model 3", price: 89, badge: "Best Seller" },
  { id: 2, name: "BMW X5", price: 120 },
  { id: 3, name: "Audi A6", price: 110 },
  { id: 4, name: "Toyota Fortuner", price: 80 },
];

export function Featured() {
  return (
    <section id="featured" className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-semibold">Popular Cars</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {cars.map((car) => (
            <Card key={car.id} className="group p-5 transition hover:-translate-y-1">
              <div className="mb-3 h-32 rounded-lg bg-gradient-to-tr from-[#06141a] to-[#110a1d]" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{car.name}</div>
                  <div className="text-sm text-zinc-400">${car.price}/day</div>
                </div>
                {car.badge && <Badge>{car.badge}</Badge>}
              </div>
              <div className="mt-3 text-sm text-[color:var(--muted-foreground)]">AC • GPS • Auto</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
