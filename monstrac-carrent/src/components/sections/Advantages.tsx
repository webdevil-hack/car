import { Card } from "@/components/ui/Card";

const items = [
  "Transparent pricing",
  "24/7 support",
  "Free cancellation (24h)",
  "Verified drivers",
  "Insurance included",
  "No hidden charges",
  "Easy refunds",
  "Clean & sanitized cars",
];

export function Advantages() {
  return (
    <section className="px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-xl font-semibold">Why Choose Us</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {items.map((label) => (
            <Card key={label} className="p-5 text-sm">{label}</Card>
          ))}
        </div>
      </div>
    </section>
  );
}
