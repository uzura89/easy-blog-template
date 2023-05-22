import { APP_URL } from "@/constants";

/**
 *  Modules
 */

const extractImageSrc = (htmlContent: string) => {
  const regex = /<img[^>]+src="([^">]+)"/g;
  const matches = Array.from(htmlContent.matchAll(regex));

  const imageSrcStrings = [];

  for (const match of matches) {
    const srcString = match[1];
    imageSrcStrings.push(srcString);
  }

  return imageSrcStrings;
};

/**
 *  Main
 */

const replaceImagePathsToBase64 = async (body: string) => {
  const imagePaths = extractImageSrc(body);

  const promises = imagePaths.map(async (imagePath) => {
    const res = await fetch(`${APP_URL}${imagePath}`);
    const blob = await res.blob();
    const file = new File([blob], "image.png", { type: "image/png" });

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = () => {
        reject("Error");
      };
      reader.readAsDataURL(file);
    });

    return { imagePath, base64 };
  });

  const images = await Promise.all(promises);

  let newBody = body;
  images.forEach((image) => {
    if (typeof image.base64 === "string") {
      newBody = newBody.replace(image.imagePath, image.base64);
    }
  });

  return newBody;
};

/**
 * export
 */

export { replaceImagePathsToBase64 };
