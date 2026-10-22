export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketCategory =
  | "technical"
  | "billing"
  | "account"
  | "feature"
  | "other";

export type Ticket = {
  id: number;
  name: string;
  email: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
};