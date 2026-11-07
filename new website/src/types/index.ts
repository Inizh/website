import type { z } from "zod";
import type {
  SiteSchema,
  NavigationSchema,
  HomeSchema,
  AboutSchema,
  ProductsSchema,
  GamesSchema,
  BlogSchema,
  PricingSchema,
  ContactSchema,
  SupportSchema,
} from "@/lib/schemas";

export type Site = z.infer<typeof SiteSchema>;
export type Navigation = z.infer<typeof NavigationSchema>;
export type Home = z.infer<typeof HomeSchema>;
export type About = z.infer<typeof AboutSchema>;
export type Products = z.infer<typeof ProductsSchema>;
export type Product = Products["items"][number];
export type Games = z.infer<typeof GamesSchema>;
export type Game = Games["items"][number];
export type Blog = z.infer<typeof BlogSchema>;
export type Post = Blog["posts"][number];
export type Author = Blog["authors"][number];
export type ContentBlock = Post["content"][number];
export type Pricing = z.infer<typeof PricingSchema>;
export type Plan = Pricing["plans"][number];
export type Contact = z.infer<typeof ContactSchema>;
export type Support = z.infer<typeof SupportSchema>;
