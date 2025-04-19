"use client";

import { type Editor } from "@tiptap/react";
import { Bold, Heading2, Italic, List } from "lucide-react";
import { Toggle } from "@components/ui/toggle";

export interface IToolbarProps {
  editor: Editor | null;
}

export function Toolbar({ editor }: IToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full space-x-1 rounded-lg border border-gray-600 bg-black p-1">
      <Toggle
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className="cursor-pointer"
      >
        <Heading2 size={20} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        className="cursor-pointer"
      >
        <Bold size={20} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        className="cursor-pointer"
      >
        <Italic size={20} />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bulletlist")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        className="cursor-pointer"
      >
        <List size={20} />
      </Toggle>
    </div>
  );
}
