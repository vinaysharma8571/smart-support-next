import { TicketCategory, TicketPriority, TicketStatus } from "@/types/ticket";
import {
  categoryLabels,
  priorityLabels,
  statusLabels,
} from "@/lib/ticketLabels";

export type Filters = {
  search: string;
  status: TicketStatus | "all";
  priority: TicketPriority | "all";
  category: TicketCategory | "all";
};

type TicketFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const controlClass =
  "rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

export default function TicketFilters({ filters, onChange }: TicketFiltersProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <input
        className={`${controlClass} min-w-[200px] flex-1`}
        placeholder="Search tickets..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <select
        className={controlClass}
        value={filters.status}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as Filters["status"] })
        }
      >
        <option value="all">All statuses</option>
        {(Object.keys(statusLabels) as TicketStatus[]).map((s) => (
          <option key={s} value={s}>
            {statusLabels[s]}
          </option>
        ))}
      </select>

      <select
        className={controlClass}
        value={filters.priority}
        onChange={(e) =>
          onChange({ ...filters, priority: e.target.value as Filters["priority"] })
        }
      >
        <option value="all">All priorities</option>
        {(Object.keys(priorityLabels) as TicketPriority[]).map((p) => (
          <option key={p} value={p}>
            {priorityLabels[p]}
          </option>
        ))}
      </select>

      <select
        className={controlClass}
        value={filters.category}
        onChange={(e) =>
          onChange({ ...filters, category: e.target.value as Filters["category"] })
        }
      >
        <option value="all">All categories</option>
        {(Object.keys(categoryLabels) as TicketCategory[]).map((c) => (
          <option key={c} value={c}>
            {categoryLabels[c]}
          </option>
        ))}
      </select>
    </div>
  );
}