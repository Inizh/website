import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types";
import { blogData, getAuthorById, getBlogCategoryLabel } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const author = getAuthorById(post.authorId);
  const category = getBlogCategoryLabel(blogData.categories, post.category);
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full overflow-hidden">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="flex h-full flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline">{category}</Badge>
            <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
          {author && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{author.name}</span>
              <span>·</span>
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
