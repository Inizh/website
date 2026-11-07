import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
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
} from "../src/lib/schemas.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

const files = [
  { name: "site.json", schema: SiteSchema },
  { name: "navigation.json", schema: NavigationSchema },
  { name: "home.json", schema: HomeSchema },
  { name: "about.json", schema: AboutSchema },
  { name: "products.json", schema: ProductsSchema },
  { name: "games.json", schema: GamesSchema },
  { name: "blog.json", schema: BlogSchema },
  { name: "pricing.json", schema: PricingSchema },
  { name: "contact.json", schema: ContactSchema },
  { name: "support.json", schema: SupportSchema },
];

let hasError = false;

function error(message: string) {
  hasError = true;
  // eslint-disable-next-line no-console
  console.error(`ERROR: ${message}`);
}

function loadJson(name: string) {
  const filePath = path.join(root, "src", "data", name);
  const text = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(text) as unknown;
}

function checkImage(src: string, context: string) {
  if (!src) return;
  if (src.startsWith("http://") || src.startsWith("https://")) return;
  const full = path.join(publicDir, src.replace(/^\//, ""));
  if (!fs.existsSync(full)) {
    error(`Missing image: ${src} (${context})`);
  }
}

for (const { name, schema } of files) {
  try {
    const data = loadJson(name);
    schema.parse(data);
    // eslint-disable-next-line no-console
    console.log(`OK: ${name}`);
  } catch (err) {
    if (err instanceof z.ZodError) {
      for (const issue of err.issues) {
        error(`${name}: ${issue.path.join(".")} — ${issue.message}`);
      }
    } else {
      error(`${name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}

// Cross-check slugs uniqueness and images.
const products = loadJson("products.json") as z.infer<typeof ProductsSchema>;
const games = loadJson("games.json") as z.infer<typeof GamesSchema>;
const blog = loadJson("blog.json") as z.infer<typeof BlogSchema>;

const productSlugs = new Set<string>();
for (const item of products.items) {
  if (productSlugs.has(item.slug)) error(`Duplicate product slug: ${item.slug}`);
  productSlugs.add(item.slug);
  checkImage(item.image.src, `product ${item.slug}`);
  for (const img of item.gallery ?? []) checkImage(img.src, `product ${item.slug} gallery`);
}

const gameSlugs = new Set<string>();
for (const item of games.items) {
  if (gameSlugs.has(item.slug)) error(`Duplicate game slug: ${item.slug}`);
  gameSlugs.add(item.slug);
  checkImage(item.cover.src, `game ${item.slug} cover`);
  if (item.banner) checkImage(item.banner.src, `game ${item.slug} banner`);
  for (const img of item.screenshots ?? []) checkImage(img.src, `game ${item.slug} screenshot`);
}

const postSlugs = new Set<string>();
for (const post of blog.posts) {
  if (postSlugs.has(post.slug)) error(`Duplicate post slug: ${post.slug}`);
  postSlugs.add(post.slug);
  checkImage(post.cover.src, `post ${post.slug}`);
  for (const block of post.content) {
    if (block.type === "image") checkImage(block.src, `post ${post.slug} content image`);
  }
  for (const slug of post.relatedProductSlugs ?? []) {
    if (!productSlugs.has(slug)) error(`Post ${post.slug} references unknown product: ${slug}`);
  }
  for (const slug of post.relatedGameSlugs ?? []) {
    if (!gameSlugs.has(slug)) error(`Post ${post.slug} references unknown game: ${slug}`);
  }
}

const home = loadJson("home.json") as z.infer<typeof HomeSchema>;
for (const slug of home.featured.productSlugs) {
  if (!productSlugs.has(slug)) error(`home.json featured product missing: ${slug}`);
}
for (const slug of home.featured.gameSlugs) {
  if (!gameSlugs.has(slug)) error(`home.json featured game missing: ${slug}`);
}
for (const slug of home.featured.postSlugs) {
  if (!postSlugs.has(slug)) error(`home.json featured post missing: ${slug}`);
}

// Brand images.
const site = loadJson("site.json") as z.infer<typeof SiteSchema>;
checkImage(site.logo.light, "site logo light");
checkImage(site.logo.dark, "site logo dark");
checkImage(site.ogImage, "site ogImage");

if (hasError) {
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log("All data files are valid.");
