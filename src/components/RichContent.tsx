// Renders post / job bodies. New content from the /admin editor is HTML; older
// posts were stored as simple markdown-like text, so both formats are supported.
// HTML is rendered as-is: only admins can write it (see firestore.rules).
export default function RichContent({ content, className = '' }: { content: string; className?: string }) {
  return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{ __html: toHtml(content) }} />;
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline **bold** is the only inline syntax the legacy posts use.
const inline = (text: string) => escapeHtml(text.trim()).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

export function toHtml(content: string): string {
  if (/^\s*</.test(content)) return content;

  return content
    .split('\n\n')
    .map((paragraph) => {
      const block = paragraph.trim();
      if (!block) return '';
      if (block.startsWith('### ')) return `<h3>${inline(block.replace('### ', ''))}</h3>`;
      const lines = block.split('\n').filter((l) => l.trim());
      if (block.startsWith('- ')) {
        return `<ul>${lines.map((li) => `<li>${inline(li.trim().replace('- ', ''))}</li>`).join('')}</ul>`;
      }
      if (block.startsWith('1. ')) {
        return `<ol>${lines.map((li) => `<li>${inline(li.trim().replace(/^\d+\.\s/, ''))}</li>`).join('')}</ol>`;
      }
      return `<p>${inline(block)}</p>`;
    })
    .join('');
}
