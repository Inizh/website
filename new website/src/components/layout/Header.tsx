import Link from "next/link";
import Image from "next/image";
import { navigation, site } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Image
            src={site.logo.dark}
            alt={site.logo.alt}
            width={120}
            height={32}
            className="hidden h-8 w-auto dark:block"
            priority
          />
          <Image
            src={site.logo.light}
            alt={site.logo.alt}
            width={120}
            height={32}
            className="block h-8 w-auto dark:hidden"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.header.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/10 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link href={navigation.headerCta.href} className="hidden md:inline-flex">
            <Button variant="accent" size="sm">
              {navigation.headerCta.label}
            </Button>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
