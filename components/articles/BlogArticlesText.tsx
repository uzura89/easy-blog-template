import React, { Fragment } from "react";
import Link from "next/link";

import { formatDate } from "@/modules/DateHandler";
import { ArticleHeader } from "@/types/Article";
import MotionSlide from "../commons/motion/MotionSlide";

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
              <div className="flex  items-start mr-5 mb-3 sm:mb-4">
                <div className="text-sm sm:text-sm text-gray-950 opacity-90 flex-shrink-0 w-16">
                  {formatDate(article.date).slice(5)}
                </div>
                <div className="text-link hover:underline text-base -translate-y-[3.25px] sm:-translate-y-0.5">
                  <Link href={article.slug}>{article.title}</Link>
                </div>
              </div>
            </MotionSlide>
          </div>
        );
      })}
    </Fragment>
  );
}
