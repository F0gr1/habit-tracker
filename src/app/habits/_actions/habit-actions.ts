"use server";

import { getCurrentUserId } from "@/lib/current-user";
import { getStartOfLocalDay } from "@/lib/habit-stats";
import {
  AddHabitInputSchema,
  ToggleHabitInputSchema,
  getFirstValidationError,
} from "@/lib/habit-validation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string }
  | undefined;

export async function addHabit(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = AddHabitInputSchema.safeParse({
    name: formData.get("name"),
    frequency: formData.get("frequency"),
  });

  if (!parsed.success) {
    return { ok: false, error: getFirstValidationError(parsed.error) };
  }

  const userId = getCurrentUserId();

  try {
    await prisma.habit.create({
      data: {
        name: parsed.data.name,
        frequency: parsed.data.frequency,
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: { id: userId, email: "dev@example.com" },
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to add habit", error);
    return { ok: false, error: "習慣を保存できませんでした。データベース接続を確認してください。" };
  }

  revalidatePath("/habits");
  return { ok: true, message: "習慣を追加しました" };
}

export async function toggleHabitLog(habitId: string): Promise<ActionResult> {
  const parsed = ToggleHabitInputSchema.safeParse({ habitId });

  if (!parsed.success) {
    return { ok: false, error: getFirstValidationError(parsed.error) };
  }

  const userId = getCurrentUserId();
  const today = getStartOfLocalDay();

  try {
    const habit = await prisma.habit.findFirst({
      where: { id: parsed.data.habitId, userId },
      select: { id: true },
    });

    if (!habit) {
      return { ok: false, error: "この習慣を更新する権限がありません。" };
    }

    const existing = await prisma.habitLog.findUnique({
      where: {
        habitId_date: {
          habitId: parsed.data.habitId,
          date: today,
        },
      },
      select: { id: true },
    });

    if (existing) {
      await prisma.habitLog.delete({ where: { id: existing.id } });
    } else {
      await prisma.habitLog.create({
        data: {
          habitId: parsed.data.habitId,
          date: today,
        },
      });
    }
  } catch (error) {
    console.error("Failed to toggle habit log", error);
    return { ok: false, error: "習慣の完了状態を更新できませんでした。もう一度お試しください。" };
  }

  revalidatePath("/habits");
  return { ok: true };
}
