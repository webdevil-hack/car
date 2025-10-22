"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 border-b border-[color:var(--border)]/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 ${
        scrolled ? "bg-background/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--primary)] shadow-[0_0_24px] shadow-[color:var(--primary)]" />
          <span className="font-semibold tracking-tight">Monstrac CarRent</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#home" className="text-sm text-zinc-300 hover:text-white">
            Home
          </Link>
          <Link href="#cars" className="text-sm text-zinc-300 hover:text-white">
            Cars
          </Link>
          <Link href="#about" className="text-sm text-zinc-300 hover:text-white">
            About
          </Link>
          <Link href="#pricing" className="text-sm text-zinc-300 hover:text-white">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm text-zinc-300 hover:text-white">
            FAQ
          </Link>
          <Link href="#contact" className="text-sm text-zinc-300 hover:text-white">
            Contact
          </Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm text-foreground hover:bg-[color:var(--surface)]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-sm font-medium text-[color:var(--primary-contrast)] shadow-[0_0_24px_-6px] shadow-[color:var(--primary)] hover:brightness-110"
          >
            Sign up
          </Link>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[color:var(--border)]/60 px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {[
              ["Home", "#home"],
              ["Cars", "#cars"],
              ["About", "#about"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-zinc-300 hover:bg-[color:var(--surface)] hover:text-white"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-center text-sm text-foreground hover:bg-[color:var(--surface)]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-[color:var(--primary)] px-4 py-2 text-center text-sm font-medium text-[color:var(--primary-contrast)] shadow-[0_0_24px_-6px] shadow-[color:var(--primary)] hover:brightness-110"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}

export default TopNav;
