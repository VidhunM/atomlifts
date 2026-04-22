
import { useState } from 'react';
import blogHero from '../assets/blog-hero.png';
import blog1 from '../assets/blog-1.png';
import blog2 from '../assets/blog-2.png';
import blog3 from '../assets/blog-3.png';

const blogPosts = [
  {
    id: 1,
    title: "Innovations in Vertical Mobility for 2025",
    date: "20 Jun",
    excerpt: "Explore the latest trends in high-speed elevator technology, from AI-driven dispatch systems to energy-efficient magnetic motors...",
    img: blog1
  },
  {
    id: 2,
    title: "The Science Behind High-Rise Cable Tension",
    date: "19 Jun",
    excerpt: "Understanding the physics of elevator mechanics ensures smoother rides and longer infrastructure life. Depth dive into rope dynamics...",
    img: blog2
  },
  {
    id: 3,
    title: "Eco-Friendly Escalator Solutions for Modern Hubs",
    date: "18 Jun",
    excerpt: "Sustainability meets accessibility. Discover how our latest escalator designs reduce power consumption by up to 40% using smart sensors...",
    img: blog3
  }
];

const Blog = () => {
  return (
    <div className="blog-page bg-dark min-vh-100 pb-5">
      {/* Blog Hero section - EXACTLY matching the provided image */}
      <section className="blog-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        {/* Smoky Gradient Background */}
        <div className="smoky-gradient-bg"></div>

        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h1 className="huge-contact-title mb-4">
                OUR <span className="text-primary">BLOG</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Precision Lift Engineering for Mapping, Inspections, and High Accuracy Vertical Mobility Data.
              </p>
            </div>
          </div>
        </div>

        {/* Right Corner Image */}
        <div className="blog-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img 
            src={blogHero} 
            alt="Engineering Specialists" 
            className="hero-clip-img" 
          />
        </div>
        
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="ticker-bar-yellow"></div>
            ))}
            {/* Duplicated for seamless loop */}
            {[...Array(100)].map((_, i) => (
              <div key={`dup-${i}`} className="ticker-bar-yellow"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid section - inspired by 2nd image */}
      <section className="blog-grid-section py-5">
        <div className="container">
          <div className="row g-4">
            {blogPosts.map((post, idx) => (
              <div className="col-lg-4 col-md-6" key={post.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="blog-card-new">
                  <div className="blog-img-wrapper position-relative overflow-hidden mb-4">
                    <img src={post.img} alt={post.title} className="blog-img w-100" />
                    <div className="blog-date-tag">
                      <span className="date-number">{post.date.split(' ')[0]}</span>
                      <span className="date-month">{post.date.split(' ')[1]}</span>
                    </div>
                  </div>
                  <div className="blog-body p-1">
                    <h4 className="text-white fw-bold mb-3 blog-title-hover">{post.title}</h4>
                    <p className="text-white-50 small leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .blog-hero-section {
          background: #1a2436;
          min-height: 550px;
        }

        .smoky-gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* Solid dark color on left, fading to transparent on right */
          background: linear-gradient(to right, #1a2436 0%, #1a2436 45%, transparent 85%);
          z-index: 2;
        }

        .blog-hero-image-overlay {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          z-index: 1;
        }

        .hero-clip-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.85);
        }

        .huge-contact-title {
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 900;
          color: white;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .yellow-ticker-right-aligned {
          position: absolute;
          bottom: 0px;
          right: 0;
          width: 60%; /* Occupies the right part */
          height: 40px;
          overflow: hidden;
          z-index: 10;
          mask-image: linear-gradient(to right, transparent, black 20%);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%);
        }

        .ticker-track-right {
          display: flex;
          gap: 15px;
          width: max-content;
          animation: tickerScrollSeamless 25s linear infinite;
        }

        .ticker-bar-yellow {
          width: 5px;
          height: 25px;
          background: #f8c02d;
          flex-shrink: 0;
        }

        @keyframes tickerScrollSeamless {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .blog-card-new {
          transition: transform 0.4s ease;
        }
        
        .blog-card-new:hover {
          transform: translateY(-10px);
        }

        .blog-img-wrapper {
          border-radius: 4px;
        }

        .blog-img {
          aspect-ratio: 4/3;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card-new:hover .blog-img {
          transform: scale(1.1);
        }

        .blog-date-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          background: var(--primary);
          color: var(--dark);
          padding: 10px 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 4px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .date-number {
          font-weight: 800;
          font-size: 1.5rem;
          line-height: 1;
        }

        .date-month {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .blog-title-hover {
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .blog-card-new:hover .blog-title-hover {
          color: var(--primary);
        }
        @media (max-width: 991px) {
          .huge-contact-title { font-size: 3.5rem; }
          .blog-hero-section { min-height: 400px !important; text-align: center; }
          .smoky-gradient-bg { background: rgba(26, 36, 54, 0.9); }
          .max-w-400 { margin-left: auto; margin-right: auto; }
          .yellow-ticker-right-aligned { width: 100%; mask-image: none; }
        }
        @media (max-width: 576px) {
          .huge-contact-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Blog;
