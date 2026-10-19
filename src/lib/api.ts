import { collection, getDocs, getDoc, doc, addDoc, query, orderBy, serverTimestamp, Timestamp, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  category?: string;
  readTime?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Job {
  id: string;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  summary?: string;
  description: string;
  applyUrl?: string;
  open?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  industry?: string;
  challenge?: string;
  read?: boolean;
  createdAt?: string;
}

export function toIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  return undefined;
}

export function toBlogPost(id: string, data: DocumentData): BlogPost {
  return {
    slug: id,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    author: data.author,
    category: data.category,
    readTime: data.readTime,
    // Posts created before the admin panel existed have no flag; treat them as published.
    published: data.published !== false,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export function toJob(id: string, data: DocumentData): Job {
  return {
    id,
    title: data.title,
    department: data.department,
    location: data.location,
    employmentType: data.employmentType,
    summary: data.summary,
    description: data.description,
    applyUrl: data.applyUrl,
    open: data.open !== false,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export function toContactMessage(id: string, data: DocumentData): ContactMessage {
  return {
    id,
    name: data.name,
    email: data.email,
    message: data.message,
    phone: data.phone,
    company: data.company,
    industry: data.industry,
    challenge: data.challenge,
    read: data.read === true,
    createdAt: toIso(data.createdAt),
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((d) => toBlogPost(d.id, d.data())).filter((post) => post.published);
  } catch (error) {
    console.error('Error fetching blogs from Firestore:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const ref = doc(db, 'blogs', slug);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    const post = toBlogPost(snap.id, snap.data());
    return post.published ? post : null;
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}

export async function getOpenJobs(): Promise<Job[]> {
  try {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((d) => toJob(d.id, d.data())).filter((job) => job.open);
  } catch (error) {
    console.error('Error fetching jobs from Firestore:', error);
    return [];
  }
}

export async function submitContactForm(payload: {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  industry?: string;
  challenge?: string;
}) {
  try {
    const ref = await addDoc(collection(db, 'contact-messages'), {
      ...payload,
      read: false,
      createdAt: serverTimestamp(),
    });

    return { id: ref.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
