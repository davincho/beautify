import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col fixed inset-0">
      <header className="bg-slate-800 text-white">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-6">
            <Link
              to="/"
              className="hover:text-slate-300 transition-colors"
              activeProps={{ className: "text-sky-400" }}
            >
              Beautifier 🦄
            </Link>
            <Link
              to="/about"
              className="hover:text-slate-300 transition-colors"
              activeProps={{ className: "text-sky-400" }}
            >
              About
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 mx-auto w-full overflow-y-auto">
        <Outlet />
      </main>

      <footer className="bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-slate-600">
          © {new Date().getFullYear()} Beautify 🦄 - Developed with ❤️ in
          Vienna, AT -{" "}
          <a href="https://github.com/davincho/beautify" target="_blank">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  ),
});
