"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RolePage() {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  async function saveRole() {
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Not logged in");
      return;
    }

    const { error } = await supabase
  .from("profiles")
  .update({ role: role })
  .eq("id", user.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Role saved successfully");
    }
  
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Choose Your Role
        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => setRole("owner")}
            className={`p-4 rounded-xl border ${
              role === "owner" ? "bg-[var(--sage)]" : ""
            }`}
          >
            I am a Pet Owner
          </button>

          <button
            onClick={() => setRole("sitter")}
            className={`p-4 rounded-xl border ${
              role === "sitter" ? "bg-[var(--rose)]" : ""
            }`}
          >
            I am a Pet Sitter
          </button>

          <button
            onClick={saveRole}
            className="mt-4 rounded-xl bg-[var(--black)] p-3 text-white"
          >
            Save Role
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600">
              {message}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}