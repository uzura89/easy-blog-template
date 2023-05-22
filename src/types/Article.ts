export const INITIAL_ARTICLE = {
  slug: "",
  title: "",
  date: "",
  body: "",
  tags: [],
  images: [],
};

export interface Article {
  slug?: string;
  title: string;
  date: string;
  body: string;
  tags: string[];
  images?: string[];
}

export interface ArticleHeader {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
}
