"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Gamepad2, Star } from "lucide-react";
import { games } from "@/lib/data";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function LatestGames() {
  const params = useParams();
  const lang = (params.lang as Locale) || "en";
  const dict = getDictionary(lang);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{dict.games.title}</h2>
            <p className="text-muted-foreground">{dict.games.subtitle}</p>
          </div>
          {games.length > 0 && (
            <Link
              href={`/${lang}/games/`}
              className="hidden sm:flex items-center gap-2 text-accent hover:underline"
            >
              {dict.common.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {games.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-card p-12 text-center"
          >
            <Gamepad2 className="h-12 w-12 text-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-3">{dict.games.comingSoon}</h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              {dict.games.comingSoonDesc}
            </p>
            <Link href={`/${lang}/community/`}>
              <Button variant="accent" className="gap-2">
                {dict.community.discordCta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 3).map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${lang}/games/${game.slug}/`}>
                  <div className="group relative overflow-hidden rounded-xl bg-card border hover:border-accent/50 transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {game.genre.slice(0, 2).map((g) => (
                          <Badge key={g} variant="accent" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{game.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {game.releaseYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
