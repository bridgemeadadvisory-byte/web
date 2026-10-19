import Link from 'next/link';
import { getBlogs, BlogPost } from '../../lib/api';
import { FadeUp, StaggerContainer, StaggerItem } from '../../components/Animate';

export default async function BlogListing({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const pageStr = params?.page;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const itemsPerPage = 6;

  let blogs: BlogPost[] = [];
  try {
    blogs = await getBlogs();
  } catch (err) {
    console.error(err);
  }

  const totalPages = Math.max(1, Math.ceil(blogs.length / itemsPerPage));
  
  const startIndex = (page - 1) * itemsPerPage;
  const currentPosts = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <FadeUp>
        <div className="hero" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: 'auto', background: 'var(--navy-900)' }}>
          <div className="wrap">
            <span className="eyebrow" style={{ color: 'var(--teal-bright)' }}>Insights</span>
            <h1 className="hero-title">Latest Thinking & Analysis</h1>
            <p className="hero-sub">Read our latest perspectives on productivity, strategy execution, and workforce optimization.</p>
          </div>
        </div>
      </FadeUp>

      <section className="section section--paper">
        <FadeUp>
          <div className="wrap">
            
            <StaggerContainer className="board-grid">
              {currentPosts.length === 0 ? (
                <div style={{ padding: '2rem 0', color: 'var(--ink)' }}>No insights published yet.</div>
              ) : (
                currentPosts.map((post) => {
                  const title = post.title;
                  const slug = post.slug;
                  const date = new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                  
                  const imgUrl = post.coverImage || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop';

                  return (
                    <StaggerItem className="bcard" key={slug}>
                      <div className="bcard-photo">
                        <img src={imgUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="bcard-body">
                        <h3>{title}</h3>
                        <p className="role">{date}{post.readTime ? ` · ${post.readTime}` : ''}</p>
                        {post.excerpt && <p style={{ marginTop: '0.6rem', fontSize: '0.95rem', lineHeight: 1.55 }}>{post.excerpt}</p>}
                        <div style={{ marginTop: '1.2rem' }}>
                          <Link href={`/blog/${slug}`} className="btn btn-ghost" style={{ color: 'var(--navy)', borderColor: 'var(--navy)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Read Article →</Link>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })
              )}
            </StaggerContainer>

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Link 
                      key={pageNum} 
                      href={`/blog?page=${pageNum}`}
                      className={`btn ${page === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                      style={page === pageNum ? { padding: '0.5rem 1rem', minWidth: '40px', justifyContent: 'center' } : {
                        padding: '0.5rem 1rem', 
                        minWidth: '40px', 
                        justifyContent: 'center',
                        borderColor: 'var(--line-light)',
                        color: 'var(--ink)'
                      }}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </FadeUp>
      </section>
    </>
  );
}
