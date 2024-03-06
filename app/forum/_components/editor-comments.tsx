'use client';
import {useState} from 'react';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube'
import Blockquote from '@tiptap/extension-blockquote';
import {ToolBarEditor} from './toolbar-editor';
import '@/styles/editor.css';
import {CreateThread} from '@/actions/thread';
interface EditorProps {
  onChange: (value: string) => void;
  body: string;
}
export const EditorComments = ({onChange, body}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading,
      BulletList,
      Blockquote,
      Youtube.configure({
        controls: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
    ],
    content:'',
    onUpdate({editor}) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="p-5 border">
        <ToolBarEditor editor={editor} />
        <EditorContent editor={editor} className="editor-input-comment" placeholder='Comentario' />
      </div>
    </div>
  );
};
