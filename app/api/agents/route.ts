import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Please log in" }, { status: 401 });
  }

  if (user.role === "customer") {
    return NextResponse.json(
      { error: "Only agents and admins can see this list" },
      { status: 403 }
    );
  }

  const agents = await prisma.user.findMany({
    where: { role: { in: ["agent", "admin"] } },
    select: { id: true, name: true, role: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(agents);
}