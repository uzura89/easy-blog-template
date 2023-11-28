export const stripHtmlTags = (htmlDoc: string) => {
  return htmlDoc.replace(/<[^>]+>/g, "");
};
