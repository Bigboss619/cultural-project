// components/RichTextEditor.jsx
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
} from 'lucide-react';

const RichTextEditor = ({ content, onUpdate, placeholder = "Start typing...", height = "300px" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 min-h-[200px]',
      },
    },
  });

  if (!editor) return <div className="animate-pulse h-32 bg-gray-200 dark:bg-slate-700 rounded-lg" />;

  const addBold = () => editor.chain().focus().toggleBold().run();
  const addItalic = () => editor.chain().focus().toggleItalic().run();
  const addUnderline = () => editor.chain().focus().toggleUnderline().run();
  const setTextAlignLeft = () => editor.chain().focus().setTextAlign('left').run();
  const setTextAlignCenter = () => editor.chain().focus().setTextAlign('center').run();
  const setTextAlignRight = () => editor.chain().focus().setTextAlign('right').run();
  const setBulletList = () => editor.chain().focus().toggleBulletList().run();
  const setOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const setHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run();
  const setHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run();
  const setBlockquote = () => editor.chain().focus().toggleBlockquote().run();

  const isActive = (command) => editor.isActive(command);
  const isTextAlignActive = (align) => editor.isActive({ textAlign: align });

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 bg-gray-50 dark:bg-slate-800 p-2 rounded-lg border border-gray-200 dark:border-slate-700">
        <button
          onClick={setHeading1}
          className={`p-2 rounded-md transition-all ${
            isActive('heading', { level: 1 })
              ? 'bg-blue-500 text-white shadow-md'
              : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={setHeading2}
          className={`p-2 rounded-md transition-all ${
            isActive('heading', { level: 2 })
              ? 'bg-blue-500 text-white shadow-md'
              : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={addBold}
          className={`p-2 rounded-md transition-all ${
            isActive('bold') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={addItalic}
          className={`p-2 rounded-md transition-all ${
            isActive('italic') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={addUnderline}
          className={`p-2 rounded-md transition-all ${
            isActive('underline') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          onClick={setBulletList}
          className={`p-2 rounded-md transition-all ${
            isActive('bulletList') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={setOrderedList}
          className={`p-2 rounded-md transition-all ${
            isActive('orderedList') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-1" />
        <button
          onClick={setTextAlignLeft}
          className={`p-2 rounded-md transition-all ${
            isTextAlignActive('left') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={setTextAlignCenter}
          className={`p-2 rounded-md transition-all ${
            isTextAlignActive('center') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={setTextAlignRight}
          className={`p-2 rounded-md transition-all ${
            isTextAlignActive('right') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          onClick={setBlockquote}
          className={`p-2 rounded-md transition-all ${
            isActive('blockquote') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>
      </div>

      {/* Editor Content */}
      <div 
        className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors"
        style={{ minHeight: height }}
      >
        <EditorContent 
          editor={editor} 
          className="min-h-full"
        />
        {!editor.getText().trim() && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4 text-gray-400 dark:text-gray-500">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;