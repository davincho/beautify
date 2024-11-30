import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col fixed inset-0 bg-gradient-to-b from-slate-300 to-slate-200 text-white">
      <main className="flex-1 mx-auto w-full overflow-y-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm">
          © {new Date().getFullYear()} {""}
          <Link to="/">BeautifyMe 🦄</Link> - Developed with ❤️ in Vienna, AT -{" "}
          <a
            href="https://github.com/davincho/beautify"
            target="_blank"
            className="underline underline-offset-2"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  ),
});
