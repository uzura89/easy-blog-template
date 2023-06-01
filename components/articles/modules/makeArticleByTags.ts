import { ArticleHeader } from "@/types/Article";

function getUniqueTags(articles: ArticleHeader[]) {
  const tags: string[] = [];
  articles.forEach((article) => {
    const _tags = article.tags;
    _tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  const sortedTags = tags.sort((a, b) => {
    return a.localeCompare(b);
  });

  return sortedTags;
}

export default function makeArticlesByTags(articles: ArticleHeader[]) {
  const uniqueTags = getUniqueTags(articles);

  const articlesByTags = uniqueTags.map((tag) => {
    const _articles = articles.filter((article) => {
      return article.tags.includes(tag);
    });

    return { tag, articles: _articles };
  });

  return articlesByTags;
}
