import type { Locale } from "@/i18n/routing";

/**
 * Per-demo translation dictionaries. English is mandatory and acts as the
 * structural fallback; other locales override it per key at the object level.
 */
export type DemoDictionary<T> = { en: T } & Partial<Record<Locale, T>>;

export function pickContent<T>(dict: DemoDictionary<T>, locale: string): T {
  return (dict as Record<string, T | undefined>)[locale] ?? dict.en;
}
