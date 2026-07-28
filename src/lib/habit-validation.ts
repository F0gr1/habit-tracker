import { z } from "zod";

export const HABIT_FREQUENCIES = ["DAILY", "WEEKLY"] as const;

export type HabitFrequency = (typeof HABIT_FREQUENCIES)[number];

function formString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isHabitFrequency(value: string): value is HabitFrequency {
  return HABIT_FREQUENCIES.includes(value as HabitFrequency);
}

export const AddHabitInputSchema = z.object({
  name: z.preprocess(
    formString,
    z
      .string()
      .min(1, "習慣名を入力してください")
      .max(50, "習慣名は50文字以内で入力してください"),
  ),
  frequency: z
    .preprocess(formString, z.string())
    .refine(isHabitFrequency, "頻度は DAILY または WEEKLY を選択してください")
    .transform((value) => value as HabitFrequency),
});

export const ToggleHabitInputSchema = z.object({
  habitId: z.preprocess(
    formString,
    z
      .string()
      .min(1, "習慣IDが指定されていません")
      .max(128, "習慣IDが長すぎます"),
  ),
});

export type AddHabitInput = z.infer<typeof AddHabitInputSchema>;
export type ToggleHabitInput = z.infer<typeof ToggleHabitInputSchema>;

export function getFirstValidationError(error: z.ZodError) {
  return error.issues[0]?.message ?? "入力内容を確認してください";
}
