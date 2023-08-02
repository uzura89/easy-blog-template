import { callFetchAllArticles } from "@/ajax/ArticleAjax";
import { ArticleHeader } from "@/types/Article";
import { GetStaticProps } from "next";

import BlogArticles from "../components/articles/BlogArticles";
import { Fragment } from "react";
import { BLOG_NAME, BLOG_SUBTITLE } from "@/constants";
import HeadSetter from "../components/commons/head/HeadSetter";

interface Props {
  articles: ArticleHeader[];
}

export default function Home(props: Props) {
  return (
    <Fragment>
      <HeadSetter
        pageTitle={BLOG_NAME}
        pageDescription={BLOG_SUBTITLE}
        pagePath="/"
      />
      <BlogArticles articles={props.articles} sortedByTags={false} />
    </Fragment>
  );
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
