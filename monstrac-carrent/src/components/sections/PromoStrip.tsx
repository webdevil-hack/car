export function PromoStrip() {
  return (
    <section className="px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="glass flex items-center justify-between rounded-2xl p-5">
          <div>
            <div className="text-sm text-zinc-400">Limited-time offer</div>
            <div className="text-lg font-medium">Refer & earn up to $50 credits</div>
          </div>
          <a href="#refer" className="text-sm text-[color:var(--primary)] hover:underline">
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}
