import { ARTICLE_STATUS_DRAFT } from "@/constants";

export const INITIAL_ARTICLE = {
  status: ARTICLE_STATUS_DRAFT,
  slug: "",
  title: "",
  date: "",
  body: "",
  tags: [],
  images: [],
};

export interface Article {
  slug?: string;
  status: string;
  title: string;
  date: string;
  body: string;
  tags: string[];
  images?: string[];
}

export interface ArticleHeader {
  slug: string;
  status: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
}
