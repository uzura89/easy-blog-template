import React, { Fragment, useEffect, useState } from "react";

import { ArticleHeader } from "@/types/Article";
import MotionSlide from "../commons/motion/MotionSlide";
import BlogArticleItemText from "./BlogArticleItemText";
import makeArticlesByTags from "./modules/makeArticleByTags";

interface Props {
  articles: ArticleHeader[];
}

export default function BlogArticlesTextTags(props: Props): React.ReactElement {
  const [articlesByTags, setArticlesByTags] = useState<
    { tag: string; articles: ArticleHeader[] }[]
  >([]);

  useEffect(() => {
    const _articlesByTags = makeArticlesByTags(props.articles);
    setArticlesByTags(_articlesByTags);
  }, [props.articles]);

  let prevTag = "";

  return (
    <div className="flex flex-col gap-4">
      {articlesByTags.map((articleByTag) => {
        return (
          <div key={articleByTag.tag}>
            <MotionSlide right>
              <div className="flex items-center mb-4">
                <div className="text-third mr-1 font-bold text-sm sm:text-md">
                  #
                </div>
                <h2 className="font-bold text-md sm:text-xl">
                  {articleByTag.tag}
                </h2>
              </div>
              {articleByTag.articles.map((article) => {
                return (
                  <BlogArticleItemText
                    key={article.slug}
                    article={article}
                    withYear
                  />
                );
              })}
            </MotionSlide>
          </div>
        );
      })}
    </div>
  );
}
