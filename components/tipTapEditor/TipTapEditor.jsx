import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

const TipTapEditor = ({ content }) => {
  //console.log(content, "TipTapEditor");
  let showContent = content;
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: showContent,
  });

  return <EditorContent editor={editor} />;
};

export default TipTapEditor;
