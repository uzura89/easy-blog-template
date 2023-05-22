"use client";

import { useRouter } from "next/router";
import Button from "../commons/buttons/Button";
import { callDeleteArticle } from "@/ajax/ArticleAjax";
import { PATH_HOME } from "@/constants/path";

export default function Page(props: {
  isAdmin: boolean | undefined;
  slug: string | undefined;
}) {
  const router = useRouter();

  if (!props.isAdmin) return null;

  const onClickEdit = () => {
    router.push(`/editor/${props.slug}`);
  };

  const onClickDelete = async () => {
    if (!props.slug) return;
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirm) return;
      await callDeleteArticle(props.slug);
      router.push(PATH_HOME);
    } catch (err) {
      window.alert("Failed to delete article.");
    }
  };

  return (
    <div className="flex mb-3 justify-end gap-3 -mt-3 text-sm font-bold text-third">
      <Button onClick={onClickEdit} colorSecondary>
        Edit
      </Button>
      <Button onClick={onClickDelete} colorDanger>
        Delete
      </Button>
    </div>
  );
}
