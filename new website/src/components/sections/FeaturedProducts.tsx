import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProducts() {
  const products = getFeaturedProducts();
  if (products.length === 0) return null;

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Featured products</h2>
            <p className="text-muted-foreground">Hardware and software we are shipping now.</p>
          </div>
          <Link href="/products" className="hidden items-center gap-1 text-accent hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
