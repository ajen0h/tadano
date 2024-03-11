'use client';
import {Toggle} from '@/components/ui/toggle';
import {VideoIcon, VideoOffIcon} from 'lucide-react';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaHeading,
  FaItalic,
  FaLink,
  FaListUl,
  FaQuoteLeft,
  FaRegImage,
  FaStrikethrough,
  FaVideo,
} from 'react-icons/fa';
import {MdFormatListNumbered} from 'react-icons/md';
export const ToolBarEditor = ({editor}: any) => {
  
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

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
    <div className="border border-solid rounded-xl grid grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 mb-6">
      <Toggle
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <FaBold />
      </Toggle>

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive('italic')}>
        <FaItalic />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        pressed={editor.isActive('strike')}>
        <FaStrikethrough />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({level: 1}).run()
        }
        pressed={editor.isActive('heading', {level: 1})}>
        <FaHeading />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}>
        <FaListUl />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}>
        <MdFormatListNumbered className="w-5 h-5" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive('blockquote')}>
        <FaQuoteLeft />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('left').run()
        }
        pressed={editor.isActive({textAlign: 'left'})}>
        <FaAlignLeft />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('center').run()
        }
        pressed={editor.isActive({textAlign: 'center'})}>
        <FaAlignCenter />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('right').run()
        }
        pressed={editor.isActive({textAlign: 'right'})}>
        <FaAlignRight />
      </Toggle>
      <Toggle
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('justify').run()
        }
        pressed={editor.isActive({textAlign: 'justify'})}>
        <FaAlignJustify />
      </Toggle>
      <Toggle onPressedChange={setLink} pressed={editor.isActive('link')}>
        <FaLink />
      </Toggle>
      <Toggle onPressedChange={addImage}>
        <FaRegImage />
      </Toggle>
      <Toggle onPressedChange={addYoutubeVideo}>
        <FaVideo />
      </Toggle>
    </div>
  );
};
