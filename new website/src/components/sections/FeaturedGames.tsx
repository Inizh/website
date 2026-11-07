import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedGames } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GameCard } from "@/components/games/GameCard";

export function FeaturedGames() {
  const games = getFeaturedGames();
  if (games.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Featured games</h2>
            <p className="text-muted-foreground">Original titles from the Inizh studio.</p>
          </div>
          <Link href="/games" className="hidden items-center gap-1 text-accent hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
