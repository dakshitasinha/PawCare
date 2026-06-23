"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Booking = {
  id: string;
  pet_name: string;
  status: string;
};
type Sitter = {
  id: string;
  full_name: string;
  area: string;
  photo_url: string;
};

export default function OwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sitters, setSitters] = useState<Sitter[]>([]);

useEffect(() => {
  loadBookings();
  loadSitters();
}, []);

async function loadBookings() {
  const { data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from("bookings")
    .select("id, pet_name, status")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (data) {
    setBookings(data);
  }
}

async function loadSitters() {
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, area, photo_url")
    .eq("role", "sitter")
.not("full_name", "is", null);

  if (data) {
    setSitters(data);
  }
}
  return (
    <main className="min-h-screen bg-[var(--cream)] p-8">
      <div className="mx-auto max-w-6xl">
       <h1 className="mb-3 text-center text-5xl font-bold">
          Find a Pet Sitter
        </h1>

        <p className="mb-12 text-center text-black/60">
          Browse trusted sitters near you.
        </p>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sitters.map((sitter) => (
            <div
              key={sitter.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={sitter.photo_url}
                alt={sitter.full_name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  {sitter.full_name}
                </h2>

                <p className="mt-2 text-black/60">
                  {sitter.area}
                </p>

                <Link
  href={`/bookings/new?sitterId=${sitter.id}`}
  className="mt-5 block w-full rounded-2xl bg-[var(--sage)] py-3 text-center font-medium"
>
  Request Booking
</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
  <h2 className="mb-6 text-3xl font-bold">
    My Booking Requests
  </h2>

  <div className="space-y-4">
    {bookings.map((booking) => (
      <div
        key={booking.id}
        className="rounded-3xl bg-white p-6 shadow"
      >
        <h3 className="text-xl font-semibold">
          {booking.pet_name}
        </h3>

        <p className="mt-2 font-medium">
          Status: {booking.status}
        </p>
      </div>
    ))}
  </div>
</div>
      </div>
    </main>
  );
}