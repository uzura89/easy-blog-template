import jsdom from "jsdom";
import fs from "fs";
import path from "path";

import { Article } from "@/types/Article";
import { deleteArticleDirectory } from "./delete-article";
import { getArticlePath } from "./modules/path";
import { isProduction } from "./modules/envChecker";
import {
  makeUniqueSlug,
  processArticleAndSaveImages,
  saveArticleJson,
} from "./modules/article.handler";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

/**
 * Main
 */

export default async function handler(req: any, res: any) {
  if (isProduction()) throw Error;

  try {
    const { status, title, date, body, tags, slug } = req.body;

    const uniqueSlug = await makeUniqueSlug(slug);

    const article = await processArticleAndSaveImages(
      status,
      title,
      date,
      body,
      tags,
      uniqueSlug
    );

    await saveArticleJson(uniqueSlug, article);

    return res.status(200).json({ slug: uniqueSlug });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
