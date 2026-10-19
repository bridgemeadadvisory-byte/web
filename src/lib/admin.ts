// Client-only helpers for the /admin dashboard. Writes here are enforced by
// firestore.rules: only signed-in users listed in the `admins` collection may write.
import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { BlogPost, ContactMessage, Job, toBlogPost, toContactMessage, toJob } from './api';

export const auth = getAuth(db.app);

export async function isAdmin(uid: string): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'admins', uid));
    return snap.exists();
  } catch {
    return false;
  }
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ---------- blogs ---------- */

export async function listAllBlogs(): Promise<BlogPost[]> {
  const snap = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => toBlogPost(d.id, d.data()));
}

export type BlogInput = Omit<BlogPost, 'slug' | 'createdAt' | 'updatedAt'>;

export async function createBlog(slug: string, data: BlogInput) {
  const ref = doc(db, 'blogs', slug);
  if ((await getDoc(ref)).exists()) {
    throw new Error(`A post with the URL slug "${slug}" already exists.`);
  }
  await setDoc(ref, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function updateBlog(slug: string, data: Partial<BlogInput>) {
  await updateDoc(doc(db, 'blogs', slug), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteBlog(slug: string) {
  await deleteDoc(doc(db, 'blogs', slug));
}

/* ---------- jobs ---------- */

export async function listAllJobs(): Promise<Job[]> {
  const snap = await getDocs(query(collection(db, 'jobs'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => toJob(d.id, d.data()));
}

export type JobInput = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

export async function createJob(data: JobInput) {
  await addDoc(collection(db, 'jobs'), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
}

export async function updateJob(id: string, data: Partial<JobInput>) {
  await updateDoc(doc(db, 'jobs', id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteJob(id: string) {
  await deleteDoc(doc(db, 'jobs', id));
}

/* ---------- contact messages ---------- */

export async function listContactMessages(): Promise<ContactMessage[]> {
  const snap = await getDocs(query(collection(db, 'contact-messages'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => toContactMessage(d.id, d.data()));
}

export async function setContactRead(id: string, read: boolean) {
  await updateDoc(doc(db, 'contact-messages', id), { read });
}

export async function deleteContactMessage(id: string) {
  await deleteDoc(doc(db, 'contact-messages', id));
}
