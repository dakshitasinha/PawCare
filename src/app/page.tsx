import { supabase } from "../lib/supabase";

export default function Home() {
  console.log("Supabase client:", supabase);

  return (
    <main className="p-10">
      <h1>PawCare Connected</h1>
    </main>
  );
}