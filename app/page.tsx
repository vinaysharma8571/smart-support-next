import Header from "@/components/Header";
import StatCard from "@/components/StatCard";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-1 text-gray-500">
          Welcome back! Here is what is happening with your support system.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="Total Tickets" value={99} />
          <StatCard title="Open Tickets" value={2} />
          <StatCard title="In Progress" value={1} />
          <StatCard title="Resolved" value={1} />
        </div>
      </main>
    </>
  );
}