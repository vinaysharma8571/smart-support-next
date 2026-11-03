import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type Role = "customer" | "agent" | "admin";

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return null;

  const rawRole = "role" in session.user ? String(session.user.role) : "customer";
  const role: Role =
    rawRole === "admin" || rawRole === "agent" ? rawRole : "customer";

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role,
  };
}