import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: [
      {
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
        name: "Priya Patel",
        email: "priya@gmail.com",
        title: "Can't reset password",
        category: "account",
        priority: "medium",
        description: "The reset link in the email says it has expired.",
        status: "in-progress",
      },
      {
        name: "Amit Kumar",
        email: "amit@gmail.com",
        title: "Add dark mode",
        category: "feature",
        priority: "low",
        description: "It would be great to have a dark theme for night use.",
        status: "resolved",
      },
      {
        name: "Sneha Gupta",
        email: "sneha@gmail.com",
        title: "App crashes on checkout",
        category: "technical",
        priority: "critical",
        description: "The app shows an error and closes when I press Pay.",
        status: "open",
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });