"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const role = user && "role" in user ? String(user.role) : "customer";

  async function handleLogout() {
    await signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">Smart Support</h1>
          <p className="text-xs text-slate-400">AI-powered ticket management</p>
        </div>

        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="text-sm text-slate-400">Loading...</span>
          ) : user ? (
            <>
              <div className="text-sm sm:text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs capitalize text-slate-400">{role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm hover:bg-slate-800"
              >
                Log out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}