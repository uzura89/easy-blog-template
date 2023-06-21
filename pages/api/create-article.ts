import jsdom from "jsdom";
import fs from "fs";
import path from "path";

import { Article } from "@/types/Article";
import { deleteArticleDirectory } from "./delete-article";
import { getArticlePath } from "./modules/path";
import { isProduction } from "./modules/envChecker";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};

/**
 * Modules
 */

function getOriginalFileName(filename: string, dataUrl: string) {
  const regex = /^data:image\/(\w+);base64,/; // Regular expression to match the data URL pattern
  const match = dataUrl.match(regex); // Match the regular expression against the data URL

  if (match && match.length === 2) {
    const fileType = match[1]; // Extract the file type (e.g., png, jpeg)
    return `${filename}.${fileType}`; // Return the file name with the original extension
  }

  return null; // Return null if the file name cannot be extracted
}

async function saveBase64Image(
  filename: string,
  slug: string,
  base64Data: string
) {
  // const directoryPath = path.join(__dirname, "public", "articles", slug, "img");
  const articlePath = getArticlePath(slug);
  const directoryPath = path.join(articlePath, "img");

  try {
    // const originalFilename = getOriginalFileName(filename, base64Data);
    // if (!originalFilename) throw Error;
    const filePath = path.join(directoryPath, filename);

    // Create the directory if it doesn't exist
    await fs.promises.mkdir(directoryPath, { recursive: true });

    // Write the base64 image to file
    const base64DataWithoutHeader = base64Data.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64DataWithoutHeader, "base64");

    await fs.promises.writeFile(filePath, buffer);
  } catch (err) {
    console.error("Error saving image:", err);
  }
}

async function saveImages(
  slug: string,
  imageDataStrings: string[],
  imageFilenames: string[]
) {
  if (imageDataStrings.length === 0) return [];

  const imageNames: string[] = [];
  let index = 1;

  for (const imageDataString of imageDataStrings) {
    const filename = imageFilenames[index - 1];

    await saveBase64Image(filename, slug, imageDataString);
    if (filename) {
      imageNames.push(filename);
    }
    index++;
  }

  return imageNames;
}

async function saveImagesAsFile(
  slug: string,
  htmlString: string
): Promise<{ imageNames: string[]; modifiedBody: string }> {
  try {
    const doc = new jsdom.JSDOM(htmlString).window.document;

    const imgElements = doc.querySelectorAll("img");
    const imageDataStrings: string[] = [];
    const imageFilenames: string[] = [];

    imgElements.forEach((imgElement, index) => {
      const src = imgElement.getAttribute("src");
      if (!src) return;
      if (src.startsWith("data:image")) {
        const filename = getOriginalFileName(
          `${(index + 1).toString()}-${Date.now()}`,
          src
        );
        imageFilenames.push(filename || "");
        imageDataStrings.push(src);
        imgElement.setAttribute("src", filename || "");
        imgElement.setAttribute("alt", filename || "");
      }
    });

    const imageNames = await saveImages(slug, imageDataStrings, imageFilenames);

    const modifiedHTMLString = doc.documentElement.innerHTML;
    return { modifiedBody: modifiedHTMLString, imageNames };
  } catch (err) {
    throw Error;
  }
}
const processArticleAndSaveImages = async (
  status: string,
  title: string,
  date: string,
  body: string,
  tags: string,
  slug: string
) => {
  try {
    const { imageNames, modifiedBody } = await saveImagesAsFile(slug, body);

    const articleData: Article = {
      status,
      title,
      body: modifiedBody,
      date,
      tags: tags.split(",").map((tag) => tag.trim()),
      images: imageNames,
    };

    return articleData;
  } catch (err) {
    throw Error;
  }

  // Write the JSON file
};

const saveArticleJson = async (slug: string, article: Article) => {
  const articlePath = getArticlePath(slug);
  const jsonPath = path.join(articlePath, "article.json");

  try {
    await fs.promises.access(articlePath);
  } catch (error) {
    try {
      await fs.promises.mkdir(articlePath, { recursive: true });
    } catch (err) {}
  }

  try {
    const jsonData = JSON.stringify(article, null, 2);
    await fs.promises.writeFile(jsonPath, jsonData);
  } catch (err) {}
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
