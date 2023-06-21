import { formatDate } from "@/modules/DateHandler";
import { ArticleHeader } from "@/types/Article";
import Link from "next/link";
import MotionSlide from "../commons/motion/MotionSlide";
import Image from "next/image";
import { ARTICLE_STATUS_DRAFT } from "@/constants";

export default function BlogArticleItemImage(props: {
  article: ArticleHeader;
}) {
  const article = props.article;
  const isDraft = article.status === ARTICLE_STATUS_DRAFT;

  return (
    <div className="hover:opacity-90 w-full" key={article.slug}>
      <Link href={article.slug}>
        <MotionSlide right>
          <div
            className={`h-48 sm:h-36 lg:h-40 w-full relative rounded-2xl overflow-hidden ${
              isDraft && "opacity-60"
            }`}
          >
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
          <h2
            className={`font-bold text-lg leading-tight mt-2 ${
              isDraft && "text-gray-500"
            }`}
          >
            {article.title} {isDraft && "(Draft)"}
          </h2>
          <p className="text-sm text-third mt-1">
            {formatDate(article.date, true)}
          </p>
        </MotionSlide>
      </Link>
    </div>
  );
}
