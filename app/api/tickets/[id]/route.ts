import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { getCurrentUser } from "@/lib/session";
import { ticketUpdateSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) ? id : null;
}

function isNotFound(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

export async function PUT(request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  const id = parseId((await params).id);

  if (id === null) {
    return NextResponse.json({ error: "Invalid ticket id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = ticketUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid ticket data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const existing = await prisma.ticket.findUnique({ where: { id } });

  if (!existing || (user.role === "customer" && existing.ownerId !== user.id)) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  const changesStatus =
    parsed.data.status !== undefined && parsed.data.status !== existing.status;

  if (changesStatus && user.role === "customer") {
    return NextResponse.json(
      { error: "Only agents and admins can change a ticket's status" },
      { status: 403 }
    );
  }

  const ticket = await prisma.ticket.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json(ticket);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  if (user.role !== "admin") {
    return NextResponse.json(
      { error: "Only admins can delete tickets" },
      { status: 403 }
    );
  }

  const id = parseId((await params).id);

  if (id === null) {
    return NextResponse.json({ error: "Invalid ticket id" }, { status: 400 });
  }

  try {
    await prisma.ticket.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    throw error;
  }
}