import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { Components } from "react-markdown";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import ReadyToGetStarted from "@/app/components/shared/ReadyToGetStarted";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const MarkdownComponents: Partial<Components> = {
  h1: () => null, // Add this line to ignore h1 tags from markdown content
  p: ({ children }) => <p className="mb-4">{children}</p>,
  h2: ({ children }) => (
    <h2 className="text-3xl font-normal mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-normal mt-6 mb-3">{children}</h3>
  ),
  ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  code: ({
    children,
    className,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || "");
    return (
      <code
        className={`${className || ""} ${!match ? "bg-secondary rounded px-1 py-0.5" : ""
          }`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-secondary p-3 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
};

// Generate static params for SEO
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 mt-8">
          {/* <BackButton /> */}
          <Link href="/articles" className="text-primary hover:text-primary/80 transition-colors">
            ← Back to Articles
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8 space-y-5">
          <h1 className="text-5xl font-normal text-black leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-black">{article.excerpt}</p>

          <div className="flex items-center gap-2 text-black">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{format(new Date(article.date), "MMM dd, yyyy")}</span>
            <span>•</span>
            <span>{article.readingTime} read</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-[400px] object-cover rounded-lg"
            priority
          />
        </div>

        {/* Article Content */}
        <article>
          <ReactMarkdown
            components={MarkdownComponents}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        {/* Ready to Get Started Section */}
        <ReadyToGetStarted />
      </div>
    </main>
  );
}
