import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ticketInputSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = ticketInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid ticket data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const ticket = await prisma.ticket.create({ data: parsed.data });

  return NextResponse.json(ticket, { status: 201 });
}