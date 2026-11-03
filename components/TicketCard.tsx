import { Ticket, TicketStatus } from "@/types/ticket";
import {
  categoryLabels,
  priorityLabels,
  statusLabels,
  statusStyles,
} from "@/lib/ticketLabels";

type TicketCardProps = {
  ticket: Ticket;
  role: string;
  onDelete: (id: number) => void;
  onEdit: (ticket: Ticket) => void;
  onStatusChange: (id: number, status: TicketStatus) => void;
};

const statusOptions: TicketStatus[] = [
  "open",
  "in-progress",
  "resolved",
  "closed",
];

export default function TicketCard({
  ticket,
  role,
  onDelete,
  onEdit,
  onStatusChange,
}: TicketCardProps) {
  const canChangeStatus = role === "agent" || role === "admin";
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

      <p className="mt-3 text-sm">{ticket.description}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          #{ticket.id} | {ticket.name} | {ticket.email}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {canChangeStatus && (
            <select
              value={ticket.status}
              onChange={(e) =>
                onStatusChange(ticket.id, e.target.value as TicketStatus)
              }
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          )}

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
    </div>
  );
}