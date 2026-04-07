import { NextResponse } from "next/server";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export const GET = (request: Request) => {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    // Return single article
    const article = getArticleBySlug(slug);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ article });
  } else {
    // Return all articles
    const articles = getAllArticles();
    return NextResponse.json({ articles });
  }
};
