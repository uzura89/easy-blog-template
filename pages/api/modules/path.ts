import path from "path";

function serverPath(relativePath: string) {
  const directory = path.join(process.cwd(), "public", relativePath);
  return directory;
}

/**
 * Exports
 */

export const getPublicPath = () => serverPath("./");
export const getArticlesPath = () => serverPath("./articles");
export const getArticlePath = (slug: string) =>
  serverPath(`./articles/${slug}`);
export const getJsonPath = (slug: string) =>
  serverPath(`./articles/${slug}/article.json`);
