export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Smart Support</h1>
          <p className="text-sm text-slate-400">
            AI-Powered Customer Support System
          </p>
        </div>

        <nav className="flex gap-6 text-sm">
          <a href="#">Dashboard</a>
          <a href="#">Tickets</a>
          <a href="#">AI Assistant</a>
        </nav>
      </div>
    </header>
  );
}