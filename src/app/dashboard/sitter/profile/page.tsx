"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SitterProfilePage() {
  const [fullName, setFullName] = useState("");
  const [area, setArea] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState("");

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        area,
        bio,
        experience,
        photo_url: photoUrl,
      })
      .eq("id", user.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile saved");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] p-8">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Edit Sitter Profile
        </h1>

        <div className="space-y-4">
          <input
            className="w-full rounded-xl border p-3"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <textarea
            className="w-full rounded-xl border p-3"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button
            onClick={saveProfile}
            className="w-full rounded-xl bg-[var(--sage)] py-3"
          >
            Save Profile
          </button>

          {message && (
            <p className="text-center text-sm">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}