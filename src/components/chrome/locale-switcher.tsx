"use client";

import { useTransition } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("nav");

  function switchTo(next: Locale) {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace({ pathname, params: params as any } as any, { locale: next });
    });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={t("language")}
          className={cn(
            "flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:bg-subtle",
            isPending && "opacity-50",
          )}
        >
          <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
          {locale}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="glass z-[9000] min-w-44 rounded-2xl p-1.5 shadow-2xl shadow-black/20"
        >
          {locales.map((code) => (
            <DropdownMenu.Item
              key={code}
              onSelect={() => switchTo(code)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground outline-none data-[highlighted]:bg-subtle",
              )}
            >
              {localeNames[code]}
              {code === locale ? <Check className="h-3.5 w-3.5" strokeWidth={2} /> : null}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
