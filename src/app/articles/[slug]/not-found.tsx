import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-normal text-black mb-4">
          Article Not Found
        </h2>
        <p className="text-xl text-black mb-8">
          Sorry, we couldn't find the article you're looking for.
        </p>
        <Link
          href="/articles"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Back to Articles
        </Link>
      </div>
    </div>
  );
}
