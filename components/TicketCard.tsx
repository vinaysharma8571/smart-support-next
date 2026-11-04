"use client";

import { useState } from "react";
import Comments from "@/components/Comments";
import { Agent, Ticket, TicketStatus } from "@/types/ticket";
import {
  categoryLabels,
  priorityLabels,
  statusLabels,
  statusStyles,
} from "@/lib/ticketLabels";

type TicketCardProps = {
  ticket: Ticket;
  role: string;
  agents: Agent[];
  onDelete: (id: number) => void;
  onEdit: (ticket: Ticket) => void;
  onStatusChange: (id: number, status: TicketStatus) => void;
  onAssign: (id: number, assigneeId: string | null) => void;
};

const statusOptions: TicketStatus[] = [
  "open",
  "in-progress",
  "resolved",
  "closed",
];

const selectClass =
  "rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

export default function TicketCard({
  ticket,
  role,
  agents,
  onDelete,
  onEdit,
  onStatusChange,
  onAssign,
}: TicketCardProps) {
  const [showComments, setShowComments] = useState(false);

  const isStaff = role === "agent" || role === "admin";
  const canDelete = role === "admin";

  return (
    <div className="rounded-xl border border-gray-300 p-4 dark:border-gray-700">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold">{ticket.title}</h4>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[ticket.status]}`}
        >
          {statusLabels[ticket.status]}
        </span>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        {categoryLabels[ticket.category]} | {priorityLabels[ticket.priority]}{" "}
        priority
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Assigned to: {ticket.assigneeName ?? "Nobody yet"}
      </p>

      <p className="mt-3 text-sm">{ticket.description}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          #{ticket.id} | {ticket.name} | {ticket.email}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {isStaff && (
            <select
              value={ticket.assigneeId ?? ""}
              onChange={(e) =>
                onAssign(ticket.id, e.target.value === "" ? null : e.target.value)
              }
              className={selectClass}
            >
              <option value="">Unassigned</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          )}

          {isStaff && (
            <select
              value={ticket.status}
              onChange={(e) =>
                onStatusChange(ticket.id, e.target.value as TicketStatus)
              }
              className={selectClass}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setShowComments((current) => !current)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700"
          >
            {showComments ? "Hide comments" : "Comments"}
          </button>

          <button
            onClick={() => onEdit(ticket)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700"
          >
            Edit
          </button>

          {canDelete && (
            <button
              onClick={() => onDelete(ticket.id)}
              className="rounded-lg border border-red-500 px-3 py-1.5 text-sm text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {showComments && <Comments ticketId={ticket.id} />}
    </div>
  );
}