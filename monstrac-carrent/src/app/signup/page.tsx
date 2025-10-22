"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Signup failed");
      return;
    }
    setMessage("Account created. You can now log in.");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16 sm:px-10">
      <h1 className="mb-6 text-xl font-semibold">Sign up</h1>
      <form onSubmit={onSubmit} className="glass grid gap-3 rounded-2xl p-6">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {message && <div className="text-sm text-zinc-300">{message}</div>}
        <Button type="submit">Create account</Button>
      </form>
    </main>
  );
}
