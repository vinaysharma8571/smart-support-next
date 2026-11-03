"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import TicketCard from "@/components/TicketCard";
import TicketForm from "@/components/TicketForm";
import TicketFilters, { Filters } from "@/components/TicketFilters";
import { apiRequest } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Ticket, TicketInput, TicketStatus } from "@/types/ticket";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user && "role" in user ? String(user.role) : "customer";

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "all",
    priority: "all",
    category: "all",
  });

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await apiRequest<Ticket[]>("/api/tickets");
        setTickets(data);
      } catch {
        setError("Could not load tickets. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

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

  async function handleCreateTicket(data: TicketInput) {
    try {
      const created = await apiRequest<Ticket>("/api/tickets", {
        method: "POST",
        body: JSON.stringify(data),
      });

      setTickets((current) => [...current, created]);
      setError("");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create ticket.");
      return false;
    }
  }

  async function handleUpdateTicket(updated: Ticket) {
    try {
      const saved = await apiRequest<Ticket>(`/api/tickets/${updated.id}`, {
        method: "PUT",
        body: JSON.stringify(updated),
      });

      setTickets((current) =>
        current.map((t) => (t.id === saved.id ? saved : t))
      );
      setEditingTicket(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update ticket.");
    }
  }

  async function handleStatusChange(id: number, status: TicketStatus) {
    try {
      const saved = await apiRequest<Ticket>(`/api/tickets/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });

      setTickets((current) =>
        current.map((t) => (t.id === saved.id ? saved : t))
      );
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change status.");
    }
  }

  async function handleDeleteTicket(id: number) {
    if (!window.confirm("Delete this ticket?")) return;

    try {
      await apiRequest(`/api/tickets/${id}`, { method: "DELETE" });

      setTickets((current) => current.filter((t) => t.id !== id));
      if (editingTicket?.id === id) setEditingTicket(null);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete ticket.");
    }
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

        {error && (
          <p className="mt-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-4 space-y-3">
          {loading ? (
            <p className="text-sm text-gray-500">Loading tickets...</p>
          ) : visibleTickets.length === 0 ? (
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
                role={role}
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