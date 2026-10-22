"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import TicketCard from "@/components/TicketCard";
import TicketForm from "@/components/TicketForm";
import { sampleTickets } from "@/data/sampleTickets";
import { Ticket } from "@/types/ticket";

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets);

  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter((t) => t.status === "in-progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

  function handleCreateTicket(ticket: Ticket) {
    setTickets([...tickets, ticket]);
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-1 text-gray-500">
          Welcome back! Here is what is happening with your support system.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard title="Total Tickets" value={totalCount} />
          <StatCard title="Open Tickets" value={openCount} />
          <StatCard title="In Progress" value={inProgressCount} />
          <StatCard title="Resolved" value={resolvedCount} />
        </div>

        <div className="mt-10">
          <TicketForm onCreate={handleCreateTicket} />
        </div>

        <h3 className="mt-10 text-xl font-bold">Recent Tickets</h3>

        <div className="mt-4 space-y-3">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </main>
    </>
  );
}