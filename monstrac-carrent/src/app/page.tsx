"use client";
import { motion } from "framer-motion";
import { ArrowRight, Car, SteeringWheel } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_60%_at_70%_10%,black,transparent)]">
          <div className="absolute inset-0 bg-[radial-gradient(600px_400px_at_80%_-10%,#18202c,transparent)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(77,243,255,.12)_120deg,transparent_240deg)]" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 md:grid-cols-2 md:py-36">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-balance text-5xl font-semibold tracking-tight md:text-6xl"
            >
              Monstrac CarRent
              <span className="block bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
                Dark. Fast. 3D.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-xl text-lg text-[var(--muted)]"
            >
              Enterprise-grade car rentals with real-time availability, 3D previews, and
              a neon-dark interface. Book in under a minute.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#search"
                className="group relative inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-base font-medium text-[var(--foreground)] shadow-[0_0_0_1px_rgba(77,243,255,.15)] transition-colors hover:border-transparent hover:bg-[color-mix(in_oklab,var(--accent)_10%,#0a0f14_90%)]"
              >
                <Car className="size-5 text-[var(--accent)]" />
                Search cars
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-base font-semibold text-black shadow-[0_10px_30px_-10px_rgba(77,243,255,.55)] transition-transform hover:scale-[1.02]"
              >
                Quick Book
              </a>
            </motion.div>

            <div className="mt-6 flex items-center gap-6 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <SteeringWheel className="size-4 text-[var(--accent)]" />
                Verified cars
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-[var(--success)]" />
                24/7 support
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-[var(--accent-2)]" />
                Insurance included
              </div>
            </div>
          </div>

          {/* Right side visual placeholder for 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[radial-gradient(800px_400px_at_60%_-10%,rgba(77,243,255,.12),transparent)] p-6"
          >
            <div className="absolute inset-0 -z-10 bg-[conic-gradient(from_200deg_at_50%_50%,rgba(155,125,255,.14),transparent)]" />
            <div className="absolute right-6 top-6 rounded-full bg-[rgba(77,243,255,.15)] px-3 py-1 text-xs text-[var(--accent)]">
              Live 3D Preview
            </div>
            <div className="grid h-full place-items-center text-center">
              <p className="text-sm text-[var(--muted)]">3D canvas placeholder — enable R3F later</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking/Search Form */}
      <section id="search" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="-mt-20 rounded-2xl border border-[var(--border)] bg-[var(--card)]/90 p-6 backdrop-blur-md md:p-8">
          <form className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <input aria-label="Pickup location" placeholder="Pickup location" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm" />
            <input aria-label="Drop-off location" placeholder="Drop-off location" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm" />
            <input aria-label="Pickup date & time" type="datetime-local" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm" />
            <input aria-label="Return date & time" type="datetime-local" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm" />
            <select aria-label="Passengers" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">
              {Array.from({ length: 7 }).map((_, i) => (
                <option key={i} value={i + 1}>{i + 1} pax</option>
              ))}
            </select>
            <button type="button" className="rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-black hover:brightness-105">Search</button>
            <div className="col-span-full grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              <select aria-label="Car type" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"><option>Any type</option></select>
              <input aria-label="Price max" type="number" placeholder="Max $/day" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm" />
              <select aria-label="Seats" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"><option>Any seats</option></select>
              <select aria-label="Fuel type" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"><option>Any fuel</option></select>
              <select aria-label="Transmission" className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"><option>Any</option></select>
              <label className="flex items-center gap-2 text-sm text-[var(--muted)]"><input type="checkbox" /> Driver required</label>
            </div>
          </form>
        </div>
      </section>

      {/* Top Categories */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Top Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {['Hatchback','Sedan','SUV','Luxury','Electric','Vans','Self-drive','With driver'].map((c)=> (
            <button key={c} className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-left hover:border-[var(--accent)]">{c}</button>
          ))}
        </div>
      </section>

      {/* Featured / Popular Cars */}
      <section id="featured" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Popular Picks</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1,2,3].map((i)=> (
            <div key={i} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="aspect-[16/10] rounded-xl bg-[radial-gradient(400px_200px_at_60%_-10%,rgba(155,125,255,.18),transparent)]" />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted)]">Tesla</p>
                  <p className="font-medium">Model 3</p>
                </div>
                <p className="text-right"><span className="text-lg font-semibold">$80</span><span className="text-sm text-[var(--muted)]">/day</span></p>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="rounded-full border border-[var(--border)] px-3 py-1">Best Seller</span>
                <button className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-black">Quick Book</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">How it Works</h2>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {["Search","Select car","Pay & Drive"].map((step, idx)=> (
            <li key={step} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <p className="text-sm text-[var(--muted)]">Step {idx+1}</p>
              <p className="text-lg font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Advantages */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Why Choose Us</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {['Transparent pricing','24/7 support','Free cancellation','Verified drivers','Insurance included','No hidden charges','Easy refunds','Clean cars'].map((a)=> (
            <div key={a} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm">{a}</div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Loved by customers</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1,2,3].map(i => (
            <blockquote key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">“Fantastic experience, smooth booking and clean cars.”</blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">FAQ</h2>
        <details className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><summary className="cursor-pointer font-medium">What is the cancellation policy?</summary><p className="mt-2 text-sm text-[var(--muted)]">Free cancellation up to 24 hours before pickup.</p></details>
        <details className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><summary className="cursor-pointer font-medium">Do I need a deposit?</summary><p className="mt-2 text-sm text-[var(--muted)]">Refundable deposit is shown at checkout.</p></details>
      </section>

      {/* Promo Strip */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(90deg,rgba(77,243,255,.18),rgba(155,125,255,.18))] p-6 text-center md:p-8">
          <p className="text-lg">Refer & Earn — Get $20 credits for each friend</p>
        </div>
      </section>
    </main>
  );
}
