import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)]/60 bg-[color:var(--surface-2)]/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--primary)] shadow-[0_0_24px] shadow-[color:var(--primary)]" />
            <span className="font-semibold tracking-tight">Monstrac CarRent</span>
          </div>
          <p className="text-sm text-zinc-400">High-performance rentals. Transparent pricing. 24/7 support.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#careers">Careers</Link></li>
            <li><Link href="#press">Press</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="#help">Help Center</Link></li>
            <li><Link href="#policy">Cancellation Policy</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li><Link href="#terms">Terms</Link></li>
            <li><Link href="#privacy">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)]/60 px-4 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Monstrac. All rights reserved.
      </div>
    </footer>
  );
}
