'use client';
import {useCurrentEditor} from '@tiptap/react';
import React, {useCallback} from 'react';
import {FaBold, FaHeading, FaItalic, FaStrikethrough} from 'react-icons/fa';
import {MdFormatListBulleted, MdFormatListNumbered} from 'react-icons/md';
export const ToolBarEditor = ({editor}: any) => {
  /* const {editor} = useCurrentEditor();
  if (!editor) {
    return null
  } */

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({href: url}).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({src: url}).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="flex gap-3">
      ToolBarEditor!
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}>
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
        className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}>
        <FaHeading />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}>
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}>
        <MdFormatListNumbered />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}>
        toggleBlockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({textAlign: 'left'}) ? 'is-active' : ''}>
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({textAlign: 'center'}) ? 'is-active' : ''}>
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({textAlign: 'right'}) ? 'is-active' : ''}>
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''}>
        justify
      </button>
      <button
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}>
        setLink
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}>
        unsetLink
      </button>
      <button onClick={addImage}>setImage</button>
    </div>
  );
};
