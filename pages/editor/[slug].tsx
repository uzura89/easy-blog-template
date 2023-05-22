"use client";

import { useRouter } from "next/router";
import EditorPage from "../../components/editor/EditorPage";
import PageShell from "../../components/page-shell/PageShell";

export default function EditorUpdate() {
  const router = useRouter();

  if (!router.query.slug || typeof router.query.slug !== "string") return null;

  return (
    <PageShell>
      <EditorPage slug={router.query.slug} />
    </PageShell>
  );
}
