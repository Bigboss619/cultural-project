// components/RichTextEditor.jsx - FIXED VERSION
import React, { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold,
  Italic,
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
  const editorRef = useRef(null);
  const lastSyncedContentRef = useRef(null);
  const editor = useEditor({
    extensions: [
      StarterKit, // ✅ Already includes underline!
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
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 min-h-[200px] leading-relaxed',
      },
    },
  });
  editorRef.current = editor;

  useEffect(() => {
    if(!editor || !content) return;
      
    const editorHTML = editor.getHTML();
    if(editorHTML !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700">
        <div className="text-gray-400 dark:text-gray-500 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <div>Loading editor...</div>
        </div>
      </div>
    );
  }

  // Toolbar functions (underline works via StarterKit)
  const addBold = () => editor.chain().focus().toggleBold().run();
  const addItalic = () => editor.chain().focus().toggleItalic().run();
  const addUnderline = () => editor.chain().focus().toggleUnderline().run(); // ✅ Works without separate extension
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
      {/* Enhanced Toolbar */}
      <div className="flex flex-wrap items-center gap-1 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
        {/* Headings */}
        <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 rounded-lg">
          <button
            onClick={setHeading1}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('heading', { level: 1 })
                ? 'bg-blue-500 text-white shadow-md'
                : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Heading 1 (⌘+1)"
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={setHeading2}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('heading', { level: 2 })
                ? 'bg-blue-500 text-white shadow-md'
                : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Heading 2 (⌘+2)"
          >
            <Heading2 size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 rounded-lg">
          <button
            onClick={addBold}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('bold') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Bold (⌘+B)"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={addItalic}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('italic') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Italic (⌘+I)"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={addUnderline}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('underline') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Underline (⌘+U)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4v1.5h13.5v-1.5h-13.5zm0 10.188v4.312h13.5v-4.312h-3.375v1.125h-6.75v-1.125h-3.375zm0-2.813h13.5v1.687h-13.5v-1.687z"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 rounded-lg">
          <button
            onClick={setBulletList}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('bulletList') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={setOrderedList}
            className={`p-1.5 rounded transition-all text-xs ${
              isActive('orderedList') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-slate-600 mx-2" />

        {/* Alignment */}
        <div className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 rounded-lg">
          <button
            onClick={setTextAlignLeft}
            className={`p-1.5 rounded transition-all text-xs ${
              isTextAlignActive('left') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={setTextAlignCenter}
            className={`p-1.5 rounded transition-all text-xs ${
              isTextAlignActive('center') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={setTextAlignRight}
            className={`p-1.5 rounded transition-all text-xs ${
              isTextAlignActive('right') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
            }`}
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>

        <button
          onClick={setBlockquote}
          className={`ml-auto p-1.5 rounded transition-all text-xs ${
            isActive('blockquote') ? 'bg-blue-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
          }`}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
      </div>

      {/* Editor Content */}
      <div 
        className="relative border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-600"
        style={{ minHeight: height }}
      >
        <EditorContent editor={editor} className="min-h-full" />
        {editor.isEmpty && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-6 py-8 text-gray-400 dark:text-gray-500 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-slate-900/50">
            <div className="text-center">
              <div className="text-lg mb-1">{placeholder}</div>
              <div className="text-xs opacity-75">Use the toolbar above to format your text</div>
            </div>
          </div>
        )}
      </div>

      {/* Word count */}
      {!editor.isEmpty && (
        <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
          {editor.getText().trim().split(/\s+/).length} words
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;