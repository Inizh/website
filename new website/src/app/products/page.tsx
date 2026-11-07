import { Suspense } from "react";
import { getProducts, productsData } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProductList } from "@/components/products/ProductList";

export const metadata = createMetadata({
  title: productsData.seo.title,
  description: productsData.seo.description,
  path: "/products",
});

export default function ProductsPage() {
  const products = getProducts();

  return (
    <>
      <Section className="bg-muted/30">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold">{productsData.seo.title}</h1>
            <p className="text-lg text-muted-foreground">{productsData.seo.description}</p>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Suspense fallback={<p className="py-12 text-center">Loading products...</p>}>
            <ProductList products={products} />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
