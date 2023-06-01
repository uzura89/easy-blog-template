import { callFetchAllArticles } from "@/ajax/ArticleAjax";
import { ArticleHeader } from "@/types/Article";
import { useState, useEffect, useContext } from "react";
import { PATH_EDITOR } from "@/constants/path";
import { useRouter } from "next/router";
import BlogConfig, {
  BLOG_THEME_TEXT,
  BLOG_THEME_IMAGE,
} from "../../blog.config";
import Button from "../commons/buttons/Button";
import { AdminContext } from "../context/ContextProvider";
import PageShell from "../page-shell/PageShell";
import BlogArticlesImage from "./BlogArticlesImage";
import BlogArticlesText from "./BlogArticlesText";
import Container from "../commons/layouts/Container";
import BlogArticlesImageTags from "./BlogArticlesImageTags";
import BlogArticlesTextTags from "./BlogArticlesTextTags";

interface Props {
  articles: ArticleHeader[];
  sortedByTags: boolean;
}

export default function BlogArticles(props: Props) {
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

  const renderBlogArticles = (theme: string, sortedByTags: boolean) => {
    if (theme === BLOG_THEME_TEXT) {
      return sortedByTags ? (
        <BlogArticlesTextTags articles={articles} />
      ) : (
        <BlogArticlesText articles={articles} />
      );
    } else {
      return sortedByTags ? (
        <BlogArticlesImageTags articles={articles} />
      ) : (
        <BlogArticlesImage articles={articles} />
      );
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

        {renderBlogArticles(BlogConfig.theme, props.sortedByTags)}
      </Container>
    </PageShell>
  );
}
