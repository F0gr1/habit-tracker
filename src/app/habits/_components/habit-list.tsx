import { HabitCard } from "./habit-card";

export type HabitCardData = {
  id: string;
  name: string;
  description: string | null;
  frequency: "DAILY" | "WEEKLY";
  todayDone: boolean;
  streakDays: number;
  completionsInWindow: number;
  windowDays: number;
  statusLabel: string;
};

type Props = {
  habits: HabitCardData[];
};

type ColumnVariant = "green" | "cyan";

function Column({
  title,
  habits,
  variant,
}: {
  title: string;
  habits: HabitCardData[];
  variant: ColumnVariant;
}) {
  const isGreen = variant === "green";
  const headerColor = isGreen ? "var(--green)" : "var(--cyan)";
  const mutedColor = isGreen ? "var(--text-muted)" : "#2e7080";
  const borderClass = isGreen ? "terminal-border" : "terminal-border-cyan";
  const doneCount = habits.filter((habit) => habit.todayDone).length;

  return (
    <section className="min-w-0 flex-1">
      <div className="mb-3 flex items-end justify-between gap-4 border-b pb-2" style={{ borderColor: mutedColor }}>
        <h2 className="text-2xl" style={{ fontFamily: "var(--font-terminal)", color: headerColor }}>
          [ {title} ]
        </h2>
        <p className="text-xs tracking-[0.25em]" style={{ color: mutedColor }}>
          {doneCount}/{habits.length} DONE
        </p>
      </div>
      {habits.length === 0 ? (
        <div className={`px-4 py-8 text-center ${borderClass}`} style={{ color: mutedColor }}>
          <p className="text-sm">-- NO {title} QUESTS --</p>
          <p className="mt-2 text-xs">Use the quick add panel to create one.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} variant={variant} />
          ))}
        </ul>
      )}
    </section>
  );
}

export function HabitList({ habits }: Props) {
  if (habits.length === 0) {
    return (
      <section className="terminal-border px-5 py-10 text-center sm:px-8">
        <p className="text-xs tracking-[0.35em]" style={{ color: "var(--text-muted)" }}>
          EMPTY SAVE FILE
        </p>
        <h2 className="mt-2 text-3xl" style={{ fontFamily: "var(--font-terminal)", color: "var(--green)" }}>
          Start with one habit you can finish today.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6" style={{ color: "var(--text-muted)" }}>
          Add a tiny daily or weekly quest above. The dashboard will immediately show today&apos;s status, a
          seven-day completion snapshot, and your current streak.
        </p>
      </section>
    );
  }

  const daily = habits.filter((habit) => habit.frequency === "DAILY");
  const weekly = habits.filter((habit) => habit.frequency === "WEEKLY");

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      <Column title="DAILY" habits={daily} variant="green" />
      <Column title="WEEKLY" habits={weekly} variant="cyan" />
    </div>
  );
}
