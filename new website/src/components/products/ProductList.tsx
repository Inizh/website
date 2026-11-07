"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types";
import { productsData } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const query = searchParams.get("q") ?? "";

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const search = query.toLowerCase();
      const matchesQuery =
        query === "" ||
        product.name.toLowerCase().includes(search) ||
        product.summary.toLowerCase().includes(search) ||
        product.tags.some((tag) => tag.toLowerCase().includes(search));
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <>
      <ProductFilters />
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No products match your filters.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
