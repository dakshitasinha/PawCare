"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: string;
  pet_name: string;
  pet_type: string;
  area: string;
  start_date: string;
  end_date: string;
  notes: string;
  status: string;
};


export default function SitterDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);
  async function updateStatus(
  bookingId: string,
  status: "accepted" | "declined"
) {
  await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  loadBookings();
}

  async function loadBookings() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("sitter_id", user.id)
    .order("created_at", { ascending: false });

  if (data) {
    setBookings(data);
  }
}

  return (
    <main className="min-h-screen bg-[var(--cream)] p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-bold">
          Incoming Requests
        </h1>

        <p className="mb-8 text-black/60">
          Booking requests from pet owners.
        </p>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl bg-white p-6 shadow"
            >
              <h2 className="text-xl font-semibold">
                {booking.pet_name}
              </h2>

              <p>{booking.pet_type}</p>
              <p>{booking.area}</p>

              <p>
                {booking.start_date} → {booking.end_date}
              </p>

              <p className="mt-3 text-black/70">
                {booking.notes}
              </p>
            <p className="mt-3 font-medium">
  Status: {booking.status}
</p>

              <div className="mt-4 flex gap-3">
                <button
  onClick={() => updateStatus(booking.id, "accepted")}
  className="rounded-xl bg-green-200 px-4 py-2"
>
  Accept
</button>

                <button
  onClick={() => updateStatus(booking.id, "declined")}
  className="rounded-xl bg-red-200 px-4 py-2"
>
  Decline
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}