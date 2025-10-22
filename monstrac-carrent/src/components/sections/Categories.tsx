import { Card } from "@/components/ui/Card";

const categories = [
  "Hatchback",
  "Sedan",
  "SUV",
  "Luxury",
  "Electric",
  "Vans",
  "Self-drive",
  "With driver",
];

export function Categories() {
  return (
    <section id="cars" className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-semibold">Top Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((c) => (
            <Card key={c} className="cursor-pointer p-5 hover:bg-[color:var(--surface)]">
              <div className="flex items-center justify-between">
                <span>{c}</span>
                <span className="text-xs text-zinc-400">Explore →</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
