// VIP Wash & Lube — detailing listing surface, built on the shipped useServices hook.
// Prices live in each service's tagLine (payment is taken at the shop, so the Wix price
// field is intentionally unset); we render the tagLine rather than a "Free" badge.
import { useServices } from "../../hooks/bookings/useServices";
import type { BookingCategory, ServiceSummary } from "../../wix/bookings/types";

function durationLabel(mins: number | null): string | null {
  if (!mins) return null;
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (mins >= 480) return "Full day";
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

function ServiceCard({ service }: { service: ServiceSummary }) {
  const duration = durationLabel(service.durationMinutes);
  return (
    <a
      href={`/services/${service.slug}`}
      className="group flex flex-col border border-border bg-background no-underline transition-colors hover:border-navy-700"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-4xl text-navy-300">VIP</span>
          </div>
        )}
        {service.free && service.tagLine.toLowerCase().includes("complimentary") && (
          <span className="absolute left-0 top-0 bg-navy-900 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent-on-navy">
            Complimentary
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.6rem] leading-tight text-navy-900">{service.name}</h3>
        <span className="rule-accent mt-3 mb-4" />
        {service.tagLine && (
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            {service.tagLine}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-7">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy-900">
            Book appointment
          </span>
          {duration && <span className="text-[0.8125rem] text-muted-foreground">{duration}</span>}
        </div>
      </div>
    </a>
  );
}

function CardSkeleton() {
  return (
    <div className="border border-border" aria-hidden="true">
      <div className="aspect-[4/3] animate-pulse bg-secondary" />
      <div className="space-y-3 p-6">
        <div className="h-6 w-3/4 animate-pulse bg-secondary" />
        <div className="h-3 w-1/2 animate-pulse bg-secondary" />
        <div className="h-3 w-2/3 animate-pulse bg-secondary" />
      </div>
    </div>
  );
}

export default function VipServicesView({
  initialServices,
  initialCategories,
}: {
  initialServices?: ServiceSummary[];
  initialCategories?: BookingCategory[];
}) {
  const { services, categories, activeCategoryId, setActiveCategoryId, error } = useServices({
    initialServices,
    initialCategories,
  });

  if (error) {
    return (
      <p className="border border-border p-8 text-sm text-muted-foreground">
        We couldn&rsquo;t load the detailing menu just now. Please call your nearest location and
        we&rsquo;ll book you in by phone.
      </p>
    );
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategoryId(null)}
            className={`px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
              activeCategoryId === null
                ? "bg-navy-900 text-primary-foreground"
                : "border border-border text-muted-foreground hover:border-navy-700 hover:text-navy-900"
            }`}
          >
            All Services
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategoryId(c.id)}
              className={`px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                activeCategoryId === c.id
                  ? "bg-navy-900 text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-navy-700 hover:text-navy-900"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {services === null ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : services.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="font-display text-2xl text-navy-900">No services listed yet</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Our detailing menu is being updated. Call any of our three locations and we&rsquo;ll
            book your appointment directly.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </div>
  );
}
