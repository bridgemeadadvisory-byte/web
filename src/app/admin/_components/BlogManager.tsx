'use client';

import { useCallback, useEffect, useState } from 'react';
import { BlogPost } from '../../../lib/api';
import { BlogInput, createBlog, deleteBlog, listAllBlogs, slugify, updateBlog } from '../../../lib/admin';
import { toHtml } from '../../../components/RichContent';
import RichTextEditor from './RichTextEditor';

const EMPTY: BlogInput = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'Bridgemead Advisory',
  category: '',
  readTime: '',
  published: true,
};

function formatDate(iso?: string) {
  return iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
}

function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // null = list view, 'new' = creating, otherwise the slug being edited
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(
    () =>
      listAllBlogs()
        .then((items) => {
          setPosts(items);
          setError('');
        })
        .catch((err) => {
          console.error(err);
          setError('Could not load posts.');
        })
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await deleteBlog(post.slug);
      setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
    } catch (err) {
      console.error(err);
      setError('Could not delete the post.');
    }
  };

  if (editing !== null) {
    const post = editing === 'new' ? null : posts.find((p) => p.slug === editing) ?? null;
    return (
      <BlogForm
        key={editing}
        post={post}
        onCancel={() => setEditing(null)}
        onSaved={async () => {
          setEditing(null);
          setLoading(true);
          await load();
        }}
      />
    );
  }

  return (
    <section>
      <div className="adm-section-head">
        <div>
          <h1>Blog posts</h1>
          <p className="adm-muted">Published posts appear on the Insights page.</p>
        </div>
        <button className="adm-btn" onClick={() => setEditing('new')}>+ New post</button>
      </div>

      {error && <p className="adm-error">{error}</p>}

      {loading ? (
        <p className="adm-muted">Loading posts…</p>
      ) : posts.length === 0 ? (
        <div className="adm-card adm-empty">No posts yet. Create your first one.</div>
      ) : (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td>
                    <div className="adm-row-title">{post.title}</div>
                    <div className="adm-muted adm-small">/blog/{post.slug}</div>
                  </td>
                  <td>
                    <span className={`adm-badge ${post.published ? 'is-green' : ''}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="adm-nowrap">{formatDate(post.createdAt)}</td>
                  <td className="adm-actions">
                    {post.published && (
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="adm-link">View</a>
                    )}
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setEditing(post.slug)}>Edit</button>
                    <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => handleDelete(post)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function BlogForm({ post, onCancel, onSaved }: { post: BlogPost | null; onCancel: () => void; onSaved: () => void }) {
  const isNew = post === null;
  const [form, setForm] = useState<BlogInput>(() =>
    post
      ? {
          title: post.title ?? '',
          excerpt: post.excerpt ?? '',
          content: toHtml(post.content ?? ''),
          coverImage: post.coverImage ?? '',
          author: post.author ?? '',
          category: post.category ?? '',
          readTime: post.readTime ?? '',
          published: post.published !== false,
        }
      : EMPTY,
  );
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof BlogInput>(key: K, value: BlogInput[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitle = (title: string) => {
    set('title', title);
    if (isNew && !slugTouched) setSlug(slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const finalSlug = slugify(slug);
    if (!form.title.trim()) return setError('Please add a title.');
    if (!finalSlug) return setError('Please add a URL slug.');
    if (!form.content.trim()) return setError('Please write some content.');

    const data: BlogInput = {
      ...form,
      title: form.title.trim(),
      readTime: form.readTime?.trim() || estimateReadTime(form.content),
    };

    setSaving(true);
    try {
      if (isNew) await createBlog(finalSlug, data);
      else await updateBlog(post.slug, data);
      onSaved();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error && err.message.includes('already exists') ? err.message : 'Could not save the post.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="adm-section-head">
        <div>
          <button type="button" className="adm-back" onClick={onCancel}>← All posts</button>
          <h1>{isNew ? 'New blog post' : 'Edit blog post'}</h1>
        </div>
        <div className="adm-head-actions">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="adm-btn" disabled={saving}>
            {saving ? 'Saving…' : form.published ? 'Publish' : 'Save draft'}
          </button>
        </div>
      </div>

      {error && <p className="adm-error">{error}</p>}

      <div className="adm-form-grid">
        <div className="adm-card adm-stack">
          <label className="adm-field">
            <span>Title</span>
            <input className="adm-input-lg" value={form.title} onChange={(e) => handleTitle(e.target.value)} placeholder="Closing the Strategy-Execution Gap" required />
          </label>

          <label className="adm-field">
            <span>Excerpt / summary <em>Shown on the Insights listing and at the top of the post</em></span>
            <textarea rows={3} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="One or two sentences that summarise the article." />
          </label>

          <div className="adm-field">
            <span>Content</span>
            <RichTextEditor value={form.content} onChange={(html) => set('content', html)} />
          </div>
        </div>

        <aside className="adm-stack">
          <div className="adm-card adm-stack">
            <label className="adm-check">
              <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
              <span>
                <b>Published</b>
                <em>Untick to save as a draft that is hidden from the site.</em>
              </span>
            </label>

            <label className="adm-field">
              <span>URL slug</span>
              <div className="adm-prefix">
                <span>/blog/</span>
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugTouched(true);
                  }}
                  onBlur={() => setSlug(slugify(slug))}
                  disabled={!isNew}
                  required
                />
              </div>
              {!isNew && <em>The URL can&apos;t change after a post is created.</em>}
            </label>
          </div>

          <div className="adm-card adm-stack">
            <label className="adm-field">
              <span>Cover image URL</span>
              <input value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)} placeholder="https://… or /blog1.png" />
            </label>
            {form.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.coverImage} alt="Cover preview" className="adm-cover-preview" />
            )}
          </div>

          <div className="adm-card adm-stack">
            <label className="adm-field">
              <span>Author</span>
              <input value={form.author} onChange={(e) => set('author', e.target.value)} placeholder="Bridgemead Advisory" />
            </label>
            <label className="adm-field">
              <span>Category</span>
              <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Strategy, ESG, People…" />
            </label>
            <label className="adm-field">
              <span>Read time <em>Leave empty to estimate automatically</em></span>
              <input value={form.readTime} onChange={(e) => set('readTime', e.target.value)} placeholder={estimateReadTime(form.content)} />
            </label>
          </div>
        </aside>
      </div>
    </form>
  );
}
