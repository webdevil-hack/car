"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 py-28 sm:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Monstrac CarRent
+            <span className="block text-lg font-normal text-[color:var(--muted-foreground)] sm:text-xl">
+              Dark-theme, high-animation, 3D-accents car rentals
+            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.06, ease: "easeOut" }}
            className="max-w-prose text-zinc-400"
          >
            Search, compare and book premium vehicles with transparent pricing, 24/7 support
            and instant confirmations.
          </motion.p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#search">{t("en", "search_cars")}</Button>
            <Button variant="outline" href="#featured">{t("en", "explore_popular")}</Button>
          </div>
          <div className="mt-4 flex items-center gap-6 text-sm text-zinc-400">
            <span className="neon">24/7 Support</span>
            <span>Insurance Included</span>
            <span>Verified Cars</span>
          </div>
        </div>
        <div className="relative h-[320px] w-full md:h-[440px]">
          <div className="glass absolute inset-0 rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(0,229,255,0.15),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(124,77,255,0.15),transparent_40%)]" />
          <div className="absolute inset-0 rounded-3xl border border-[color:var(--border)]/70" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-6 rounded-2xl bg-gradient-to-tr from-[#06141a] to-[#110a1d]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
