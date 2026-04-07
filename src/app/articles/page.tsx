"use client";
import { useEffect, useState } from "react";
// import Link from "next/link";
import { Article } from "@/app/types/articles";
import ArticleCard from "@/app/components/shared/ArticleCard";
import ReadyToGetStarted from "../components/shared/ReadyToGetStarted";
// import ArticlesSkeleton from "@/app/components/Skeleton/Articles";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="text-center pt-16 pb-10">
          <p className="text-primary text-xl font-normal tracking-widest">
            ARTICLES
          </p>
          <h2 className="mt-2">Our latest posts.</h2>
          <p className="text-black mt-4 max-w-2xl mx-auto">
            Discover insights, tips, and strategies to help you build better
            products and grow your business.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="bg-grey p-10 rounded-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="grid"
              />
            ))}
          </div>
        </div>

        {/* Get in Touch Section */}
        <ReadyToGetStarted />
      </div>
    </main>
  );
};

export default ArticlesPage;
