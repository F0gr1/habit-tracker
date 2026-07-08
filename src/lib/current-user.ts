export const DEV_USER_ID = "dev-user";

export function getCurrentUserId() {
  // Centralized so the dev fallback still participates in ownership checks.
  return DEV_USER_ID;
}
