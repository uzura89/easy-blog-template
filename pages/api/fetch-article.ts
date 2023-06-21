import path from "path";
import { promisify } from "util";
import fs from "fs";

import { Article } from "@/types/Article";
import { getJsonPath } from "./modules/path";
import { isProduction } from "./modules/envChecker";
import { ARTICLE_STATUS_DRAFT } from "@/constants";

const readFile = promisify(fs.readFile);

/**
 * Modules
 */

const getArticleJson = async (slug: string) => {
  // get path to json file
  const jsonPath = getJsonPath(slug);

  // read from json file
  const data = await readFile(jsonPath, "utf8");
  const jsonData = JSON.parse(data);

  return jsonData;
};

const embedImageUrls = (
  body: string,
  images: string[],
  slug: string
): string => {
  const bodyWithImages = body.replace(
    /<img src="([^"]+)" alt="([^"]+)">/g,
    (match: string, src: string, alt: string) => {
      const image = images.find((image: string) => {
        return image === src;
      });
      if (image) {
        return `<img src="/articles/${slug}/img/${image}" alt="${alt}" />`;
      }
      return match;
    }
  );

  return bodyWithImages;
};

/**
 * Main
 */

export default async function handler(req: any, res: any) {
  const { slug } = req.query;

  try {
    const articleJson = await getArticleJson(slug);

    const bodyWithImages = embedImageUrls(
      articleJson.body,
      articleJson.images,
      slug
    );

    if (isProduction() && articleJson.status === ARTICLE_STATUS_DRAFT) {
      throw Error;
    }

    const article: Article = {
      status: articleJson.status,
      slug: slug,
      title: articleJson.title,
      date: articleJson.date,
      body: bodyWithImages,
      tags: articleJson.tags,
    };

    return res.status(200).json({ article });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
