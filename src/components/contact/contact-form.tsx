"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const serviceKeys = ["software", "website", "commerce", "marketing", "other"] as const;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().min(2, t("errors.name")),
    email: z.string().email(t("errors.email")),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.enum(serviceKeys),
    message: z.string().min(10, t("errors.message")),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: "software" },
  });

  async function onSubmit(values: FormValues) {
    // Portfolio concept: simulate a submission round-trip.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.info("contact form payload", values);
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border border-line bg-surface p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-invert text-invert-foreground">
          <Check className="h-6 w-6" strokeWidth={2} />
        </span>
        <p className="mt-6 font-display text-xl font-semibold tracking-tight">
          {t("success")}
        </p>
        <p className="mt-2 text-sm text-muted">{t("successNote")}</p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground/50";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="sr-only" htmlFor="contact-name">{t("name")}</label>
          <input id="contact-name" placeholder={t("name")} className={inputClass} {...register("name")} />
          {errors.name ? <p role="alert" className="mt-1.5 text-xs text-red-500">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-email">{t("email")}</label>
          <input id="contact-email" type="email" placeholder={t("email")} className={inputClass} {...register("email")} />
          {errors.email ? <p role="alert" className="mt-1.5 text-xs text-red-500">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-phone">{t("phone")}</label>
          <input id="contact-phone" placeholder={t("phone")} className={inputClass} {...register("phone")} />
        </div>
        <div>
          <label className="sr-only" htmlFor="contact-company">{t("company")}</label>
          <input id="contact-company" placeholder={t("company")} className={inputClass} {...register("company")} />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2.5 text-xs font-medium uppercase tracking-widest text-muted">
          {t("service")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceKeys.map((key) => (
            <label key={key} className="cursor-pointer">
              <input type="radio" value={key} className="peer sr-only" {...register("service")} />
              <span
                className={cn(
                  "inline-block rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors",
                  "peer-checked:border-transparent peer-checked:bg-invert peer-checked:text-invert-foreground",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-foreground",
                )}
              >
                {t(`services.${key}`)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="sr-only" htmlFor="contact-message">{t("message")}</label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={t("message")}
          className={cn(inputClass, "resize-none")}
          {...register("message")}
        />
        {errors.message ? <p role="alert" className="mt-1.5 text-xs text-red-500">{errors.message.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-invert py-4 text-sm font-medium text-invert-foreground transition-opacity disabled:opacity-60"
      >
        <Send className="h-4 w-4" strokeWidth={1.8} />
        {isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
