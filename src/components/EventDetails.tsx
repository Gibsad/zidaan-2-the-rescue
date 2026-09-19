import { EVENT } from "@/lib/event";

const ROWS = [
  { icon: "📅", label: EVENT.dateLabel },
  { icon: "🕚", label: EVENT.timeLabel },
  { icon: "📍", label: `${EVENT.addressLine1}, ${EVENT.addressLine2}` },
] as const;

export default function EventDetails({ className = "" }: { className?: string }) {
  return (
    <dl className={`w-full max-w-sm space-y-3 ${className}`}>
      {ROWS.map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-3 rounded-2xl border-2 border-navy/10 bg-white/90 px-4 py-3 text-left shadow-sm"
        >
          <dt aria-hidden="true" className="text-2xl leading-none">
            {row.icon}
          </dt>
          <dd className="font-body text-sm font-semibold text-navy sm:text-base">
            {row.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
