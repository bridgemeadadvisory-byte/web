'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth, isAdmin } from '../../lib/admin';
import BlogManager from './_components/BlogManager';
import JobManager from './_components/JobManager';
import ContactInbox from './_components/ContactInbox';

type AuthState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'denied'; user: User }
  | { status: 'admin'; user: User };

type Tab = 'blogs' | 'jobs' | 'contacts';

const TABS: { key: Tab; label: string }[] = [
  { key: 'blogs', label: 'Blog posts' },
  { key: 'jobs', label: 'Job listings' },
  { key: 'contacts', label: 'Contact submissions' },
];

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' });
  const [tab, setTab] = useState<Tab>('blogs');

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState({ status: 'signed-out' });
        return;
      }
      setAuthState({ status: 'loading' });
      setAuthState((await isAdmin(user.uid)) ? { status: 'admin', user } : { status: 'denied', user });
    });
  }, []);

  if (authState.status === 'loading') {
    return <div className="adm-center"><p className="adm-muted">Loading…</p></div>;
  }

  if (authState.status === 'signed-out') {
    return <LoginForm />;
  }

  if (authState.status === 'denied') {
    return (
      <div className="adm-center">
        <div className="adm-card adm-login">
          <h1>Access denied</h1>
          <p className="adm-muted">
            <b>{authState.user.email}</b> is signed in but is not an admin. Ask the site owner to add your UID to the
            admins list:
          </p>
          <code className="adm-code">{authState.user.uid}</code>
          <button className="adm-btn" onClick={() => signOut(auth)}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-shell">
      <header className="adm-header">
        <div className="adm-header-inner">
          <div className="adm-brand">
            <img src="/logo.png" alt="Bridgemead Advisory" />
            <span>Admin</span>
          </div>
          <nav className="adm-tabs" aria-label="Admin sections">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`adm-tab ${tab === t.key ? 'is-active' : ''}`}
                onClick={() => setTab(t.key)}
                aria-current={tab === t.key ? 'page' : undefined}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="adm-user">
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-link">View site ↗</a>
            <span className="adm-muted adm-email">{authState.user.email}</span>
            <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => signOut(auth)}>Sign out</button>
          </div>
        </div>
      </header>

      <main className="adm-main">
        {tab === 'blogs' && <BlogManager />}
        {tab === 'jobs' && <JobManager />}
        {tab === 'contacts' && <ContactInbox />}
      </main>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Incorrect email or password.');
      setSubmitting(false);
    }
  };

  return (
    <div className="adm-center">
      <form className="adm-card adm-login" onSubmit={handleSubmit}>
        <img src="/logo.png" alt="Bridgemead Advisory" className="adm-login-logo" />
        <h1>Admin sign in</h1>
        <label className="adm-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </label>
        <label className="adm-field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>
        {error && <p className="adm-error">{error}</p>}
        <button type="submit" className="adm-btn" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
