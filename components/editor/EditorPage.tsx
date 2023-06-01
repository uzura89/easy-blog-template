"use client";

import { useEffect, useState } from "react";
import { convertDateToSlug } from "@/modules/DateHandler";

import { callCreateArticle, callFetchArticle } from "@/ajax/ArticleAjax";
import { useRouter } from "next/navigation";

import { QuillEditor } from "../../components/editor/QuillEditor";
import Container from "../../components/commons/layouts/Container";
import { replaceImagePathsToBase64 } from "@/modules/ImageHandler";

interface Props {
  slug: string | null;
}

export default function EditorPage(props: Props) {
  const router = useRouter();

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(convertDateToSlug(new Date()));

  const onChangeSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(event.target.value);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const onChangeEditor = (value: string) => {
    setValue(value);
  };

  const removeStringWithSpaces = (inputString: string) => {
    const regex = new RegExp(
      `<\\s*p\\s*>\\s*<\\s*br\\s*>\\s*<\\s*\\/\\s*p\\s*>`,
      "gi"
    );
    const result = inputString.replace(regex, "");
    return result;
  };

  const onSave = async () => {
    try {
      if (!slug.trim() || !title.trim() || !date) {
        window.alert("Please fill in slug, title, and date.");
        return;
      }

      const articleWithoutSpaces = removeStringWithSpaces(value);

      const slugNoSpace = slug.replace(/\s+/g, "-").toLowerCase();

      const data = await callCreateArticle(
        title,
        articleWithoutSpaces,
        date,
        tags,
        slugNoSpace
      );
      router.push(`/${data.slug}`);
    } catch (err) {
      window.alert("Failed to save article.");
    }
  };

  const setPostData = async (slug: string) => {
    try {
      const { article } = await callFetchArticle(slug);
      const date = new Date(article.date);

      // process article
      const articleWithBase64 = await replaceImagePathsToBase64(article.body);

      setSlug(article.slug || "");
      setTitle(article.title);
      setValue(articleWithBase64);
      setTags(article.tags.join(","));
      setDate(convertDateToSlug(date));
    } catch (err) {}
  };

  useEffect(() => {
    if (props.slug) {
      setPostData(props.slug);
    }
  }, [props.slug]);

  return (
    <Container>
      <div className="mb-8">
        <input
          className="px-4 py-2 w-full border border-border rounded-sm"
          value={slug}
          onChange={onChangeSlug}
          placeholder="slug-of-post"
        />
      </div>

      <div className="mb-8">
        <input
          className="px-4 py-2 w-full border border-border rounded-sm"
          value={title}
          onChange={onChangeTitle}
          placeholder="Title"
        />
      </div>

      <div className="mb-8">
        <input
          className="px-4 py-2 w-full border border-border rounded-sm"
          value={tags}
          onChange={onChangeTags}
          placeholder="tag, tag, tag"
        />
      </div>

      <div className="mb-8">
        <input
          type="date"
          className="px-4 py-2 w-full border border-border rounded-sm"
          value={date}
          onChange={onChangeDate}
          placeholder="date"
        />
      </div>
      <QuillEditor value={value} onChange={onChangeEditor} />
      <div className="mt-5">
        <button
          className="bg-black text-white py-2 px-5 rounded-sm text-sm"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </Container>
  );
}
