"use client";

import { callFetchAllArticles, callFetchArticle } from "@/ajax/ArticleAjax";
import { formatDate } from "@/modules/DateHandler";

import { useContext } from "react";
import { Article, INITIAL_ARTICLE } from "@/types/Article";

import { GetStaticPaths, GetStaticProps } from "next";
import ArticleStyles from "../components/post-page/ArticleStyles";
import AdminConsoleOfPost from "../components/post-page/AdminConsoleOfPost";
import MotionSlide from "../components/commons/motion/MotionSlide";
import { AdminContext } from "../components/context/ContextProvider";
import PageShell from "../components/page-shell/PageShell";
import Container from "../components/commons/layouts/Container";

interface Props {
  article: Article;
}

export default function Page(props: Props) {
  const { isAdmin } = useContext(AdminContext);

  if (!props.article) return null;

  return (
    <PageShell>
      <Container>
        <ArticleStyles />
        <div key={props.article.slug}>
          <MotionSlide left>
            <AdminConsoleOfPost isAdmin={isAdmin} slug={props.article.slug} />

            <div className="text-sm font-bold text-third mb-3 sm:mb-5">
              {formatDate(props.article.date)}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-7 sm:mb-10 leading-8 sm:leading-tight">
              {props.article.title}
            </h1>
            <div
              dangerouslySetInnerHTML={{ __html: props.article.body }}
              className="article"
            />
          </MotionSlide>
        </div>
      </Container>
    </PageShell>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { articles } = await callFetchAllArticles();
    const slugs = articles.map((article) => article.slug);

    const paths = slugs.map((slug: string) => {
      return {
        params: {
          slug,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    return {
      paths: [{ params: { slug: "" } }],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.slug !== "string") throw Error;

    const { article } = await callFetchArticle(params.slug);

    return {
      props: {
        article,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        article: INITIAL_ARTICLE,
      },
    };
  }
};
