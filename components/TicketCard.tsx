import { Ticket, TicketStatus } from "@/types/ticket";
import {
  categoryLabels,
  priorityLabels,
  statusLabels,
  statusStyles,
} from "@/lib/ticketLabels";

type TicketCardProps = {
  ticket: Ticket;
  onDelete: (id: number) => void;
  onEdit: (ticket: Ticket) => void;
  onStatusChange: (id: number, status: TicketStatus) => void;
};

const statuses = Object.keys(statusLabels) as TicketStatus[];

export default function TicketCard({
  ticket,
  onDelete,
  onEdit,
  onStatusChange,
}: TicketCardProps) {
  return (
    <div className="rounded-xl border border-gray-300 p-4 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold">{ticket.title}</h4>
          <p className="mt-1 text-sm text-gray-500">
            {categoryLabels[ticket.category]} | {priorityLabels[ticket.priority]} priority
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[ticket.status]}`}
        >
          {statusLabels[ticket.status]}
        </span>
      </div>

      <p className="mt-3 text-sm">{ticket.description}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          #{ticket.id} | {ticket.name} | {ticket.email}
        </p>

        <div className="flex items-center gap-2">
          <select
            value={ticket.status}
            onChange={(e) =>
              onStatusChange(ticket.id, e.target.value as TicketStatus)
            }
            className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>

          <button
            onClick={() => onEdit(ticket)}
            className="rounded-lg border border-gray-300 px-3 py-1 text-xs dark:border-gray-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(ticket.id)}
            className="rounded-lg border border-red-300 px-3 py-1 text-xs text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}