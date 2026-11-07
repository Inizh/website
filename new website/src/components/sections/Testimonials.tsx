import Image from "next/image";
import { home } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";

export function Testimonials() {
  if (home.testimonials.length === 0) return null;
  return (
    <Section>
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What people say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {home.testimonials.map((t, i) => (
            <Card key={i}>
              <CardContent className="flex h-full flex-col">
                <p className="mb-6 flex-1 italic text-muted-foreground">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{t.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
