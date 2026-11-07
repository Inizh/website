"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { productsData } from "@/lib/data";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const category = searchParams.get("category") ?? "all";
  const query = searchParams.get("q") ?? "";

  const tabs = [
    { id: "all", label: "All" },
    ...productsData.categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Tabs
        tabs={tabs}
        activeId={category}
        onChange={(id) => updateParams({ category: id === "all" ? null : id })}
      />
      <Input
        type="search"
        placeholder="Search products..."
        value={query}
        onChange={(e) => updateParams({ q: e.target.value })}
        className="md:w-64"
      />
    </div>
  );
}
