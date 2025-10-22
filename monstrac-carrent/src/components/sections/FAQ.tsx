import { Card } from "@/components/ui/Card";

const items = [
  { q: "What is the cancellation policy?", a: "Free cancellation up to 24 hours before pickup." },
  { q: "Do I need a deposit?", a: "Yes, a refundable deposit may apply depending on vehicle." },
  { q: "What documents are required?", a: "A valid driving license and government ID." },
  { q: "Age limits?", a: "Minimum age 21 years for most vehicles." },
];

export function FAQ() {
  return (
    <section id="faq" className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-semibold">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((f) => (
            <Card key={f.q} className="p-5">
              <div className="font-medium">{f.q}</div>
              <div className="text-sm text-zinc-400">{f.a}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
