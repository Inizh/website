import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { home } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="rounded-2xl bg-accent/10 px-6 py-16 text-center md:px-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{home.finalCta.headline}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            {home.finalCta.description}
          </p>
          <Link href={home.finalCta.cta.href}>
            <Button variant="accent" size="lg" className="gap-2">
              {home.finalCta.cta.label} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
