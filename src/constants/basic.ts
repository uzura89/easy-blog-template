import BlogConfig from "../../blog.config";

const prod = process.env.NODE_ENV === "production";

export const APP_URL = prod ? BlogConfig.url : "http://localhost:3000";
export const BLOG_NAME = BlogConfig.title;
export const BLOG_SUBTITLE = BlogConfig.subtitle;
export const BLOG_DESCRIPTION = BlogConfig.description;

/**
 * Article Status
 */

export const ARTICLE_STATUS_DRAFT = "draft";
export const ARTICLE_STATUS_PUBLISHED = "published";
