export type HabitProgress = {
  todayKey: string;
  todayDone: boolean;
  streakDays: number;
  completionsInWindow: number;
  windowDays: number;
};

function isUtcDateOnly(date: Date) {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

export function dateKeyToDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

export function getStartOfLocalDay(date = new Date()) {
  return dateKeyToDate(toDateKey(date));
}

export function addDays(date: Date, days: number) {
  const copy = getStartOfLocalDay(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

export function toDateKey(date: Date) {
  const year = isUtcDateOnly(date) ? date.getUTCFullYear() : date.getFullYear();
  const monthIndex = isUtcDateOnly(date) ? date.getUTCMonth() : date.getMonth();
  const dateNumber = isUtcDateOnly(date) ? date.getUTCDate() : date.getDate();
  const month = String(monthIndex + 1).padStart(2, "0");
  const day = String(dateNumber).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getRecentDateKeys(days: number, today = new Date()) {
  const normalizedToday = getStartOfLocalDay(today);

  return Array.from({ length: days }, (_, index) => toDateKey(addDays(normalizedToday, -index)));
}

export function getHabitProgress(logDates: Date[], today = new Date(), windowDays = 7): HabitProgress {
  const todayKey = toDateKey(getStartOfLocalDay(today));
  const logKeys = new Set(logDates.map((date) => toDateKey(date)));
  const recentKeys = getRecentDateKeys(windowDays, today);
  let streakDays = 0;

  for (const key of recentKeys) {
    if (!logKeys.has(key)) {
      break;
    }

    streakDays += 1;
  }

  return {
    todayKey,
    todayDone: logKeys.has(todayKey),
    streakDays,
    completionsInWindow: recentKeys.filter((key) => logKeys.has(key)).length,
    windowDays,
  };
}

export function getHabitStatusLabel(progress: HabitProgress) {
  if (progress.todayDone && progress.streakDays > 1) {
    return `${progress.streakDays} DAY STREAK`;
  }

  if (progress.todayDone) {
    return "DONE TODAY";
  }

  if (progress.completionsInWindow > 0) {
    return "READY TODAY";
  }

  return "NEW START";
}
