import { motion } from "framer-motion";
import Link from "next/link";

import { formatDate } from "@/modules/DateHandler";
import { callFetchAllArticles } from "@/ajax/ArticleAjax";
import MotionSlide from "../components/commons/motion/MotionSlide";
import { ArticleHeader, INITIAL_ARTICLE } from "@/types/Article";
import { GetStaticProps } from "next";
import { useState, useEffect, useContext } from "react";
import PageShell from "../components/page-shell/PageShell";
import Container from "../components/commons/layouts/Container";
import Button from "../components/commons/buttons/Button";
import { PATH_EDITOR } from "@/constants/path";
import { useRouter } from "next/router";
import { AdminContext } from "../components/context/ContextProvider";

interface Props {
  articles: ArticleHeader[];
}

export default function Home(props: Props) {
  const router = useRouter();
  const { isAdmin } = useContext(AdminContext);

  const [articles, setArticles] = useState<ArticleHeader[]>(props.articles);

  let prevYear = "";

  const getArticles = async () => {
    const { articles } = await callFetchAllArticles();
    setArticles(articles);
  };

  const onClickNewPost = () => {
    router.push(PATH_EDITOR);
  };

  useEffect(() => {
    getArticles();
  }, [props.articles]);

  return (
    <PageShell>
      <Container>
        {isAdmin && (
          <div className="flex mb-3 justify-end gap-3 -mt-3 text-sm font-bold text-third">
            <Button onClick={onClickNewPost}>+ New Post</Button>
          </div>
        )}

        {articles.map((article) => {
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
                  <div className="text-sm sm:text-sm text-gray-950 opacity-90 flex-shrink-0 w-14 sm:w-16">
                    {formatDate(article.date).slice(5)}
                  </div>
                  <div className="text-link hover:underline text-md sm:text-base -translate-y-[3.25px] sm:-translate-y-0.5">
                    <Link href={article.slug}>{article.title}</Link>
                  </div>
                </div>
              </MotionSlide>
            </div>
          );
        })}
      </Container>
    </PageShell>
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
