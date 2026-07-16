import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const baseValue = result[key];
    const overrideValue = override[key];
    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === "object" &&
      typeof overrideValue === "object" &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue as Messages, overrideValue as Messages);
    } else {
      result[key] = overrideValue;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // English is the structural source of truth; locale files override it so a
  // missing key can never render as a raw message id.
  const fallback = (await import("../messages/en.json")).default as Messages;
  const messages =
    locale === "en"
      ? fallback
      : deepMerge(
          fallback,
          (await import(`../messages/${locale}.json`)).default as Messages,
        );

  return { locale, messages };
});
