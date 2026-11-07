import {
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
import type {
  Product,
  Game,
  Post,
  Plan,
  Author,
  Products,
  Games,
  Blog,
  Pricing,
} from "@/types";

import rawSite from "@/data/site.json";
import rawNavigation from "@/data/navigation.json";
import rawHome from "@/data/home.json";
import rawAbout from "@/data/about.json";
import rawProducts from "@/data/products.json";
import rawGames from "@/data/games.json";
import rawBlog from "@/data/blog.json";
import rawPricing from "@/data/pricing.json";
import rawContact from "@/data/contact.json";
import rawSupport from "@/data/support.json";

function parse<T>(schema: { parse: (data: unknown) => T }, data: unknown, name: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to parse ${name}:`, error);
    throw new Error(`Data validation failed for ${name}`);
  }
}

export const site = parse(SiteSchema, rawSite, "site.json");
export const navigation = parse(NavigationSchema, rawNavigation, "navigation.json");
export const home = parse(HomeSchema, rawHome, "home.json");
export const about = parse(AboutSchema, rawAbout, "about.json");
export const productsData = parse(ProductsSchema, rawProducts, "products.json");
export const gamesData = parse(GamesSchema, rawGames, "games.json");
export const blogData = parse(BlogSchema, rawBlog, "blog.json");
export const pricingData = parse(PricingSchema, rawPricing, "pricing.json");
export const contact = parse(ContactSchema, rawContact, "contact.json");
export const support = parse(SupportSchema, rawSupport, "support.json");

function sortByOrder<T extends { order?: number; name?: string; title?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    const aName = a.name ?? a.title ?? "";
    const bName = b.name ?? b.title ?? "";
    return aName.localeCompare(bName);
  });
}

export function getProducts(): Product[] {
  return sortByOrder(productsData.items.filter((item) => item.published));
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.items.find((item) => item.slug === slug && item.published);
}

export function getFeaturedProducts(): Product[] {
  return home.featured.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => item !== undefined);
}

export function getGames(): Game[] {
  return sortByOrder(gamesData.items.filter((item) => item.published));
}

export function getGameBySlug(slug: string): Game | undefined {
  return gamesData.items.find((item) => item.slug === slug && item.published);
}

export function getFeaturedGames(): Game[] {
  return home.featured.gameSlugs
    .map((slug) => getGameBySlug(slug))
    .filter((item): item is Game => item !== undefined);
}

export function getPublishedPosts(): Post[] {
  return [...blogData.posts]
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  return blogData.posts.find((post) => post.slug === slug && post.published);
}

export function getFeaturedPosts(): Post[] {
  return home.featured.postSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== undefined);
}

export function getLatestPosts(count = 3): Post[] {
  return getPublishedPosts().slice(0, count);
}

export function getAuthorById(id: string): Author | undefined {
  return blogData.authors.find((author) => author.id === id);
}

export function getPlans(): Plan[] {
  return sortByOrder(pricingData.plans.filter((plan) => plan.published));
}

export function getPlanById(id: string): Plan | undefined {
  return pricingData.plans.find((plan) => plan.id === id && plan.published);
}

export function getCategoryLabel(categories: Products["categories"], id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function getGenreLabel(genres: Games["genres"], id: string) {
  return genres.find((g) => g.id === id)?.label ?? id;
}

export function getBlogCategoryLabel(categories: Blog["categories"], id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}
