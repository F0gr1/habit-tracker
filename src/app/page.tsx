import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-xs tracking-[0.45em]" style={{ color: "var(--text-muted)" }}>
            RPG ROUTINES / NEXT.JS / PRISMA
          </p>
          <h1
            className="cursor max-w-3xl text-5xl leading-none sm:text-7xl"
            style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}
          >
            Ship habits like daily quests.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: "var(--text-muted)" }}>
            Habit Tracker turns a routine list into a small command center: clear daily and weekly goals, a
            visible completion state, seven-day momentum, and server-side ownership checks. It is intentionally
            compact so the implementation is easy to review in a portfolio.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center px-6 text-base font-semibold transition-opacity hover:opacity-80"
              href="/habits"
              style={{ background: "var(--green)", color: "var(--bg)" }}
            >
              Open dashboard
            </Link>
            <a
              className="terminal-border inline-flex min-h-12 items-center justify-center px-6 text-base transition-colors hover:bg-[var(--green-muted)]"
              href="https://github.com/F0gr1/habit-tracker"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--green)" }}
            >
              View repository
            </a>
          </div>
        </div>

        <div className="terminal-border bg-black/20 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs tracking-[0.35em]" style={{ color: "var(--text-muted)" }}>
              SYSTEM PREVIEW
            </p>
            <span className="text-xs" style={{ color: "var(--green-dim)" }}>
              ONLINE
            </span>
          </div>
          <div className="space-y-3" style={{ fontFamily: "var(--font-terminal)" }}>
            {[
              ["[DONE]", "Morning review", "4 DAY STREAK"],
              ["[    ]", "Write one learning note", "OPEN TODAY"],
              ["[DONE]", "Weekly planning", "DONE TODAY"],
            ].map(([state, title, status]) => (
              <div key={title} className="terminal-border flex items-center justify-between gap-4 p-3">
                <div>
                  <p className="text-lg" style={{ color: "var(--green)" }}>
                    {state} &gt; {title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {status}
                  </p>
                </div>
                <div className="h-2 w-20 bg-black/40">
                  <div className="h-full w-2/3" style={{ background: "var(--green)" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--border)] text-center">
            <div className="p-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                STACK
              </p>
              <p style={{ color: "var(--green)" }}>Next</p>
            </div>
            <div className="p-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                DATA
              </p>
              <p style={{ color: "var(--green)" }}>Prisma</p>
            </div>
            <div className="p-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                SAFE
              </p>
              <p style={{ color: "var(--green)" }}>Zod</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
