import React, { useMemo } from "react";
import { TextareaExpandable } from "../commons/forms/TextareaExpandable";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Main component
 */

export const MarkdownEditor: React.FC<Props> = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  /**
   * Render
   */

  try {
    return (
      <TextareaExpandable
        value={props.value}
        onChange={props.onChange}
        className="w-full min-h-[200px]"
        placeholder="Write something... (Markdown)"
      />
    );
  } catch (error) {
    return null;
  }
};
