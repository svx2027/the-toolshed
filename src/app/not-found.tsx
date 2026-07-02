import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-faint">404</p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink sm:text-6xl">
        This page is on blocks.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-soft">
        Either it never existed or I have not built it yet. The Garage, though, is open.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition-transform hover:-translate-y-0.5"
        >
          Back home
        </Link>
        <Link
          href="/#toolshed"
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-6 py-3 font-medium text-ink transition-colors hover:border-ink"
        >
          Open the Garage
        </Link>
      </div>
    </main>
  );
}
