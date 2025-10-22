"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16 sm:px-10">
      <h1 className="mb-6 text-xl font-semibold">Log in</h1>
      <form onSubmit={onSubmit} className="glass grid gap-3 rounded-2xl p-6">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-400">{error}</div>}
        <Button type="submit">Continue</Button>
      </form>
    </main>
  );
}
