import { APP_URL } from "@/constants";
import { Article, ArticleHeader, INITIAL_ARTICLE } from "@/types/Article";
import axios from "axios";

export async function callCreateArticle(
  status: string,
  title: string,
  body: string,
  date: string,
  tags: string,
  slug: string
): Promise<{ slug: string }> {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/create-article`,
      data: {
        status,
        title,
        body,
        date,
        tags,
        slug,
      },
    });

    return response.data;
  } catch (err) {
    return { slug: "" };
  }
}

export async function callUpdateArticle(
  status: string,
  title: string,
  body: string,
  date: string,
  tags: string,
  slug: string
): Promise<{ slug: string }> {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/update-article`,
      data: {
        status,
        title,
        body,
        date,
        tags,
        slug,
      },
    });

    return response.data;
  } catch (err) {
    return { slug: "" };
  }
}

export async function callFetchAllArticles(): Promise<{
  articles: ArticleHeader[];
}> {
  try {
    const response = await axios.get(`${APP_URL}/api/fetch-all-articles`);

    const articles = response.data.articles;
    return { articles };
  } catch (err) {
    return { articles: [] };
  }
}

export async function callFetchArticle(
  slug: string
): Promise<{ article: Article }> {
  try {
    const response = await axios.get(
      `${APP_URL}/api/fetch-article?slug=${slug}`
    );
    const article = response.data.article;
    return { article };
  } catch (err) {
    return { article: INITIAL_ARTICLE };
  }
}

export async function callDeleteArticle(slug: string) {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/delete-article`,
      data: {
        slug,
      },
    });

    return;
  } catch (err) {
    return false;
  }
}
