import { collection, getDocs, getDoc, doc, addDoc, query, orderBy, serverTimestamp, Timestamp, DocumentData } from 'firebase/firestore';
import { db } from './firebase';

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  coverImage?: string;
  createdAt?: string;
}

function toIso(value: unknown): string | undefined {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  return undefined;
}

function toBlogPost(id: string, data: DocumentData): BlogPost {
  return {
    slug: id,
    title: data.title,
    content: data.content,
    coverImage: data.coverImage,
    createdAt: toIso(data.createdAt),
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map((d) => toBlogPost(d.id, d.data()));
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

    return toBlogPost(snap.id, snap.data());
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}

export async function submitContactForm(payload: { name: string; email: string; message: string }) {
  try {
    const ref = await addDoc(collection(db, 'contact-messages'), {
      ...payload,
      createdAt: serverTimestamp(),
    });

    return { id: ref.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
