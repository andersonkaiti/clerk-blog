"use client";

import { HTMLAttributes } from "react";
import { EditorContent } from "@tiptap/react";
import { useTipTap } from "@hooks/use-tiptap.hook";
import { Toolbar } from "./toolbar";

export type ITipTapProps = HTMLAttributes<HTMLDivElement>;

export function TipTapInput({ className, defaultValue }: ITipTapProps) {
  const { editor, text } = useTipTap({ className, defaultValue });

  return (
    <div className="space-y-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} defaultValue={text} />
      <input type="hidden" name="text" value={text} />
    </div>
  );
}
