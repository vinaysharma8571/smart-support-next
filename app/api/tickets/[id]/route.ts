import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
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

  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(ticket);
  } catch (error) {
    if (isNotFound(error)) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
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