import BlogConfig from "../../blog.config";

const prod = process.env.NODE_ENV === "production";

export const APP_URL = prod ? BlogConfig.url : "http://localhost:3000";
export const BLOG_NAME = BlogConfig.title;
export const BLOG_SUBTITLE = BlogConfig.subtitle;
