import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { commentInputSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) ? id : null;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const ticketId = parseId((await params).id);

  if (ticketId === null) {
    return NextResponse.json({ error: "Invalid ticket id" }, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  if (!ticket || (user.role === "customer" && ticket.ownerId !== user.id)) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const comments = await prisma.comment.findMany({
    where: { ticketId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(comments);
}

export async function POST(request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const ticketId = parseId((await params).id);

  if (ticketId === null) {
    return NextResponse.json({ error: "Invalid ticket id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = commentInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid comment" },
      { status: 400 }
    );
  }

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  if (!ticket || (user.role === "customer" && ticket.ownerId !== user.id)) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: {
      ticketId,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      body: parsed.data.body,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}