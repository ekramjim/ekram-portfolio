"use client";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/app/types/articles";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

interface ArticleCardProps {
  article: Article;
  variant?: "slider" | "grid";
}

const ArticleCard = ({ article, variant = "grid" }: ArticleCardProps) => {
  const isSlider = variant === "slider";

  return (
    <div className={isSlider ? "" : "w-full"}>
      <Link href={`/articles/${article.slug}`} className="block">
        <div
          className={`bg-white shadow-lg rounded-4xl relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
            isSlider ? "m-3 my-10" : "h-full"
          }`}
        >
          {/* Image wrapper with padding to keep spacing around the image */}
          <div className="p-4">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={389}
              height={262}
              className="w-full rounded-sm object-cover"
            />
          </div>

          <span className="absolute text-base bg-primary text-white hover:bg-black hover:shadow-xl py-3 px-6 rounded-full top-56 right-11 transition-all duration-300">
            {article.readingTime} read
          </span>

          {/* Text area with extra padding (keeps separate from image padding) */}
          <div className="px-6 pb-6 pt-4">
            <div className="block">
              <h5 className="font-normal hover:text-primary transition-colors">
                {article.title}
              </h5>
              <p className="text-sm text-black pt-2 line-clamp-2">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-normal text-primary">
                  By {article.author}
                </h3>
                <h3 className="text-sm font-normal text-black">
                  {format(new Date(article.date), "MMM dd, yyyy")}
                </h3>
              </div>
              <Icon
                icon="mdi:chevron-right"
                className="text-primary text-2xl"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
