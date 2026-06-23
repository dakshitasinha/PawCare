"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewBookingPage() {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [area, setArea] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
const sitterId = searchParams.get("sitterId");

  async function createBooking() {
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first");
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      owner_id: user.id,
      sitter_id: sitterId,
      pet_name: petName,
      pet_type: petType,
      area,
      start_date: startDate,
      end_date: endDate,
      notes,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Booking request created");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--cream)] p-8">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold">
          New Booking Request
        </h1>

        <div className="space-y-4">

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Pet Type"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />

          <input
            className="w-full rounded-xl border p-3"
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <input
            type="date"
            className="w-full rounded-xl border p-3"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="w-full rounded-xl border p-3"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <textarea
            className="w-full rounded-xl border p-3"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            onClick={createBooking}
            className="w-full rounded-xl bg-[var(--sage)] py-3"
          >
            Create Booking
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