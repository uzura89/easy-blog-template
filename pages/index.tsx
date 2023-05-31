import { callFetchAllArticles } from "@/ajax/ArticleAjax";
import { ArticleHeader } from "@/types/Article";
import { GetStaticProps } from "next";
import { useState, useEffect, useContext } from "react";
import PageShell from "../components/page-shell/PageShell";
import Container from "../components/commons/layouts/Container";
import Button from "../components/commons/buttons/Button";
import { PATH_EDITOR } from "@/constants/path";
import { useRouter } from "next/router";
import { AdminContext } from "../components/context/ContextProvider";
import BlogConfig, { BLOG_THEME_IMAGE, BLOG_THEME_TEXT } from "../blog.config";

import BlogArticlesText from "../components/articles/BlogArticlesText";
import BlogArticlesImage from "../components/articles/BlogArticlesImage";

interface Props {
  articles: ArticleHeader[];
}

export default function Home(props: Props) {
  const router = useRouter();
  const { isAdmin } = useContext(AdminContext);

  const [articles, setArticles] = useState<ArticleHeader[]>(props.articles);

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

  /**
   * Render
   */

  const renderBlogArticles = (theme: string) => {
    if (theme === BLOG_THEME_TEXT) {
      return <BlogArticlesText articles={articles} />;
    } else {
      return <BlogArticlesImage articles={articles} />;
    }
  };

  return (
    <PageShell>
      <Container wide={BlogConfig.theme === BLOG_THEME_IMAGE}>
        {isAdmin && (
          <div className="flex mb-8 justify-end gap-3 -mt-3 text-sm font-bold text-third">
            <Button onClick={onClickNewPost}>+ New Post</Button>
          </div>
        )}

        {renderBlogArticles(BlogConfig.theme)}
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
