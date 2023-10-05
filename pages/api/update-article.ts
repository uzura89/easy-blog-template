import { deleteArticleDirectory } from "./delete-article";

import { isProduction } from "./modules/envChecker";
import {
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

    await deleteArticleDirectory(slug);

    const article = await processArticleAndSaveImages(
      status,
      title,
      date,
      body,
      tags,
      slug
    );

    await saveArticleJson(slug, article);

    return res.status(200).json({ slug });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
