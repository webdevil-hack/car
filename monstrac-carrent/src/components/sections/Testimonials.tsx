import { Card } from "@/components/ui/Card";

const testimonials = [
  { name: "Riya, Mumbai", text: "Smooth booking and great support!" },
  { name: "Arjun, Bengaluru", text: "Best prices and clean cars." },
  { name: "Neha, Delhi", text: "Instant confirmation and easy pickup." },
];

export function Testimonials() {
  return (
    <section className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-semibold">Customer Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-5">
              <div className="text-sm text-zinc-400">{t.name}</div>
              <div className="mt-1">“{t.text}”</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
