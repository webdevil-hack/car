"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function OwnerPage() {
  const { data } = useSWR("/api/auth/session", fetcher);
  const user = data?.user;

  if (!user) return <main className="px-6 py-10">Loading...</main>;
  if (user.role !== "OWNER" && user.role !== "ADMIN")
    return (
      <main className="px-6 py-10">You do not have access to Owner area.</main>
    );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <h1 className="mb-4 text-2xl font-semibold">Owner/Admin Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-5">Total earnings: $0</div>
        <div className="glass rounded-2xl p-5">Active cars: 0</div>
        <div className="glass rounded-2xl p-5">Occupancy: 0%</div>
      </div>
    </main>
  );
}
