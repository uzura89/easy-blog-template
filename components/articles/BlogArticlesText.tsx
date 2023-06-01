import React, { Fragment } from "react";

import { ArticleHeader } from "@/types/Article";
import MotionSlide from "../commons/motion/MotionSlide";
import BlogArticleItemText from "./BlogArticleItemText";

interface Props {
  articles: ArticleHeader[];
}

export default function BlogArticlesText(props: Props): React.ReactElement {
  let prevYear = "";

  return (
    <Fragment>
      {props.articles.map((article) => {
        const thisYear = article.date.split("-")[0];
        const newYear = prevYear !== thisYear;
        prevYear = thisYear;

        return (
          <div key={article.slug}>
            <MotionSlide right>
              {newYear && (
                <div className={`text-md sm:text-xl font-bold mb-3 sm:mb-5`}>
                  {thisYear}
                </div>
              )}
              <BlogArticleItemText article={article} />
            </MotionSlide>
          </div>
        );
      })}
    </Fragment>
  );
}
