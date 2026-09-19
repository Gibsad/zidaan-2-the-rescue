import { EVENT } from "@/lib/event";

function formatUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Builds a downloadable .ics file for the party. The event is on Oct 31,
 * which is still within Pacific Daylight Time (UTC-7) in 2026, so the local
 * start/end times are converted to UTC directly rather than embedding a full
 * VTIMEZONE block — this keeps the file small and broadly compatible.
 */
export function buildIcsContent(): string {
  const start = new Date(`${EVENT.startDate}-07:00`);
  const end = new Date(`${EVENT.endDate}-07:00`);
  const now = formatUtc(new Date());

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Zidaan 2 The Rescue//RSVP Site//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:zidaan-2-the-rescue-${start.getTime()}@zidaans-fire-station`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${escapeIcsText(EVENT.title)}`,
    `DESCRIPTION:${escapeIcsText(
      `Join us in celebrating ${EVENT.childName}'s ${EVENT.age}nd birthday! Come dressed for rescue duty.`
    )}`,
    `LOCATION:${escapeIcsText(EVENT.fullAddress)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

export function downloadIcsFile(filename = "zidaan-2-the-rescue.ics"): void {
  const content = buildIcsContent();
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
