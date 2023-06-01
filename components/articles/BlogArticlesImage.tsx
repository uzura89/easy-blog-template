import React from "react";
import { Lora } from "next/font/google";

import { ArticleHeader } from "@/types/Article";
import BlogArticleItemImage from "./BlogArticleItemImage";

interface Props {
  articles: ArticleHeader[];
}

/**
 * Main
 */

export default function BlogArticlesImage(props: Props): React.ReactElement {
  return (
    <div className="grid relative gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {props.articles.map((article) => {
        return <BlogArticleItemImage key={article.slug} article={article} />;
      })}
    </div>
  );
}
