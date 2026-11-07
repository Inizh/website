import Image from "next/image";
import { home } from "@/lib/data";
import { Container } from "@/components/ui/Container";

export function ClientLogos() {
  if (home.clients.length === 0) return null;
  return (
    <section className="border-y bg-muted/30 py-12">
      <Container>
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale dark:invert">
          {home.clients.map((client) => (
            <div key={client.name} className="relative h-8 w-32">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
