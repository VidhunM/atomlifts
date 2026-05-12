
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronLeft, Share2, Mail, Globe, MessageSquare, ArrowRight } from 'lucide-react';

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        const data = await response.json();
        const foundPost = data.find(p => p.slug === slug);
        
        if (foundPost) {
          const createdAtDate = new Date(foundPost.createdAt);
          setPost({
            ...foundPost,
            dateFormatted: `${createdAtDate.getDate()} ${createdAtDate.toLocaleString('default', { month: 'short' })} ${createdAtDate.getFullYear()}`
          });
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-dark min-vh-100 d-flex flex-column align-items-center justify-content-center text-white">
        <div className="spinner-border text-primary mb-3"></div>
        <p className="text-secondary">Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-dark min-vh-100 d-flex flex-column align-items-center justify-content-center text-white">
        <h2 className="mb-4">Article Not Found</h2>
        <Link to="/blog" className="btn btn-primary px-4 py-2">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page bg-dark min-vh-100 pb-5">
      {/* Cinematic Hero Header */}
      <section className="blog-detail-hero position-relative overflow-hidden">
        <div className="detail-hero-img-wrapper">
          <img src={post.imageUrl} alt={post.title} className="detail-hero-img" />
          <div className="detail-hero-overlay"></div>
        </div>

        <div className="container position-relative z-10 pt-150">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <Link to="/blog" className="back-link d-inline-flex align-items-center mb-4 text-primary text-decoration-none fw-bold">
                <ChevronLeft size={18} className="me-1" /> BACK TO INSIGHTS
              </Link>
              <div className="mb-4">
                <span className="category-badge">{post.category}</span>
              </div>
              <h1 className="display-3 fw-900 text-white mb-5 post-title-main">
                {post.title}
              </h1>
              <div className="d-flex flex-wrap gap-4 text-white-50 small fw-bold">
                <div className="d-flex align-items-center"><Calendar size={16} className="me-2 text-primary" /> {post.dateFormatted}</div>
                <div className="d-flex align-items-center"><User size={16} className="me-2 text-primary" /> {post.author?.name}</div>
                <div className="d-flex align-items-center"><Clock size={16} className="me-2 text-primary" /> {post.readTime}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="blog-content-section py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="blog-post-body text-white-50 fs-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>

              <hr className="my-5 border-white border-opacity-10" />

              {/* Share Section */}
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-white fw-bold">Share this article:</span>
                  <div className="d-flex gap-2">
                    <button className="share-btn"><Mail size={18} /></button>
                    <button className="share-btn"><Globe size={18} /></button>
                    <button className="share-btn"><MessageSquare size={18} /></button>
                    <button className="share-btn"><Share2 size={18} /></button>
                  </div>
                </div>
                <Link to="/contact" className="text-primary text-decoration-none fw-900 d-flex align-items-center gap-2">
                  GET EXPERT CONSULTATION <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .pt-150 { padding-top: 180px; }
        
        .blog-detail-hero {
          min-height: 80vh;
          display: flex;
          align-items: flex-end;
          padding-bottom: 80px;
        }

        .detail-hero-img-wrapper {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 1;
        }

        .detail-hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: brightness(0.4) saturate(0.8);
        }

        .detail-hero-overlay {
          position: absolute;
          bottom: 0; left: 0; width: 100%; height: 70%;
          background: linear-gradient(to top, var(--dark) 0%, transparent 100%);
        }

        .category-badge {
          background: var(--primary);
          color: var(--dark);
          padding: 6px 15px;
          font-weight: 900;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 2px;
        }

        .post-title-main {
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .blog-post-body h4 {
          color: white;
          font-weight: 800;
          margin-top: 40px;
          margin-bottom: 20px;
        }

        .blog-post-body p {
          margin-bottom: 25px;
          line-height: 1.8;
        }

        .blog-post-body blockquote {
          border-left: 4px solid var(--primary);
          padding: 30px;
          background: rgba(255, 255, 255, 0.03);
          color: white;
          font-style: italic;
          font-size: 1.4rem;
          margin: 40px 0;
          border-radius: 0 4px 4px 0;
        }

        .share-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: white;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }

        .share-btn:hover {
          background: var(--primary);
          color: var(--dark);
          border-color: var(--primary);
          transform: translateY(-3px);
        }

        @media (max-width: 991px) {
          .display-3 { font-size: 2.5rem !important; }
          .pt-150 { padding-top: 120px; }
          .blog-detail-hero { min-height: 60vh; }
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
