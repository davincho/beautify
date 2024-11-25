import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">About Us</h1>
        <p className="text-lg text-slate-600">
          Learn more about our team and mission.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
        <p className="text-slate-600">
          We're dedicated to building amazing web applications using modern
          technologies. Our stack includes React, TypeScript, and TanStack
          Router for seamless navigation and type-safe routing.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          <li>React - A JavaScript library for building user interfaces</li>
          <li>TypeScript - Typed JavaScript at any scale</li>
          <li>TanStack Router - Type-safe routing for React</li>
          <li>Tailwind CSS - A utility-first CSS framework</li>
        </ul>
      </section>
    </div>
  );
}
