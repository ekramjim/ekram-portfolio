import fs from "fs";
import path from "path";
import { Article } from "@/app/types/articles";

// Helper function to get all articles
export function getAllArticles(): Article[] {
    const articlesDirectory = path.join(process.cwd(), "public/articles");

    try {
        const folderNames = fs
            .readdirSync(articlesDirectory, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        const articles = folderNames
            .map((folderName) => {
                const metadataPath = path.join(
                    articlesDirectory,
                    folderName,
                    "metadata.json",
                );
                const contentPath = path.join(
                    articlesDirectory,
                    folderName,
                    "content.md",
                );

                try {
                    const metadataContents = fs.readFileSync(metadataPath, "utf8");
                    const contentContents = fs.readFileSync(contentPath, "utf8");
                    const metadata = JSON.parse(metadataContents);

                    return {
                        ...metadata,
                        content: contentContents,
                    } as Article;
                } catch (error) {
                    console.error(`Error reading article ${folderName}:`, error);
                    return null;
                }
            })
            .filter((article): article is Article => article !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return articles;
    } catch (error) {
        console.error("Error reading articles:", error);
        return [];
    }
}

// Helper function to get a single article by slug
export function getArticleBySlug(slug: string): Article | null {
    const articlesDirectory = path.join(process.cwd(), "public/articles");

    try {
        const metadataPath = path.join(articlesDirectory, slug, "metadata.json");
        const contentPath = path.join(articlesDirectory, slug, "content.md");

        const metadataContents = fs.readFileSync(metadataPath, "utf8");
        const contentContents = fs.readFileSync(contentPath, "utf8");
        const metadata = JSON.parse(metadataContents);

        return {
            ...metadata,
            content: contentContents,
        } as Article;
    } catch (error) {
        console.error("Error reading article:", error);
        return null;
    }
}
