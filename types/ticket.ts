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
  assigneeId: string | null;
  assigneeName: string | null;
};

export type TicketInput = Omit<
  Ticket,
  "id" | "status" | "assigneeId" | "assigneeName"
>;

export type Agent = {
  id: string;
  name: string;
  role: string;
};

export type TicketComment = {
  id: number;
  ticketId: number;
  authorId: string;
  authorName: string;
  authorRole: string;
  body: string;
  createdAt: string;
};