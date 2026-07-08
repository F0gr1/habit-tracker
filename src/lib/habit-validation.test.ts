import assert from "node:assert/strict";
import { test } from "node:test";

import { AddHabitInputSchema, ToggleHabitInputSchema } from "./habit-validation.ts";

test("AddHabitInputSchema trims names and accepts supported frequencies", () => {
  const result = AddHabitInputSchema.safeParse({ name: "  Read docs  ", frequency: "DAILY" });

  assert.equal(result.success, true);
  if (!result.success) {
    throw new Error("Expected validation to succeed");
  }

  assert.equal(result.data.name, "Read docs");
  assert.equal(result.data.frequency, "DAILY");
});

test("AddHabitInputSchema rejects blank names", () => {
  const result = AddHabitInputSchema.safeParse({ name: "   ", frequency: "WEEKLY" });

  assert.equal(result.success, false);
});

test("ToggleHabitInputSchema requires a habit id", () => {
  const result = ToggleHabitInputSchema.safeParse({ habitId: "" });

  assert.equal(result.success, false);
});
