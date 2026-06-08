export default function OwnerDashboard() {
  const sitters = [
    {
      id: 1,
      name: "Priya Sharma",
      area: "Madhapur",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Priya",
    },
    {
      id: 2,
      name: "Rahul Verma",
      area: "Gachibowli",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul",
    },
    {
      id: 3,
      name: "Ananya Reddy",
      area: "Kondapur",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ananya",
    },
  ];

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
                src={sitter.image}
                alt={sitter.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  {sitter.name}
                </h2>

                <p className="mt-2 text-black/60">
                  {sitter.area}
                </p>

                <button className="mt-5 w-full rounded-2xl bg-[var(--sage)] py-3 font-medium">
                  Request Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}