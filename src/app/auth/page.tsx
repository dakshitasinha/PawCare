"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function signUp() {
  setLoading(true);
  setMessage("");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    setLoading(false);
    return;
  }

  const user = data.user;

  if (user) {
    await supabase.from("profiles").insert({
      id: user.id,
      email: user.email,
      role: null,
    });
  }

  setMessage("Signup successful. Now login.");
  setLoading(false);
}

  async function signIn() {
  setLoading(true);
  setMessage("");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    setLoading(false);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (!profile?.role) {
    router.push("/role");
  } else if (profile.role === "owner") {
    router.push("/dashboard/owner");
  } else if (profile.role === "sitter") {
    router.push("/dashboard/sitter");
  }

  setLoading(false);
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-3xl font-bold text-center">
          PawCare Login
        </h1>

        <input
          className="mb-3 w-full rounded-xl border p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-xl border p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={signIn}
            disabled={loading}
            className="flex-1 rounded-xl bg-[var(--black)] p-3 text-white"
          >
            Login
          </button>

          <button
            onClick={signUp}
            disabled={loading}
            className="flex-1 rounded-xl bg-[var(--sage)] p-3 text-black"
          >
            Sign Up
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {message}
          </p>
        )}

      </div>
    </main>
  );
}