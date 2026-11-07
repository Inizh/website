import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export function ServicesGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What we do</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Software and IoT are our focus. Games are where we play and experiment.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {home.services.map((service) => (
            <Card key={service.id} className="group">
              <CardContent className="flex h-full flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-4 flex-1 text-muted-foreground">{service.description}</p>
                <ul className="mb-4 space-y-1 text-sm text-muted-foreground">
                  {service.features.map((feature) => (
                    <li key={feature}>— {feature}</li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
