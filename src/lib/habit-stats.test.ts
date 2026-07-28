import assert from "node:assert/strict";
import { test } from "node:test";

import { dateKeyToDate, getHabitProgress, getHabitStatusLabel, getStartOfLocalDay, toDateKey } from "./habit-stats.ts";

test("toDateKey formats dates as yyyy-mm-dd", () => {
  assert.equal(toDateKey(new Date(2026, 0, 8)), "2026-01-08");
});

test("date-only values round-trip without shifting to the previous UTC day", () => {
  const localAfternoon = new Date(2026, 6, 8, 13, 30);
  const dbDate = getStartOfLocalDay(localAfternoon);

  assert.equal(dbDate.toISOString().slice(0, 10), "2026-07-08");
  assert.equal(toDateKey(dateKeyToDate("2026-07-08")), "2026-07-08");
});

test("getHabitProgress counts current streak from today backward", () => {
  const today = new Date(2026, 6, 8, 15, 30);
  const progress = getHabitProgress(
    [new Date(2026, 6, 8), new Date(2026, 6, 7), new Date(2026, 6, 5)],
    today,
    7,
  );

  assert.equal(progress.todayDone, true);
  assert.equal(progress.streakDays, 2);
  assert.equal(progress.completionsInWindow, 3);
  assert.equal(getHabitStatusLabel(progress), "2 DAY STREAK");
});

test("getHabitProgress reports no current streak when today is open", () => {
  const progress = getHabitProgress([new Date(2026, 6, 7)], new Date(2026, 6, 8), 7);

  assert.equal(progress.todayDone, false);
  assert.equal(progress.streakDays, 0);
  assert.equal(getHabitStatusLabel(progress), "READY TODAY");
});
