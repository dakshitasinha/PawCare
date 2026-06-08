"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role === "owner") {
        router.push("/dashboard/owner");
      } else if (data?.role === "sitter") {
        router.push("/dashboard/sitter");
      } else {
        router.push("/role");
      }
    }

    checkUser();
  }, []);

  return <p className="p-6">Redirecting...</p>;
}