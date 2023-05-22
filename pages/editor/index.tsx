"use client";

import EditorPage from "../../components/editor/EditorPage";
import PageShell from "../../components/page-shell/PageShell";

export default function EditorNew() {
  return (
    <PageShell>
      <EditorPage slug={null} />
    </PageShell>
  );
}
