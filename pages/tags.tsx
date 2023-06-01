import { callFetchAllArticles } from "@/ajax/ArticleAjax";
import { ArticleHeader } from "@/types/Article";
import { GetStaticProps } from "next";

import BlogArticles from "../components/articles/BlogArticles";

interface Props {
  articles: ArticleHeader[];
}

export default function Tags(props: Props) {
  return <BlogArticles articles={props.articles} sortedByTags={true} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { articles } = await callFetchAllArticles();

    return {
      props: {
        articles,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        articles: [],
      },
    };
  }
};
