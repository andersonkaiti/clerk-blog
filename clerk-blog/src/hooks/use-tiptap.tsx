"use client";

import { useState } from "react";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ITipTapProps } from "@components/tiptap/tiptap";

export function useTipTap({ className, defaultValue = "" }: ITipTapProps) {
  const [text, setText] = useState<string>(String(defaultValue));

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-disc ml-5",
        },
      }),
    ],
    content: text,
    editorProps: {
      attributes: {
        class: className || "",
      },
    },
    onUpdate: ({ editor }) => {
      setText(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return {
    editor,
    text,
  };
}
