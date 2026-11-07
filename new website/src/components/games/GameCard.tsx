import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/types";
import { gamesData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const statusLabel = game.status.replace("-", " ");
  return (
    <Link href={`/games/${game.slug}`}>
      <Card className="group h-full overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={game.cover.src}
            alt={game.cover.alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="accent">{statusLabel}</Badge>
            <div className="flex gap-1">
              {game.platforms.map((platformId) => {
                const platform = gamesData.platforms.find((p) => p.id === platformId);
                return platform ? (
                  <span key={platformId} title={platform.label}>
                    <Icon name={platform.icon} className="h-4 w-4 text-muted-foreground" />
                  </span>
                ) : null;
              })}
            </div>
          </div>
          <h3 className="mb-1 text-xl font-semibold">{game.title}</h3>
          <p className="text-sm text-muted-foreground">{game.summary}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
