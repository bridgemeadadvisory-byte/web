import Link from 'next/link';
import { getBlogBySlug } from '../../../lib/api';
import { notFound } from 'next/navigation';
import { FadeUp, StaggerContainer, StaggerItem } from '../../../components/Animate';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const title = post.title;
  const date = new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const author = 'Bridgemead Advisory';
  const imgUrl = post.coverImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop';
  const content = post.content || '';

  return (
    <>
      <section className="section section--paper" style={{ paddingTop: '8rem' }}>
        <div className="wrap" style={{ maxWidth: '800px' }}>
          
          <StaggerContainer>
            <StaggerItem style={{ marginBottom: '2rem' }}>
              <Link href="/blog" style={{ color: 'var(--ink)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                ← Back to all Insights
              </Link>
            </StaggerItem>

            <StaggerItem>
              <h1 className="h2" style={{ color: 'var(--ink)', marginBottom: '1rem' }}>{title}</h1>
            </StaggerItem>
            
            <StaggerItem style={{ display: 'flex', gap: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--line-light)' }}>
              <span><b>By {author}</b></span>
              <span>{date}</span>
            </StaggerItem>

            <StaggerItem 
              style={{ 
                width: '100%', 
                height: '400px', 
                borderRadius: 'var(--radius)',
                marginBottom: '3rem',
                overflow: 'hidden'
              }}
            >
              <img src={imgUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </StaggerItem>

            <StaggerItem>
              <article style={{ color: 'var(--ink)', lineHeight: '1.8', fontSize: '1.1rem' }} className="blog-content">
            {/* Extremely simple markdown-like rendering for stored post content */}
            {content.split('\n\n').map((paragraph: string, i: number) => {
              if (paragraph.trim().startsWith('### ')) {
                return <h3 key={i} style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.5rem' }}>{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim().startsWith('- ')) {
                 return (
                   <ul key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                     {paragraph.split('\n').filter(Boolean).map((li, j) => (
                       <li key={j} style={{ marginBottom: '0.5rem' }}>{li.replace('- ', '')}</li>
                     ))}
                   </ul>
                 )
              }
              if (paragraph.trim().startsWith('1. ')) {
                 return (
                   <ol key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                     {paragraph.split('\n').filter(Boolean).map((li, j) => (
                       <li key={j} style={{ marginBottom: '0.5rem' }}>{li.replace(/^\d+\.\s/, '')}</li>
                     ))}
                   </ol>
                 )
              }
              return <p key={i} style={{ marginBottom: '1.5rem' }}>{paragraph.trim()}</p>;
            })}
              </article>
            </StaggerItem>

            <StaggerItem style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--line-light)' }}>
              <h4 style={{ color: 'var(--ink)', marginBottom: '1rem' }}>Share this article</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-ghost" style={{ color: 'var(--ink)', borderColor: 'var(--line-light)' }}>LinkedIn</button>
                <button className="btn btn-ghost" style={{ color: 'var(--ink)', borderColor: 'var(--line-light)' }}>Twitter</button>
                <button className="btn btn-ghost" style={{ color: 'var(--ink)', borderColor: 'var(--line-light)' }}>Copy Link</button>
              </div>
            </StaggerItem>
          </StaggerContainer>

        </div>
      </section>
    </>
  );
}
