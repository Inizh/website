import { z } from "zod";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const NonEmptyString = z.string().min(1);

export const ImageSchema = z.object({
  src: NonEmptyString,
  alt: NonEmptyString,
});

export const LinkSchema = z.object({
  label: NonEmptyString,
  href: NonEmptyString,
});

export const CtaSchema = LinkSchema;

export const SocialLinkSchema = z.object({
  platform: NonEmptyString,
  url: NonEmptyString,
});

export const SeoSchema = z.object({
  title: NonEmptyString,
  description: NonEmptyString,
});

export const SiteSchema = z.object({
  name: NonEmptyString,
  tagline: NonEmptyString,
  description: NonEmptyString,
  url: NonEmptyString.url(),
  logo: z.object({
    light: NonEmptyString,
    dark: NonEmptyString,
    alt: NonEmptyString,
  }),
  ogImage: NonEmptyString,
  contactEmail: NonEmptyString.email(),
  supportEmail: NonEmptyString.email(),
  phone: NonEmptyString,
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: NonEmptyString,
    state: NonEmptyString,
    country: NonEmptyString,
    postalCode: z.string(),
  }),
  social: z.array(SocialLinkSchema),
  footer: z.object({
    copyright: NonEmptyString,
    legalLinks: z.array(LinkSchema),
  }),
});

export const NavigationSchema = z.object({
  header: z.array(LinkSchema),
  headerCta: LinkSchema,
  footerColumns: z.array(
    z.object({
      title: NonEmptyString,
      links: z.array(LinkSchema),
    }),
  ),
});

export const HomeSchema = z.object({
  seo: SeoSchema,
  hero: z.object({
    eyebrow: NonEmptyString,
    headline: NonEmptyString,
    subheadline: NonEmptyString,
    primaryCta: CtaSchema,
    secondaryCta: CtaSchema,
    image: ImageSchema.optional(),
  }),
  stats: z.array(
    z.object({
      value: NonEmptyString,
      label: NonEmptyString,
    }),
  ),
  services: z.array(
    z.object({
      id: NonEmptyString,
      icon: NonEmptyString,
      title: NonEmptyString,
      description: NonEmptyString,
      href: NonEmptyString,
      features: z.array(NonEmptyString),
    }),
  ),
  featured: z.object({
    productSlugs: z.array(z.string().regex(slugRegex)),
    gameSlugs: z.array(z.string().regex(slugRegex)),
    postSlugs: z.array(z.string().regex(slugRegex)),
  }),
  process: z.array(
    z.object({
      step: z.number().int().min(1),
      title: NonEmptyString,
      description: NonEmptyString,
    }),
  ),
  testimonials: z.array(
    z.object({
      quote: NonEmptyString,
      author: NonEmptyString,
      role: NonEmptyString,
      company: NonEmptyString,
      avatar: z.string().optional(),
    }),
  ),
  clients: z.array(
    z.object({
      name: NonEmptyString,
      logo: NonEmptyString,
    }),
  ),
  finalCta: z.object({
    headline: NonEmptyString,
    description: NonEmptyString,
    cta: CtaSchema,
  }),
});

export const AboutSchema = z.object({
  seo: SeoSchema,
  intro: z.object({
    headline: NonEmptyString,
    body: z.array(NonEmptyString),
  }),
  mission: z.object({
    title: NonEmptyString,
    body: NonEmptyString,
  }),
  vision: z.object({
    title: NonEmptyString,
    body: NonEmptyString,
  }),
  values: z.array(
    z.object({
      icon: NonEmptyString,
      title: NonEmptyString,
      description: NonEmptyString,
    }),
  ),
  timeline: z.array(
    z.object({
      year: NonEmptyString,
      title: NonEmptyString,
      description: NonEmptyString,
    }),
  ),
  team: z.array(
    z.object({
      name: NonEmptyString,
      role: NonEmptyString,
      bio: NonEmptyString,
      photo: z.string(),
      links: z.array(SocialLinkSchema).optional(),
    }),
  ),
  stats: z.array(
    z.object({
      value: NonEmptyString,
      label: NonEmptyString,
    }),
  ),
  cta: z.object({
    headline: NonEmptyString,
    description: NonEmptyString,
    cta: CtaSchema,
  }),
});

const ProductStatus = z.enum(["available", "beta", "coming-soon", "discontinued"]);

export const ProductsSchema = z.object({
  seo: SeoSchema,
  categories: z.array(
    z.object({
      id: NonEmptyString,
      label: NonEmptyString,
    }),
  ),
  items: z.array(
    z.object({
      slug: z.string().regex(slugRegex),
      name: NonEmptyString,
      category: NonEmptyString,
      tagline: NonEmptyString,
      summary: NonEmptyString.max(160),
      description: z.array(NonEmptyString),
      image: ImageSchema,
      gallery: z.array(ImageSchema).optional(),
      features: z.array(
        z.object({
          icon: NonEmptyString,
          title: NonEmptyString,
          description: NonEmptyString,
        }),
      ),
      specs: z.array(
        z.object({
          group: NonEmptyString,
          items: z.array(
            z.object({
              label: NonEmptyString,
              value: NonEmptyString,
            }),
          ),
        }),
      ),
      useCases: z.array(NonEmptyString),
      pricingPlanIds: z.array(NonEmptyString).optional(),
      downloads: z.array(LinkSchema).optional(),
      status: ProductStatus,
      tags: z.array(NonEmptyString),
      featured: z.boolean().optional(),
      published: z.boolean(),
      order: z.number().int().optional(),
    }),
  ),
});

const GameStatus = z.enum(["concept", "in-development", "early-access", "released"]);

export const GamesSchema = z.object({
  seo: SeoSchema,
  genres: z.array(
    z.object({
      id: NonEmptyString,
      label: NonEmptyString,
    }),
  ),
  platforms: z.array(
    z.object({
      id: NonEmptyString,
      label: NonEmptyString,
      icon: NonEmptyString,
    }),
  ),
  items: z.array(
    z.object({
      slug: z.string().regex(slugRegex),
      title: NonEmptyString,
      tagline: NonEmptyString,
      summary: NonEmptyString,
      description: z.array(NonEmptyString),
      genres: z.array(NonEmptyString),
      platforms: z.array(NonEmptyString),
      status: GameStatus,
      releaseDate: z.string().regex(isoDateRegex).optional(),
      cover: ImageSchema,
      banner: ImageSchema.optional(),
      screenshots: z.array(ImageSchema).optional(),
      trailer: z
        .object({
          provider: z.enum(["youtube"]),
          id: NonEmptyString,
        })
        .optional(),
      features: z.array(NonEmptyString),
      engine: NonEmptyString.optional(),
      storeLinks: z.array(LinkSchema).optional(),
      systemRequirements: z
        .record(
          z.enum(["minimum", "recommended"]),
          z.record(NonEmptyString, NonEmptyString),
        )
        .optional(),
      pressQuotes: z
        .array(
          z.object({
            quote: NonEmptyString,
            source: NonEmptyString,
          }),
        )
        .optional(),
      featured: z.boolean().optional(),
      published: z.boolean(),
      order: z.number().int().optional(),
    }),
  ),
  services: z
    .object({
      title: NonEmptyString,
      description: NonEmptyString,
      offerings: z.array(
        z.object({
          icon: NonEmptyString,
          title: NonEmptyString,
          description: NonEmptyString,
        }),
      ),
      cta: CtaSchema,
    })
    .optional(),
});

const BaseContentBlock = z.object({ type: NonEmptyString });

const HeadingBlock = BaseContentBlock.extend({
  type: z.literal("heading"),
  level: z.number().int().min(1).max(6),
  text: NonEmptyString,
});

const ParagraphBlock = BaseContentBlock.extend({
  type: z.literal("paragraph"),
  text: NonEmptyString,
});

const ListBlock = BaseContentBlock.extend({
  type: z.literal("list"),
  ordered: z.boolean(),
  items: z.array(NonEmptyString),
});

const CodeBlock = BaseContentBlock.extend({
  type: z.literal("code"),
  language: NonEmptyString,
  code: NonEmptyString,
});

const ImageBlock = BaseContentBlock.extend({
  type: z.literal("image"),
  src: NonEmptyString,
  alt: NonEmptyString,
  caption: z.string().optional(),
});

const QuoteBlock = BaseContentBlock.extend({
  type: z.literal("quote"),
  text: NonEmptyString,
  cite: z.string().optional(),
});

const CalloutBlock = BaseContentBlock.extend({
  type: z.literal("callout"),
  variant: z.enum(["info", "tip", "warning"]),
  title: NonEmptyString,
  text: NonEmptyString,
});

const DividerBlock = BaseContentBlock.extend({
  type: z.literal("divider"),
});

const VideoBlock = BaseContentBlock.extend({
  type: z.literal("video"),
  src: NonEmptyString,
  title: z.string().optional(),
});

export const ContentBlockSchema = z.discriminatedUnion("type", [
  HeadingBlock,
  ParagraphBlock,
  ListBlock,
  CodeBlock,
  ImageBlock,
  QuoteBlock,
  CalloutBlock,
  DividerBlock,
  VideoBlock,
]);

export const BlogSchema = z.object({
  seo: SeoSchema,
  categories: z.array(
    z.object({
      id: NonEmptyString,
      label: NonEmptyString,
    }),
  ),
  authors: z.array(
    z.object({
      id: NonEmptyString,
      name: NonEmptyString,
      role: NonEmptyString,
      avatar: z.string(),
    }),
  ),
  posts: z.array(
    z.object({
      slug: z.string().regex(slugRegex),
      title: NonEmptyString,
      excerpt: NonEmptyString,
      category: NonEmptyString,
      tags: z.array(NonEmptyString),
      authorId: NonEmptyString,
      publishedAt: z.string().regex(isoDateRegex),
      updatedAt: z.string().regex(isoDateRegex).optional(),
      readingTimeMinutes: z.number().int().min(1).optional(),
      cover: ImageSchema,
      content: z.array(ContentBlockSchema),
      relatedProductSlugs: z.array(z.string().regex(slugRegex)).optional(),
      relatedGameSlugs: z.array(z.string().regex(slugRegex)).optional(),
      featured: z.boolean().optional(),
      published: z.boolean(),
    }),
  ),
});

export const PricingSchema = z.object({
  seo: SeoSchema,
  intro: z.object({
    headline: NonEmptyString,
    subheadline: NonEmptyString,
  }),
  currency: z.object({
    code: NonEmptyString,
    symbol: NonEmptyString,
  }),
  billingPeriods: z.array(
    z.object({
      id: NonEmptyString,
      label: NonEmptyString,
      badge: z.string().optional(),
    }),
  ),
  plans: z.array(
    z.object({
      id: NonEmptyString,
      name: NonEmptyString,
      description: NonEmptyString,
      price: z
        .record(
          z.string(),
          z.number().int().nonnegative(),
        )
        .nullable(),
      priceLabel: z.string().nullable().optional(),
      highlighted: z.boolean().optional(),
      badge: z.string().nullable().optional(),
      features: z.array(
        z.object({
          text: NonEmptyString,
          included: z.boolean(),
        }),
      ),
      cta: CtaSchema,
      published: z.boolean(),
      order: z.number().int().optional(),
    }),
  ),
  comparison: z.object({
    groups: z.array(
      z.object({
        title: NonEmptyString,
        rows: z.array(
          z.object({
            feature: NonEmptyString,
            values: z.record(NonEmptyString, z.string()),
          }),
        ),
      }),
    ),
  }),
  customServices: z.array(
    z.object({
      title: NonEmptyString,
      description: NonEmptyString,
      startingAt: z.string().optional(),
      cta: CtaSchema,
    }),
  ),
  faq: z.array(
    z.object({
      question: NonEmptyString,
      answer: NonEmptyString,
    }),
  ),
});

const FormFieldSchema = z.object({
  name: NonEmptyString,
  label: NonEmptyString,
  type: z.enum(["text", "email", "tel", "textarea", "select"]),
  required: z.boolean(),
  placeholder: z.string(),
  options: z.array(LinkSchema).optional(),
});

export const ContactSchema = z.object({
  seo: SeoSchema,
  intro: z.object({
    headline: NonEmptyString,
    subheadline: NonEmptyString,
  }),
  form: z.object({
    fields: z.array(FormFieldSchema),
    subjectOptions: z.array(LinkSchema),
    successMessage: NonEmptyString,
    privacyNote: NonEmptyString,
  }),
  channels: z.array(
    z.object({
      icon: NonEmptyString,
      label: NonEmptyString,
      value: NonEmptyString,
      href: z.string(),
    }),
  ),
  offices: z.array(
    z.object({
      name: NonEmptyString,
      address: z.object({
        line1: z.string(),
        line2: z.string().optional(),
        city: NonEmptyString,
        state: NonEmptyString,
        country: NonEmptyString,
        postalCode: z.string(),
      }),
      phone: z.string(),
      email: z.string().email().optional(),
      hours: NonEmptyString,
      mapEmbedUrl: z.string().optional(),
    }),
  ),
});

export const SupportSchema = z.object({
  seo: SeoSchema,
  intro: z.object({
    headline: NonEmptyString,
    subheadline: NonEmptyString,
  }),
  channels: z.array(
    z.object({
      id: NonEmptyString,
      icon: NonEmptyString,
      title: NonEmptyString,
      value: NonEmptyString,
      href: z.string(),
      hours: z.string().optional(),
      responseTime: z.string().optional(),
    }),
  ),
  categories: z.array(
    z.object({
      id: NonEmptyString,
      icon: NonEmptyString,
      title: NonEmptyString,
      description: NonEmptyString,
      href: z.string(),
    }),
  ),
  faq: z.array(
    z.object({
      category: NonEmptyString,
      question: NonEmptyString,
      answer: NonEmptyString,
    }),
  ),
  resources: z.array(
    z.object({
      icon: NonEmptyString,
      title: NonEmptyString,
      description: NonEmptyString,
      href: NonEmptyString,
    }),
  ),
  statusPage: z.object({
    label: NonEmptyString,
    href: NonEmptyString,
  }),
  form: z.object({
    categories: z.array(LinkSchema),
    priorities: z.array(LinkSchema),
    productOptions: z.array(LinkSchema),
    gameOptions: z.array(LinkSchema),
    successMessage: NonEmptyString,
  }),
  slaNotes: z.array(NonEmptyString),
});
