import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Constants
 */

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

/**
 * Main component
 */

export const QuillEditor: React.FC<Props> = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  /**
   * Render
   */

  try {
    return (
      <ReactQuill
        theme="snow"
        value={props.value}
        onChange={props.onChange}
        modules={quillModules}
      />
    );
  } catch (error) {
    return null;
  }
};
