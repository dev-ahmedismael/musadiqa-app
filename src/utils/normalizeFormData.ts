export function normalizeFormData<T extends Record<string, unknown>>(
  data: T
): T {
  const normalized: Record<string, unknown> = {};

  for (const key in data) {
    const value = data[key];
    normalized[key] = value ?? "";
  }

  return normalized as T;
}
