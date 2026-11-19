import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featuredTopicsData, type BlogPostItem } from "@/data/blogs";
import {
  BlogInnerSection,
  FeaturedReadsSection,
} from "@/components/sections/blogs";
import { CtaBanner } from "@/components/shared";
import { blogsCtaBanner } from "@/data/cta-banner";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return featuredTopicsData.posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      slug: post.slug as string,
    }));
}

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = featuredTopicsData.posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Divine Infinity Numerology",
    };
  }

  return {
    title: `${post.title} | Divine Infinity Numerology`,
    description: post.description,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const post: BlogPostItem | undefined = featuredTopicsData.posts.find(
    (p) => p.slug === slug
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="relative flex min-h-[calc(100vh+1px)] flex-col overflow-x-clip bg-page-gradient">
      {/* Page Content Flow: Top offset 117px on desktop (reduced by 30% to 82px on mobile/tablet) */}
      <div className="relative z-10 flex min-h-[50vh] w-full flex-1 flex-col pt-[82px] lg:pt-[117px]">
        {/* Main Blog Inner Content */}
        <BlogInnerSection title="Manifestation: Turning Intentions into Action" />

        {/* You May Also Like Section (with blogs-stars background) */}
        <FeaturedReadsSection
          data={{ heading: "You May Also Like" }}
          showStars
          className="min-h-[771px]"
        />
      </div>

      {/* Pre-footer Call to Action (clean background, no stars) */}
      <CtaBanner data={blogsCtaBanner} />
    </main>
  );
}
