import { ARTICLE_STATUS_DRAFT } from "@/constants";
import { formatDate } from "@/modules/DateHandler";
import { ArticleHeader } from "@/types/Article";
import Link from "next/link";

function YearSection(props: { withYear?: boolean; article: ArticleHeader }) {
  if (!props.withYear) {
    return (
      <div className="text-sm sm:text-sm text-gray-950 opacity-90 flex-shrink-0 w-16">
        {formatDate(props.article.date).slice(5)}
      </div>
    );
  }

  return (
    <div className="text-sm sm:text-sm text-gray-950 opacity-90 flex-shrink-0 w-24">
      {formatDate(props.article.date)}
    </div>
  );
}

export default function BlogArticleItemText(props: {
  article: ArticleHeader;
  withYear?: boolean;
}) {
  return (
    <div className="flex  items-start mr-5 mb-3 sm:mb-4">
      <YearSection withYear={props.withYear} article={props.article} />

      <div
        className={`text-link hover:underline text-base -translate-y-[3.25px] sm:-translate-y-0.5 ${
          props.article.status === ARTICLE_STATUS_DRAFT && "!text-gray-500"
        }`}
      >
        <Link href={props.article.slug}>
          {props.article.title}
          {props.article.status === ARTICLE_STATUS_DRAFT && " (Draft)"}
        </Link>
      </div>
    </div>
  );
}
