'use client';

import { useCallback, useEffect, useState } from 'react';
import { Job, normalizeLink } from '../../../lib/api';
import { JobInput, createJob, deleteJob, listAllJobs, updateJob } from '../../../lib/admin';
import { toHtml } from '../../../components/RichContent';
import RichTextEditor from './RichTextEditor';

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Graduate trainee'];

const EMPTY: JobInput = {
  title: '',
  department: '',
  location: 'Lagos, Nigeria',
  employmentType: 'Full-time',
  summary: '',
  description: '',
  applyUrl: '',
  open: true,
};

function formatDate(iso?: string) {
  return iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
}

export default function JobManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // null = list view, 'new' = creating, otherwise the id being edited
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(
    () =>
      listAllJobs()
        .then((items) => {
          setJobs(items);
          setError('');
        })
        .catch((err) => {
          console.error(err);
          setError('Could not load jobs.');
        })
        .finally(() => setLoading(false)),
    [],
  );

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (job: Job) => {
    if (!window.confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    try {
      await deleteJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    } catch (err) {
      console.error(err);
      setError('Could not delete the job.');
    }
  };

  const toggleOpen = async (job: Job) => {
    try {
      await updateJob(job.id, { open: !job.open });
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, open: !job.open } : j)));
    } catch (err) {
      console.error(err);
      setError('Could not update the job.');
    }
  };

  if (editing !== null) {
    const job = editing === 'new' ? null : jobs.find((j) => j.id === editing) ?? null;
    return (
      <JobForm
        key={editing}
        job={job}
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
          <h1>Job listings</h1>
          <p className="adm-muted">Open roles appear on the Careers page.</p>
        </div>
        <button className="adm-btn" onClick={() => setEditing('new')}>+ New job</button>
      </div>

      {error && <p className="adm-error">{error}</p>}

      {loading ? (
        <p className="adm-muted">Loading jobs…</p>
      ) : jobs.length === 0 ? (
        <div className="adm-card adm-empty">No job listings yet. The Careers page shows the talent pool link until you add one.</div>
      ) : (
        <div className="adm-card adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Status</th>
                <th>Posted</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="adm-row-title">{job.title}</div>
                    <div className="adm-muted adm-small">
                      {[job.department, job.location, job.employmentType].filter(Boolean).join(' · ')}
                    </div>
                  </td>
                  <td>
                    <span className={`adm-badge ${job.open ? 'is-green' : ''}`}>{job.open ? 'Open' : 'Closed'}</span>
                  </td>
                  <td className="adm-nowrap">{formatDate(job.createdAt)}</td>
                  <td className="adm-actions">
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => toggleOpen(job)}>
                      {job.open ? 'Close' : 'Reopen'}
                    </button>
                    <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setEditing(job.id)}>Edit</button>
                    <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={() => handleDelete(job)}>Delete</button>
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

function JobForm({ job, onCancel, onSaved }: { job: Job | null; onCancel: () => void; onSaved: () => void }) {
  const isNew = job === null;
  const [form, setForm] = useState<JobInput>(() =>
    job
      ? {
          title: job.title ?? '',
          department: job.department ?? '',
          location: job.location ?? '',
          employmentType: job.employmentType ?? '',
          summary: job.summary ?? '',
          description: toHtml(job.description ?? ''),
          applyUrl: job.applyUrl ?? '',
          open: job.open !== false,
        }
      : EMPTY,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof JobInput>(key: K, value: JobInput[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) return setError('Please add a job title.');
    if (!form.description.trim()) return setError('Please add a job description.');

    const data: JobInput = { ...form, title: form.title.trim(), applyUrl: normalizeLink(form.applyUrl) ?? '' };

    setSaving(true);
    try {
      if (isNew) await createJob(data);
      else await updateJob(job.id, data);
      onSaved();
    } catch (err) {
      console.error(err);
      setError('Could not save the job.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="adm-section-head">
        <div>
          <button type="button" className="adm-back" onClick={onCancel}>← All jobs</button>
          <h1>{isNew ? 'New job listing' : 'Edit job listing'}</h1>
        </div>
        <div className="adm-head-actions">
          <button type="button" className="adm-btn adm-btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="adm-btn" disabled={saving}>{saving ? 'Saving…' : 'Save job'}</button>
        </div>
      </div>

      {error && <p className="adm-error">{error}</p>}

      <div className="adm-form-grid">
        <div className="adm-card adm-stack">
          <label className="adm-field">
            <span>Job title</span>
            <input className="adm-input-lg" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Senior HR Consultant" required />
          </label>

          <label className="adm-field">
            <span>Short summary <em>Shown before the listing is expanded</em></span>
            <textarea rows={3} value={form.summary} onChange={(e) => set('summary', e.target.value)} placeholder="A one or two sentence overview of the role." />
          </label>

          <div className="adm-field">
            <span>Full description <em>Responsibilities, requirements, benefits…</em></span>
            <RichTextEditor value={form.description} onChange={(html) => set('description', html)} />
          </div>
        </div>

        <aside className="adm-stack">
          <div className="adm-card adm-stack">
            <label className="adm-check">
              <input type="checkbox" checked={form.open} onChange={(e) => set('open', e.target.checked)} />
              <span>
                <b>Open for applications</b>
                <em>Closed roles are hidden from the Careers page.</em>
              </span>
            </label>
          </div>

          <div className="adm-card adm-stack">
            <label className="adm-field">
              <span>Department</span>
              <input value={form.department} onChange={(e) => set('department', e.target.value)} placeholder="Advisory, Operations…" />
            </label>
            <label className="adm-field">
              <span>Location</span>
              <input value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Lagos, Nigeria / Remote" />
            </label>
            <label className="adm-field">
              <span>Employment type</span>
              <select value={form.employmentType} onChange={(e) => set('employmentType', e.target.value)}>
                <option value="">—</option>
                {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="adm-field">
              <span>Application link <em>Form or email (mailto:). Defaults to the talent pool form.</em></span>
              <input value={form.applyUrl} onChange={(e) => set('applyUrl', e.target.value)} placeholder="https://forms.gle/… or mailto:careers@…" />
            </label>
          </div>
        </aside>
      </div>
    </form>
  );
}
