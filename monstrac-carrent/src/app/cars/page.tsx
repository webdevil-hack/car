import { prisma } from "@/lib/prisma";

export default async function CarsPage() {
  const cars = await prisma.car.findMany({
    take: 12,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Explore Cars</h1>
      <p className="mt-2 text-[var(--muted)]">Quick demo list. Filters coming next.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {cars.map((car) => (
          <div key={car.id} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="aspect-[16/10] rounded-xl bg-[radial-gradient(400px_200px_at_60%_-10%,rgba(77,243,255,.14),transparent)]" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted)]">{car.brand}</p>
                <p className="font-medium">{car.title}</p>
              </div>
              <p className="text-right"><span className="text-lg font-semibold">${String(car.priceDay)}</span><span className="text-sm text-[var(--muted)]">/day</span></p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
