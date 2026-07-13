"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, ArrowUpRight } from "lucide-react";
import { Game } from "@/types";
import { Locale } from "@/lib/i18n/config";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const params = useParams();
  const lang = (params.lang as Locale) || "en";

  return (
    <Link href={`/${lang}/games/${game.slug}/`}>
      <div className="group relative bg-card border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-accent text-black p-2 rounded-full">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {game.genre.map((g) => (
              <Badge key={g} variant="accent" className="text-[10px]">
                {g}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {game.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{game.rating}</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              {game.platforms.slice(0, 3).map((p) => (
                <span key={p} className="text-xs">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}