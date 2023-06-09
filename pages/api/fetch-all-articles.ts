import path from "path";
import { promisify } from "util";
import fs from "fs";
import { ArticleHeader } from "@/types/Article";
import { getArticlesPath } from "./modules/path";
import { isProduction } from "./modules/envChecker";
import { ARTICLE_STATUS_DRAFT } from "@/constants";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

/**
 * Modules
 */

const getArticlesFromJson = async () => {
  try {
    const articlesPath = getArticlesPath();

    const articleFolderNames = await readdir(articlesPath);

    const articles: ArticleHeader[] = [];

    for (const articleFolderName of articleFolderNames) {
      if (articleFolderName.startsWith(".")) continue;

      const articleJsonFilePath = path.join(
        articlesPath,
        articleFolderName,
        "article.json"
      );
      if (!fs.existsSync(articleJsonFilePath)) throw Error;
      const data = await readFile(articleJsonFilePath, "utf8");

      const jsonData = JSON.parse(data);

      // don't include draft article if it's production
      if (isProduction() && jsonData.status === ARTICLE_STATUS_DRAFT) {
        return;
      }

      articles.push({
        status: jsonData.status,
        slug: articleFolderName,
        title: jsonData.title,
        date: jsonData.date,
        tags: jsonData.tags,
        image: jsonData.images[0],
      });
    }

    return articles;
  } catch (err) {
    throw Error;
  }
};

/**
 * Main
 */

export default async function handler(req: any, res: any) {
  try {
    const articles = await getArticlesFromJson();

    if (!articles) return res.status(200).json({ articles: [] });

    // sort articles by date
    articles.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    return res.status(200).json({ articles });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
