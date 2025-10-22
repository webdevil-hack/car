"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardPage() {
  const { data } = useSWR("/api/auth/session", fetcher);
  const user = data?.user;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      {user ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass rounded-2xl p-5">Welcome, {user.name}</div>
          <div className="glass rounded-2xl p-5">Upcoming bookings: 0</div>
          <div className="glass rounded-2xl p-5">Wallet balance: $0</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
