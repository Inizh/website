import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestPosts } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";

export function LatestPosts() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;
  return (
    <Section>
      <Container>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Latest from the blog</h2>
            <p className="text-muted-foreground">Notes on IoT, software, and game development.</p>
          </div>
          <Link href="/blog" className="hidden items-center gap-1 text-accent hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
