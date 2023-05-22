import path from "path";
import { promisify } from "util";
import fs from "fs";

import { isProduction } from "./modules/envChecker";

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

const deleteFolder = async (folderPath: string) => {
  try {
    await promisify(fs.access)(folderPath);

    const files = await readdir(folderPath);
    for (const file of files) {
      const curPath = `${folderPath}/${file}`;
      const stats = await lstat(curPath);
      if (stats.isDirectory()) {
        // Recursive call for subdirectories
        await deleteFolder(curPath);
      } else {
        // Delete file
        await unlink(curPath);
      }
    }
    // Delete empty directory
    await rmdir(folderPath);
    console.log(`Folder "${folderPath}" deleted successfully.`);
    return;
  } catch (error) {
    console.error(`Error deleting folder "${folderPath}":`, error);
    return;
  }
};

export const deleteArticleDirectory = async (slug: string) => {
  try {
    const directoryPath = path.join("./public/articles", slug);
    await deleteFolder(directoryPath);
    return;
  } catch (err) {
    console.log(err);
    return;
  }
};

/**
 * Main
 */

export default async function handler(req: any, res: any) {
  if (isProduction()) throw Error;
  const { slug } = req.body;

  try {
    if (!slug) throw Error;

    await deleteArticleDirectory(slug);

    // delete the directory

    return res.status(200).json({ slug });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}
