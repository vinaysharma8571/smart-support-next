import { TicketCategory, TicketPriority, TicketStatus } from "@/types/ticket";

export const statusLabels: Record<TicketStatus, string> = {
  open: "Open",
  "in-progress": "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export const priorityLabels: Record<TicketPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const categoryLabels: Record<TicketCategory, string> = {
  technical: "Technical",
  billing: "Billing",
  account: "Account",
  feature: "Feature Request",
  other: "Other",
};

export const statusStyles: Record<TicketStatus, string> = {
  open: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-slate-100 text-slate-600",
};