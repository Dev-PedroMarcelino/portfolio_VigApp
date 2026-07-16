import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[8rem] font-semibold leading-none tracking-tight text-subtle md:text-[12rem]">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">{t("body")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-invert px-6 py-3 text-sm font-medium text-invert-foreground"
      >
        {t("back")}
      </Link>
    </div>
  );
}
