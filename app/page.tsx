"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import TicketCard from "@/components/TicketCard";
import TicketForm from "@/components/TicketForm";
import TicketFilters, { Filters } from "@/components/TicketFilters";
import { sampleTickets } from "@/data/sampleTickets";
import { Ticket, TicketStatus } from "@/types/ticket";

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "all",
    priority: "all",
    category: "all",
  });

  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter((t) => t.status === "in-progress").length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;

  const searchText = filters.search.toLowerCase().trim();

  const visibleTickets = tickets.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchText) ||
      t.name.toLowerCase().includes(searchText) ||
      t.email.toLowerCase().includes(searchText) ||
      t.description.toLowerCase().includes(searchText);

    const matchesStatus = filters.status === "all" || t.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || t.priority === filters.priority;
    const matchesCategory =
      filters.category === "all" || t.category === filters.category;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  function handleCreateTicket(ticket: Ticket) {
    setTickets([...tickets, ticket]);
  }

  function handleUpdateTicket(updated: Ticket) {
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTicket(null);
  }

  function handleDeleteTicket(id: number) {
    setTickets(tickets.filter((t) => t.id !== id));
    if (editingTicket?.id === id) setEditingTicket(null);
  }

  function handleStatusChange(id: number, status: TicketStatus) {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function handleEditTicket(ticket: Ticket) {
    setEditingTicket(ticket);
    document
      .getElementById("ticket-form")
      ?.scrollIntoView({ behavior: "smooth" });
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

        <div id="ticket-form" className="mt-10">
          <TicketForm
            key={editingTicket?.id ?? "new"}
            editingTicket={editingTicket}
            onCreate={handleCreateTicket}
            onUpdate={handleUpdateTicket}
            onCancelEdit={() => setEditingTicket(null)}
          />
        </div>

        <h3 className="mt-10 text-xl font-bold">Recent Tickets</h3>

        <TicketFilters filters={filters} onChange={setFilters} />

        <div className="mt-4 space-y-3">
          {visibleTickets.length === 0 ? (
            <p className="text-sm text-gray-500">
              {tickets.length === 0
                ? "No tickets yet. Create your first ticket above."
                : "No tickets found. Try changing your search or filters."}
            </p>
          ) : (
            visibleTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onDelete={handleDeleteTicket}
                onEdit={handleEditTicket}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}