'use client';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Blockquote from '@tiptap/extension-blockquote';
import Youtube from '@tiptap/extension-youtube'
import Paragraph from '@tiptap/extension-paragraph'
import {ToolBarEditor} from './toolbar-editor';
import '@/styles/editor.css';

interface EditorProps {
  onChange: (value:string) => void;
  body: string;
}
export const Editor = ({onChange, body}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading,
      BulletList,
      Blockquote,
      Paragraph,
      Youtube,
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
    content: body ? body : "",
    onUpdate({editor}){
      onChange(editor.getHTML())
    }
  });

  if (!editor) {
    return null;
  }


  return (
    <div>
      <div className="p-5">
        <ToolBarEditor editor={editor} />
        <EditorContent editor={editor} className='editor-input-comment' />
      </div>
    </div>
  );
};
