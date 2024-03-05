'use client';
import {useState} from 'react';
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Blockquote from '@tiptap/extension-blockquote';
import {ToolBarEditor} from './toolbar-editor';
import '../styles.css';
import {CreateThread} from '@/actions/thread';
interface EditorProps {
  onChange: (value:string) => void;
  body: string;
}
export const EditorComments = ({onChange, body}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading,
      BulletList,
      Blockquote,
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
    content: '<h1><b>Hello World! 🌎️</b></h1>',
    onUpdate({editor}){
      onChange(editor.getHTML())
    }
  });

  if (!editor) {
    return null;
  }


  return (
    <div>
      <div className="p-5 border">
        <ToolBarEditor editor={editor} />
        <EditorContent editor={editor} className='editor-input-comment' />
      </div>

      {/* <article className="grid lg:grid-cols-[1fr_auto]">
        <div
          dangerouslySetInnerHTML={{__html: editor.getHTML()}}
          className="editor"
        />
      </article> */}
    </div>
  );
};
