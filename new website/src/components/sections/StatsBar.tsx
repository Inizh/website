import { home } from "@/lib/data";

export function StatsBar() {
  return (
    <section className="border-y bg-muted/30 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {home.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-bold text-accent">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
