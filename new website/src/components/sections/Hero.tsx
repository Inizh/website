import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = home;
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="mb-6 inline-block rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              {hero.eyebrow}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">{hero.subheadline}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href={hero.primaryCta.href}>
                <Button variant="accent" size="lg" className="gap-2">
                  {hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={hero.secondaryCta.href}>
                <Button variant="outline" size="lg">
                  {hero.secondaryCta.label}
                </Button>
              </Link>
            </div>
          </div>
          {hero.image && (
            <div className="relative aspect-video overflow-hidden rounded-lg border lg:aspect-[4/3]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
