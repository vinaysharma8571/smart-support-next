import { z } from "zod";

export const ticketInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Enter a valid email"),
  title: z.string().trim().min(1, "Title is required"),
  category: z.enum(["technical", "billing", "account", "feature", "other"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().trim().min(1, "Description is required"),
});

export const ticketUpdateSchema = ticketInputSchema.partial().extend({
  status: z.enum(["open", "in-progress", "resolved", "closed"]).optional(),
});