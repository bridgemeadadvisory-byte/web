'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContactMessage } from '../../../lib/api';
import { deleteContactMessage, listContactMessages, setContactRead } from '../../../lib/admin';

const INDUSTRIES: Record<string, string> = {
  finance: 'Financial Services & Fintech',
  energy: 'Oil & Gas / Energy',
  agri: 'Agribusiness',
  manufacturing: 'Industrial Manufacturing',
  ict: 'ICT & Telecoms',
  mining: 'Maritime & Mining',
  sme: 'SME',
  other: 'Other',
};

function formatDateTime(iso?: string) {
  return iso
    ? new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';
}

type Filter = 'all' | 'unread';

export default function ContactInbox() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const load = useCallback(
    () =>
      listContactMessages()
        .then((items) => {
          setMessages(items);
          setError('');
        })
        .catch((err) => {
          console.error(err);
          setError('Could not load submissions.');
        })
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    load();
  }, [load]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return messages.filter((m) => {
      if (filter === 'unread' && m.read) return false;
      if (!q) return true;
      return [m.name, m.email, m.company, m.message].some((v) => v?.toLowerCase().includes(q));
    });
  }, [messages, filter, search]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  const markRead = async (msg: ContactMessage, read: boolean) => {
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read } : m)));
    try {
      await setContactRead(msg.id, read);
    } catch (err) {
      console.error(err);
      setError('Could not update the submission.');
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: !read } : m)));
    }
  };

  const open = (msg: ContactMessage) => {
    setSelectedId(msg.id);
    if (!msg.read) markRead(msg, true);
  };

  const handleDelete = async (msg: ContactMessage) => {
    if (!window.confirm(`Delete the submission from ${msg.name}? This cannot be undone.`)) return;
    try {
      await deleteContactMessage(msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      setSelectedId(null);
    } catch (err) {
      console.error(err);
      setError('Could not delete the submission.');
    }
  };

  return (
    <section>
      <div className="adm-section-head">
        <div>
          <h1>Contact submissions</h1>
          <p className="adm-muted">
            Messages sent from the “Book a Strategy Call” form{unreadCount > 0 && <> · <b>{unreadCount} unread</b></>}.
          </p>
        </div>
        <button
          className="adm-btn adm-btn-ghost"
          onClick={() => {
            setLoading(true);
            load();
          }}
          disabled={loading}
        >↻ Refresh</button>
      </div>

      {error && <p className="adm-error">{error}</p>}

      <div className="adm-filters">
        <div className="adm-segment" role="group" aria-label="Filter">
          <button className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>All ({messages.length})</button>
          <button className={filter === 'unread' ? 'is-active' : ''} onClick={() => setFilter('unread')}>Unread ({unreadCount})</button>
        </div>
        <input
          type="search"
          className="adm-search"
          placeholder="Search name, email, company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="adm-muted">Loading submissions…</p>
      ) : visible.length === 0 ? (
        <div className="adm-card adm-empty">{messages.length === 0 ? 'No submissions yet.' : 'Nothing matches this filter.'}</div>
      ) : (
        <div className="adm-inbox">
          <ul className="adm-card adm-inbox-list">
            {visible.map((m) => (
              <li key={m.id}>
                <button
                  className={`adm-inbox-item ${m.read ? '' : 'is-unread'} ${selectedId === m.id ? 'is-selected' : ''}`}
                  onClick={() => open(m)}
                >
                  <span className="adm-inbox-row">
                    <span className="adm-inbox-name">{m.name}</span>
                    <span className="adm-muted adm-small adm-nowrap">{formatDateTime(m.createdAt)}</span>
                  </span>
                  <span className="adm-muted adm-small">{m.company ? `${m.company} · ` : ''}{m.email}</span>
                  <span className="adm-inbox-preview">{m.challenge ?? m.message}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="adm-card adm-inbox-detail">
            {selected ? (
              <MessageDetail msg={selected} onToggleRead={() => markRead(selected, !selected.read)} onDelete={() => handleDelete(selected)} />
            ) : (
              <p className="adm-muted adm-empty">Select a submission to read it.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function MessageDetail({ msg, onToggleRead, onDelete }: { msg: ContactMessage; onToggleRead: () => void; onDelete: () => void }) {
  // Older submissions only have the combined `message` field.
  const structured = msg.challenge !== undefined;
  const rows: [string, React.ReactNode][] = [
    ['Email', <a key="e" href={`mailto:${msg.email}`} className="adm-link">{msg.email}</a>],
    ['Phone', msg.phone ? <a key="p" href={`tel:${msg.phone}`} className="adm-link">{msg.phone}</a> : null],
    ['Company', msg.company],
    ['Industry', msg.industry ? INDUSTRIES[msg.industry] ?? msg.industry : null],
    ['Received', formatDateTime(msg.createdAt)],
  ];

  return (
    <div className="adm-stack">
      <div className="adm-detail-head">
        <h2>{msg.name}</h2>
        <div className="adm-head-actions">
          <a className="adm-btn adm-btn-sm" href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: Your strategy call request — Bridgemead Advisory')}`}>Reply</a>
          <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={onToggleRead}>{msg.read ? 'Mark unread' : 'Mark read'}</button>
          <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={onDelete}>Delete</button>
        </div>
      </div>

      <dl className="adm-dl">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div>
        <h3 className="adm-label">{structured ? 'Challenge they want to solve' : 'Message'}</h3>
        <p className="adm-message">{structured ? msg.challenge : msg.message}</p>
      </div>
    </div>
  );
}
