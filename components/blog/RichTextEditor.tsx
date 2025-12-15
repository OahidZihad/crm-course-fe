"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { Youtube } from "@tiptap/extension-youtube";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Placeholder } from "@tiptap/extension-placeholder";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Quote,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Table as TableIcon,
  Highlighter,
  Palette,
  Plus,
  Minus,
  Trash2,
  RowsIcon,
  ColumnsIcon,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 border-2 border-border hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
      isActive ? "bg-primary text-white" : "bg-white"
    }`}
  >
    {children}
  </button>
);

const MenuDivider = () => <div className="w-px h-8 bg-border mx-1" />;

const ColorPicker = ({
  editor,
  type,
}: {
  editor: Editor;
  type: "text" | "highlight";
}) => {
  const colors = [
    "#000000",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#a8a6ff",
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border-2 border-border hover:bg-primary/20 transition-all bg-white"
        title={type === "text" ? "Text Color" : "Highlight Color"}
      >
        {type === "text" ? (
          <Palette className="w-4 h-4" />
        ) : (
          <Highlighter className="w-4 h-4" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 p-2 bg-white border-2 border-border shadow-neo z-50 grid grid-cols-3 gap-1">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => {
                if (type === "text") {
                  editor.chain().focus().setColor(color).run();
                } else {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color })
                    .run();
                }
                setIsOpen(false);
              }}
              className="w-6 h-6 border-2 border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <button
            type="button"
            onClick={() => {
              if (type === "text") {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().unsetHighlight().run();
              }
              setIsOpen(false);
            }}
            className="w-6 h-6 border-2 border-border bg-white flex items-center justify-center hover:bg-gray-100"
            title="Remove Color"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

const ImageUploadDialog = ({
  editor,
  isOpen,
  onClose,
}: {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState("");

  const handleInsert = () => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setUrl("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white border-4 border-border shadow-neo-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Insert Image</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter image URL..."
          className="w-full border-2 border-border p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 border-border"
          >
            Cancel
          </Button>
          <Button onClick={handleInsert} className="border-2 border-border">
            Insert
          </Button>
        </div>
      </div>
    </div>
  );
};

const YoutubeDialog = ({
  editor,
  isOpen,
  onClose,
}: {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState("");

  const handleInsert = () => {
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 360,
      });
      setUrl("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white border-4 border-border shadow-neo-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Insert YouTube Video</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL..."
          className="w-full border-2 border-border p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 border-border"
          >
            Cancel
          </Button>
          <Button onClick={handleInsert} className="border-2 border-border">
            Insert
          </Button>
        </div>
      </div>
    </div>
  );
};

const LinkDialog = ({
  editor,
  isOpen,
  onClose,
}: {
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState("");

  const handleInsert = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setUrl("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white border-4 border-border shadow-neo-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Insert Link</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL..."
          className="w-full border-2 border-border p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 border-border"
          >
            Cancel
          </Button>
          <Button onClick={handleInsert} className="border-2 border-border">
            Insert
          </Button>
        </div>
      </div>
    </div>
  );
};

const TableMenu = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border-2 border-border hover:bg-primary/20 transition-all bg-white"
        title="Table Options"
      >
        <TableIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border-2 border-border shadow-neo z-50 min-w-[180px]">
          <button
            type="button"
            onClick={() => {
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run();
              setIsOpen(false);
            }}
            className="w-full px-3 py-2 text-left hover:bg-primary/20 font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Insert Table
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().addColumnAfter().run();
              setIsOpen(false);
            }}
            disabled={!editor.can().addColumnAfter()}
            className="w-full px-3 py-2 text-left hover:bg-primary/20 font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <ColumnsIcon className="w-4 h-4" /> Add Column
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().addRowAfter().run();
              setIsOpen(false);
            }}
            disabled={!editor.can().addRowAfter()}
            className="w-full px-3 py-2 text-left hover:bg-primary/20 font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <RowsIcon className="w-4 h-4" /> Add Row
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().deleteColumn().run();
              setIsOpen(false);
            }}
            disabled={!editor.can().deleteColumn()}
            className="w-full px-3 py-2 text-left hover:bg-primary/20 font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" /> Delete Column
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().deleteRow().run();
              setIsOpen(false);
            }}
            disabled={!editor.can().deleteRow()}
            className="w-full px-3 py-2 text-left hover:bg-primary/20 font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" /> Delete Row
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().deleteTable().run();
              setIsOpen(false);
            }}
            disabled={!editor.can().deleteTable()}
            className="w-full px-3 py-2 text-left hover:bg-destructive hover:text-white font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> Delete Table
          </button>
        </div>
      )}
    </div>
  );
};

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  if (!editor) return null;

  return (
    <>
      <div className="border-2 border-border border-b-0 bg-white p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </MenuButton>

        <MenuDivider />

        {/* Headings */}
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={editor.isActive("heading", { level: 4 })}
          title="Heading 4"
        >
          <Heading4 className="w-4 h-4" />
        </MenuButton>

        <MenuDivider />

        {/* Alignment */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </MenuButton>

        <MenuDivider />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </MenuButton>

        <MenuDivider />

        {/* Colors */}
        <ColorPicker editor={editor} type="text" />
        <ColorPicker editor={editor} type="highlight" />

        <MenuDivider />

        {/* Special Blocks */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <Code className="w-4 h-4" />
        </MenuButton>

        <MenuDivider />

        {/* Media */}
        <MenuButton
          onClick={() => setShowLinkDialog(true)}
          isActive={editor.isActive("link")}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => setShowImageDialog(true)} title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => setShowYoutubeDialog(true)}
          title="Insert YouTube Video"
        >
          <YoutubeIcon className="w-4 h-4" />
        </MenuButton>
        <TableMenu editor={editor} />

        <MenuDivider />

        {/* Undo/Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </MenuButton>
      </div>

      <ImageUploadDialog
        editor={editor}
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
      />
      <YoutubeDialog
        editor={editor}
        isOpen={showYoutubeDialog}
        onClose={() => setShowYoutubeDialog(false)}
      />
      <LinkDialog
        editor={editor}
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
      />
    </>
  );
};

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your amazing blog post...",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // Required for Next.js SSR compatibility
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto border-2 border-border shadow-neo my-4",
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full aspect-video border-2 border-border shadow-neo my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline font-bold",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-2 border-border w-full my-4",
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: "border-2 border-border p-2",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border-2 border-border p-2 bg-primary/20 font-bold",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] p-6 focus:outline-none",
      },
    },
  });

  return (
    <div className="border-2 border-border shadow-neo bg-white">
      <MenuBar editor={editor} />
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          padding: 1.5rem;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          border-bottom: 4px solid #a8a6ff;
          padding-bottom: 0.5rem;
        }
        .ProseMirror h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .ProseMirror p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #a8a6ff;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background: rgba(168, 166, 255, 0.1);
        }
        .ProseMirror pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 1rem;
          border: 2px solid #000;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .ProseMirror code {
          background: rgba(168, 166, 255, 0.2);
          padding: 0.2rem 0.4rem;
          border: 1px solid #a8a6ff;
          font-family: monospace;
        }
        .ProseMirror pre code {
          background: none;
          border: none;
          padding: 0;
        }
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
        }
        .ProseMirror td,
        .ProseMirror th {
          border: 2px solid #000;
          padding: 0.5rem;
          position: relative;
        }
        .ProseMirror th {
          background: rgba(168, 166, 255, 0.3);
          font-weight: 700;
        }
        .ProseMirror .selectedCell {
          background: rgba(168, 166, 255, 0.4);
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
        .ProseMirror iframe {
          width: 100%;
          aspect-ratio: 16/9;
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
