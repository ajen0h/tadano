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
export const Editor = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
  });

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  if (!editor) {
    return null;
  }

  const savePost = async () => {
    const body = editor.getHTML();
    await CreateThread({title, body,description});
  };
  return (
    <div>
      <Input
        name="title"
        placeholder="Thread Title"
        onChange={handleChangeTitle}
      />
      <Input
        name="description"
        placeholder="Description"
        onChange={handleChangeDescription}
      />
      <div className="bg-slate-600 p-5">
        <ToolBarEditor editor={editor} />
        <EditorContent editor={editor} className="editor" />
        <Button onClick={savePost}>Save Post</Button>
      </div>

      <article className="grid lg:grid-cols-[1fr_auto]">
        <div
          dangerouslySetInnerHTML={{__html: editor.getHTML()}}
          className="editor"
        />
      </article>
    </div>
  );
};
