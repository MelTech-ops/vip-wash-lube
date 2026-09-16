// VIP Wash & Lube — booking surface, built on the shipped useBookingFlow hook.
// All booking logic belongs to the hook; this file owns only how it looks.
import { useBookingFlow } from "../../hooks/bookings/useBookingFlow";
import type { ServiceDetail } from "../../wix/bookings/types";

const slotClass = (selected: boolean) =>
  `min-w-[5.5rem] border px-4 py-2.5 text-[0.8125rem] font-medium transition-colors ${
    selected
      ? "border-navy-900 bg-navy-900 text-primary-foreground"
      : "border-border text-navy-900 hover:border-navy-700 hover:bg-secondary"
  }`;

const pagerClass =
  "border border-border px-3.5 py-1.5 text-[0.8125rem] text-navy-900 transition-colors hover:border-navy-700 hover:bg-secondary";

export default function VipBookingView({ service }: { service: ServiceDetail }) {
  const {
    days,
    nextWeek,
    prevWeek,
    staffId,
    setStaffId,
    selectedSlot,
    setSelectedSlot,
    formFields,
    values,
    setValue,
    canBook,
    book,
    booking,
    confirmed,
    error,
  } = useBookingFlow(service);

  if (confirmed) {
    return (
      <div className="border border-navy-900 bg-navy-950 p-10 text-center text-navy-300">
        <p className="eyebrow-on-navy">Appointment confirmed</p>
        <p className="mt-4 font-display text-3xl leading-tight text-white">
          You&rsquo;re booked with VIP
        </p>
        <span className="rule-accent mx-auto mt-5 mb-5" />
        <p className="text-sm leading-relaxed">
          <span className="text-white">{service.name}</span>
          {selectedSlot ? ` — ${selectedSlot.dayKey} at ${selectedSlot.label}` : ""}.
          <br />A confirmation email is on its way.
        </p>
        <p className="mt-5 text-[0.8125rem]">
          Payment is taken at the shop when we hand the keys back.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border p-7 lg:p-8">
      <p className="eyebrow">Reserve your bay</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-navy-900">Choose a time</h2>
      <span className="rule-accent mt-4 mb-7" />

      {service.staff.length > 1 && (
        <div className="mb-7">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Detailer
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={slotClass(staffId === undefined)} onClick={() => setStaffId(undefined)}>
              Any available
            </button>
            {service.staff.map((m) => (
              <button key={m.id} type="button" className={slotClass(staffId === m.id)} onClick={() => setStaffId(m.id)}>
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Available times
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={prevWeek} aria-label="Previous week" className={pagerClass}>&larr;</button>
          <button type="button" onClick={nextWeek} aria-label="Next week" className={pagerClass}>&rarr;</button>
        </div>
      </div>

      {days === null ? (
        <div className="space-y-4" aria-busy="true">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-32 animate-pulse bg-secondary" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }, (_, j) => (
                  <div key={j} className="h-10 w-24 animate-pulse bg-secondary" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : days.length === 0 ? (
        <p className="border border-border bg-secondary p-5 text-sm text-muted-foreground">
          No openings this week. Use the arrow above to look at next week, or call us and
          we&rsquo;ll find you a slot.
        </p>
      ) : (
        <div className="space-y-6">
          {days.map((day) => (
            <div key={day.dayKey}>
              <p className="mb-2.5 text-[0.8125rem] font-semibold text-navy-900">{day.dayLabel}</p>
              <div className="flex flex-wrap gap-2">
                {day.slots.map((s) => (
                  <button
                    key={s.startLocal + (s.eventId ?? "")}
                    type="button"
                    className={slotClass(selectedSlot?.startLocal === s.startLocal)}
                    onClick={() => setSelectedSlot(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-9 border-t border-border pt-7">
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Your details
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {formFields.map((f) => (
            <label key={f.target} className="block">
              <span className="mb-1.5 block text-[0.75rem] font-medium text-navy-900">{f.label}</span>
              {f.options?.length ? (
                <select
                  value={values[f.target] ?? ""}
                  onChange={(e) => setValue(f.target, e.target.value)}
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-900"
                >
                  <option value="">Choose&hellip;</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input
                  type={
                    f.type === "EMAIL" ? "email"
                    : f.type === "PHONE" ? "tel"
                    : f.type === "NUMBER" ? "number"
                    : f.type === "URL" ? "url"
                    : "text"
                  }
                  value={values[f.target] ?? ""}
                  onChange={(e) => setValue(f.target, e.target.value)}
                  className="w-full border border-border bg-background px-3.5 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-900"
                />
              )}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="mt-5 border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">{error}</p>}

      <button
        type="button"
        disabled={!canBook || booking}
        onClick={() => book().catch(() => {})}
        className="mt-7 w-full bg-navy-900 px-8 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {booking ? "Reserving…" : "Confirm Appointment"}
      </button>
      <p className="mt-3.5 text-center text-[0.8125rem] text-muted-foreground">
        No card required. Payment is taken at the shop.
      </p>
    </div>
  );
}
