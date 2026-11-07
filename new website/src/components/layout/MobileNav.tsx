"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/data";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b bg-background p-4 shadow-lg">
          <nav className="flex flex-col gap-2">
            {navigation.header.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium hover:bg-accent/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={navigation.headerCta.href}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-accent px-3 py-2 text-center font-semibold text-accent-foreground"
            >
              {navigation.headerCta.label}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
