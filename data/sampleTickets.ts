import { Ticket } from "@/types/ticket";

export const sampleTickets: Ticket[] = [
  {
    id: 1024,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    title: "Payment failed",
    category: "billing",
    priority: "high",
    description:
      "5000 rupees was deducted from my account but my order was not created.",
    status: "open",
  },
  {
    id: 1025,
    name: "Priya Patel",
    email: "priya@gmail.com",
    title: "Can't reset password",
    category: "account",
    priority: "medium",
    description: "The reset link in the email says it has expired.",
    status: "in-progress",
  },
  {
    id: 1026,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    title: "Add dark mode",
    category: "feature",
    priority: "low",
    description: "It would be great to have a dark theme for night use.",
    status: "resolved",
  },
  {
    id: 1027,
    name: "Sneha Gupta",
    email: "sneha@gmail.com",
    title: "App crashes on checkout",
    category: "technical",
    priority: "critical",
    description: "The app shows an error and closes when I press Pay.",
    status: "open",
  },
];