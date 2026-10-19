'use client';

import { useEditor, useEditorState, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Image,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: { attributes: { class: 'rich-content adm-editor-content' } },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? '' : editor.getHTML()),
  });

  return (
    <div className="adm-editor">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      h2: editor.isActive('heading', { level: 2 }),
      h3: editor.isActive('heading', { level: 3 }),
      h4: editor.isActive('heading', { level: 4 }),
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      strike: editor.isActive('strike'),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      blockquote: editor.isActive('blockquote'),
      link: editor.isActive('link'),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const chain = () => editor.chain().focus();

  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL (leave empty to remove)', previous ?? 'https://');
    if (url === null) return;
    if (url.trim() === '') {
      chain().extendMarkRange('link').unsetLink().run();
      return;
    }
    chain().extendMarkRange('link').setLink({ href: url.trim() }).run();
  };

  const addImage = () => {
    const url = window.prompt('Image URL');
    if (url?.trim()) chain().setImage({ src: url.trim() }).run();
  };

  const btn = (label: string, active: boolean, onClick: () => void, title: string, disabled = false) => (
    <button
      type="button"
      className={`adm-tool ${active ? 'is-active' : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
    >
      {label}
    </button>
  );

  return (
    <div className="adm-toolbar" role="toolbar" aria-label="Formatting">
      {btn('P', !state.h2 && !state.h3 && !state.h4 && !state.bulletList && !state.orderedList && !state.blockquote, () => chain().setParagraph().run(), 'Paragraph')}
      {btn('H2', state.h2, () => chain().toggleHeading({ level: 2 }).run(), 'Heading')}
      {btn('H3', state.h3, () => chain().toggleHeading({ level: 3 }).run(), 'Subheading')}
      {btn('H4', state.h4, () => chain().toggleHeading({ level: 4 }).run(), 'Small heading')}
      <span className="adm-tool-sep" />
      {btn('B', state.bold, () => chain().toggleBold().run(), 'Bold')}
      {btn('I', state.italic, () => chain().toggleItalic().run(), 'Italic')}
      {btn('U', state.underline, () => chain().toggleUnderline().run(), 'Underline')}
      {btn('S', state.strike, () => chain().toggleStrike().run(), 'Strikethrough')}
      <span className="adm-tool-sep" />
      {btn('• List', state.bulletList, () => chain().toggleBulletList().run(), 'Bullet list')}
      {btn('1. List', state.orderedList, () => chain().toggleOrderedList().run(), 'Numbered list')}
      {btn('“ Quote', state.blockquote, () => chain().toggleBlockquote().run(), 'Quote')}
      {btn('— Line', false, () => chain().setHorizontalRule().run(), 'Divider line')}
      <span className="adm-tool-sep" />
      {btn('Link', state.link, setLink, 'Add / edit link')}
      {btn('Image', false, addImage, 'Insert image from URL')}
      <span className="adm-tool-sep" />
      {btn('↶', false, () => chain().undo().run(), 'Undo', !state.canUndo)}
      {btn('↷', false, () => chain().redo().run(), 'Redo', !state.canRedo)}
    </div>
  );
}
