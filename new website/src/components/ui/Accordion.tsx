"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export function Accordion({
  items,
  openId,
  onToggle,
}: {
  items: AccordionItem[];
  openId: string | null;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="divide-y rounded-lg border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="px-4 py-1">
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left font-medium"
              aria-expanded={isOpen}
            >
              {item.title}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && <div className="pb-4 text-muted-foreground">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
