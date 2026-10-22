import { Ticket } from "@/types/ticket";
import {
  categoryLabels,
  priorityLabels,
  statusLabels,
  statusStyles,
} from "@/lib/ticketLabels";

type TicketCardProps = {
  ticket: Ticket;
};

export default function TicketCard({ ticket }: TicketCardProps) {
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

      <p className="mt-3 text-xs text-gray-500">
        #{ticket.id} | {ticket.name} | {ticket.email}
      </p>
    </div>
  );
}