import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { productsData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getCategoryLabel } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const statusLabel = product.status.replace("-", " ");
  const category = getCategoryLabel(productsData.categories, product.category);

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group h-full overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="flex h-full flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">{category}</Badge>
            <Badge variant="accent">{statusLabel}</Badge>
          </div>
          <h3 className="mb-1 text-xl font-semibold">{product.name}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{product.summary}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
