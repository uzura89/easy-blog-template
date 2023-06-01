import React, { Fragment, useEffect, useState } from "react";

import { ArticleHeader } from "@/types/Article";
import BlogArticleItemImage from "./BlogArticleItemImage";
import makeArticlesByTags from "./modules/makeArticleByTags";

interface Props {
  articles: ArticleHeader[];
}

/**
 * Main
 */

export default function BlogArticlesImageTags(
  props: Props
): React.ReactElement {
  const [articlesByTags, setArticlesByTags] = useState<
    { tag: string; articles: ArticleHeader[] }[]
  >([]);

  useEffect(() => {
    const _articlesByTags = makeArticlesByTags(props.articles);
    setArticlesByTags(_articlesByTags);
  }, [props.articles]);

  return (
    <div className="flex flex-col gap-9">
      {articlesByTags.map((articleByTag) => {
        return (
          <div key={articleByTag.tag}>
            <div className="flex items-center mb-7 mr-5">
              <div className="text-third mr-1 font-bold text-lg">#</div>
              <h2 className="font-bold text-xl">{articleByTag.tag}</h2>
            </div>
            <div className="grid relative gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {articleByTag.articles.map((article) => {
                return (
                  <BlogArticleItemImage key={article.slug} article={article} />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
