import { BlogPost, Game, TeamMember } from "@/types";

/** Real games will be added here when ready. Empty = “Coming soon” UI. */
export const games: Game[] = [];

/** Real blog posts will be added here when ready. Empty = “Coming soon” UI. */
export const blogPosts: BlogPost[] = [];

/**
 * Team members — replace with real names/roles/photos when ready.
 * Leave empty to show the “team soon” empty state on About.
 */
export const team: TeamMember[] = [];

/** Social / community links. Use "#" until real URLs are provided. */
export const socialLinks = {
  discord: "#",
  twitter: "#",
  youtube: "#",
  instagram: "#",
  steam: "#",
} as const;

export type SocialPlatform = keyof typeof socialLinks;
