import { Card } from "@/components/ui/Card";

const steps = [
  { title: "Search", desc: "Set locations, dates and filters" },
  { title: "Select", desc: "Pick a vehicle and add-ons" },
  { title: "Pay & Drive", desc: "Complete payment and get going" },
];

export function HowItWorks() {
  return (
    <section id="about" className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-semibold">How it Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={s.title} className="p-5">
              <div className="mb-2 text-sm text-zinc-400">Step {i + 1}</div>
              <div className="text-lg font-medium">{s.title}</div>
              <div className="text-sm text-zinc-400">{s.desc}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
