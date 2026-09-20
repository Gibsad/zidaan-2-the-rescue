"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { COUNT_OPTIONS, toSubmission, validateRSVP } from "@/lib/validation";
import { EVENT } from "@/lib/event";
import type { RSVPFormValues } from "@/types/rsvp";

const INITIAL_VALUES: RSVPFormValues = {
  guestName: "",
  attending: "",
  adultCount: 1,
  childCount: 0,
  message: "",
};

interface RSVPFormProps {
  onSubmitted: (attending: boolean) => void;
}

export default function RSVPForm({ onSubmitted }: RSVPFormProps) {
  const [values, setValues] = useState<RSVPFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ReturnType<typeof validateRSVP>["errors"]>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof RSVPFormValues>(key: K, value: RSVPFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Guards against duplicate submissions from rapid repeated taps/clicks.
    if (submitting) return;

    const result = validateRSVP(values);
    setErrors(result.errors);
    if (!result.valid) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSubmission(values)),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok: true; record: { attending: boolean } }
        | { ok: false; error: string }
        | null;

      if (!response.ok || !data || !data.ok) {
        setSubmitError(
          (data && "error" in data && data.error) ||
            "Something went wrong sending your RSVP. Please try again."
        );
        setSubmitting(false);
        return;
      }

      onSubmitted(data.record.attending);
    } catch {
      setSubmitError(
        "We couldn't reach the server. Please check your connection and try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="safe-x safe-top safe-bottom flex min-h-[100dvh] flex-col items-center justify-center gap-5 py-10"
    >
      <h2 className="font-display text-center text-3xl font-bold text-fire-red sm:text-4xl">
        🔥 RSVP
      </h2>
      <p className="max-w-xs text-center text-sm font-semibold text-navy sm:text-base">
        Help us know if you can join Zidaan&apos;s Rescue Crew!
      </p>
      <p className="text-sm font-bold text-fire-red-dark">{EVENT.rsvpByLabel}</p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-5 rounded-3xl border-4 border-navy/10 bg-white/95 p-5 shadow-lg sm:p-6"
      >
        <div>
          <label htmlFor="guestName" className="mb-1 block text-sm font-bold text-navy">
            Guest / Family Name
          </label>
          <input
            id="guestName"
            name="guestName"
            type="text"
            autoComplete="name"
            value={values.guestName}
            onChange={(e) => updateField("guestName", e.target.value)}
            placeholder="Enter your name"
            aria-invalid={Boolean(errors.guestName)}
            aria-describedby={errors.guestName ? "guestName-error" : undefined}
            className="w-full rounded-xl border-2 border-navy/20 px-4 py-3 text-base text-navy focus:border-fire-red focus:outline-none"
          />
          {errors.guestName && (
            <p id="guestName-error" className="mt-1 text-sm font-semibold text-fire-red">
              {errors.guestName}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-bold text-navy">
            Will you be attending?
          </legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <AttendingOption
              id="attending-yes"
              label="🚨 Yes, we'll be there!"
              checked={values.attending === "yes"}
              onSelect={() => updateField("attending", "yes")}
            />
            <AttendingOption
              id="attending-no"
              label="Sorry, can't make it"
              checked={values.attending === "no"}
              onSelect={() => updateField("attending", "no")}
            />
          </div>
          {errors.attending && (
            <p className="mt-1 text-sm font-semibold text-fire-red">{errors.attending}</p>
          )}
        </fieldset>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="adultCount" className="mb-1 block text-sm font-bold text-navy">
              Number of Adults
            </label>
            <select
              id="adultCount"
              value={values.adultCount}
              onChange={(e) => updateField("adultCount", Number(e.target.value))}
              className="w-full rounded-xl border-2 border-navy/20 px-3 py-3 text-base text-navy focus:border-fire-red focus:outline-none"
            >
              {COUNT_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n === 6 ? "6+" : n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="childCount" className="mb-1 block text-sm font-bold text-navy">
              Number of Children
            </label>
            <select
              id="childCount"
              value={values.childCount}
              onChange={(e) => updateField("childCount", Number(e.target.value))}
              className="w-full rounded-xl border-2 border-navy/20 px-3 py-3 text-base text-navy focus:border-fire-red focus:outline-none"
            >
              {COUNT_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n === 6 ? "6+" : n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-bold text-navy">
            Message for Zidaan <span className="font-normal text-navy/60">(Optional)</span>
          </label>
          <textarea
            id="message"
            value={values.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Leave Zidaan a birthday message..."
            rows={3}
            aria-invalid={Boolean(errors.message)}
            className="w-full resize-none rounded-xl border-2 border-navy/20 px-4 py-3 text-base text-navy focus:border-fire-red focus:outline-none"
          />
          {errors.message && (
            <p className="mt-1 text-sm font-semibold text-fire-red">{errors.message}</p>
          )}
        </div>

        {submitError && (
          <p role="alert" className="rounded-xl bg-fire-red/10 px-4 py-3 text-sm font-semibold text-fire-red-dark">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="font-display flex w-full items-center justify-center gap-2 rounded-full border-4 border-fire-red-dark bg-fire-red px-6 py-4 text-lg font-bold text-white shadow-lg transition-opacity disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span
                className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                aria-hidden="true"
              />
              Sending&hellip;
            </>
          ) : (
            "🚨 SUBMIT RSVP"
          )}
        </button>
      </form>
    </motion.section>
  );
}

function AttendingOption({
  id,
  label,
  checked,
  onSelect,
}: {
  id: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center justify-center rounded-xl border-2 px-3 py-3 text-center text-sm font-bold transition-colors ${
        checked
          ? "border-fire-red-dark bg-fire-red text-white"
          : "border-navy/20 bg-white text-navy"
      }`}
    >
      <input
        id={id}
        type="radio"
        name="attending"
        className="sr-only"
        checked={checked}
        onChange={onSelect}
      />
      {label}
    </label>
  );
}
