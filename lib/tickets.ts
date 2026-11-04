import prisma from "@/lib/prisma";

type WithAssignee = { assigneeId: string | null };

export async function attachAssignees<T extends WithAssignee>(tickets: T[]) {
  const ids = [
    ...new Set(
      tickets
        .map((ticket) => ticket.assigneeId)
        .filter((id): id is string => id !== null)
    ),
  ];

  const users =
    ids.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: ids } },
          select: { id: true, name: true },
        })
      : [];

  const names = new Map(users.map((user) => [user.id, user.name]));

  return tickets.map((ticket) => ({
    ...ticket,
    assigneeName: ticket.assigneeId
      ? (names.get(ticket.assigneeId) ?? null)
      : null,
  }));
}