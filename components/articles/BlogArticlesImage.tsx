import React from "react";
import Link from "next/link";
import { Lora } from "next/font/google";
import Image from "next/image";

import { ArticleHeader } from "@/types/Article";
import MotionSlide from "../commons/motion/MotionSlide";
import { formatDate } from "@/modules/DateHandler";

const lora = Lora({ subsets: ["latin"] });

interface Props {
  articles: ArticleHeader[];
}

export default function BlogArticlesImage(props: Props): React.ReactElement {
  return (
    <div className="grid relative gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {props.articles.map((article) => {
        return (
          <div className="hover:opacity-90 w-full" key={article.slug}>
            <Link href={article.slug}>
              <MotionSlide right>
                <div className="h-48 sm:h-36 lg:h-40 w-full relative rounded-2xl overflow-hidden">
                  <Image
                    src={
                      article.image
                        ? `/articles/${article.slug}/img/${article.image}`
                        : "/img/default-post.jpg"
                    }
                    alt={article.title}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
                <h2 className={`font-bold text-lg leading-tight mt-2`}>
                  {article.title}
                </h2>
                <p className="text-sm text-third mt-1">
                  {formatDate(article.date, true)}
                </p>
              </MotionSlide>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
