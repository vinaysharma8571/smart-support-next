import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { ticketInputSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const tickets = await prisma.ticket.findMany({
    where: user.role === "customer" ? { ownerId: user.id } : undefined,
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = ticketInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid ticket data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const ticket = await prisma.ticket.create({
    data: { ...parsed.data, ownerId: user.id },
  });

  return NextResponse.json(ticket, { status: 201 });
}