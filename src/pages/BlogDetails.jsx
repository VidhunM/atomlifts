
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ChevronLeft, Share2, Mail, Globe, MessageSquare, ArrowRight } from 'lucide-react';
import blog1 from '../assets/blog-1.png';
import blog2 from '../assets/blog-2.png';
import blog3 from '../assets/blog-3.png';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

const blogPosts = [
  {
    id: 1,
    title: "Innovations in Vertical Mobility for 2025",
    date: "20 Jun 2025",
    author: "Eng. Vikram Seth",
    readTime: "8 min read",
    img: blog1,
    category: "Technology",
    content: `
      <p>The landscape of vertical mobility is shifting beneath our feet—quite literally. As we move into 2025, the elevator industry is undergoing a revolution driven by artificial intelligence, magnetic propulsion, and sustainable engineering.</p>
      
      <h4>AI-Driven Dispatch Systems</h4>
      <p>Traditional elevator systems operate on simple logic. However, the next generation of lifts uses predictive analytics to anticipate passenger flow. By analyzing historical data and real-time movement within a building, these systems reduce wait times by up to 40%.</p>
      
      <blockquote>
        "The future of elevators isn't just about moving up and down; it's about moving people through their lives with zero friction."
      </blockquote>

      <h4>Magnetic Levitation (Maglev) Technology</h4>
      <p>Perhaps the most exciting development is the shift away from cables. Multiple elevator cabins can now operate in a single shaft using magnetic tracks, similar to high-speed trains. This allows for both vertical and horizontal movement, opening up new architectural possibilities for "mega-tall" buildings.</p>
      
      <p>Sustainability is also at the forefront. New regenerative drives now capture the energy generated during descent and feed it back into the building's electrical grid, making the modern elevator a net contributor to energy efficiency.</p>
    `
  },
  {
    id: 2,
    title: "The Science Behind High-Rise Cable Tension",
    date: "19 Jun 2025",
    author: "Dr. Sarah Mitchell",
    readTime: "12 min read",
    img: blog2,
    category: "Engineering",
    content: `
      <p>Engineering for high-rise buildings presents unique challenges, particularly when it comes to the physics of vertical transport. The longer the cable, the more complex the dynamics of tension and oscillation become.</p>
      
      <h4>Material Science Breakthroughs</h4>
      <p>The industry is moving from traditional steel ropes to carbon-fiber based cables like 'UltraRope'. These materials are incredibly light, which significantly reduces the energy required to pull the elevator up, while also minimizing the sway caused by wind in super-tall structures.</p>
      
      <h4>Dynamic Tension Management</h4>
      <p>Modern sensors now monitor cable health in real-time, detecting microscopic fatigue before it becomes a safety concern. This predictive maintenance approach is saving building owners millions in potential downtime.</p>
    `
  },
  {
    id: 3,
    title: "Eco-Friendly Escalator Solutions for Modern Hubs",
    date: "18 Jun 2025",
    author: "Alex Rivera",
    readTime: "6 min read",
    img: blog3,
    category: "Sustainability",
    content: `
      <p>Escalators are the workhorses of public infrastructure, but they have traditionally been energy-intensive. Modern engineering is changing that narrative with "On-Demand" mobility solutions.</p>
      
      <h4>Smart Sensors and Variable Speed</h4>
      <p>By implementing advanced optical sensors, escalators now slow down or come to a complete stop when no passengers are detected. This "Standby Mode" can reduce power consumption by as much as 60% in low-traffic areas like transit hubs during off-peak hours.</p>
      
      <h4>Lubrication-Free Chains</h4>
      <p>New mechanical designs utilize self-lubricating materials, eliminating the need for thousands of liters of oil over the machine's lifetime. This not only reduces maintenance costs but also prevents environmental contamination.</p>
    `
  }
];

const BlogDetails = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => slugify(p.title) === slug) || blogPosts[0];

  return (
    <div className="blog-details-page bg-dark min-vh-100 pb-5">
      {/* Cinematic Hero Header */}
      <section className="blog-detail-hero position-relative overflow-hidden">
        <div className="detail-hero-img-wrapper">
          <img src={post.img} alt={post.title} className="detail-hero-img" />
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
                <div className="d-flex align-items-center"><Calendar size={16} className="me-2 text-primary" /> {post.date}</div>
                <div className="d-flex align-items-center"><User size={16} className="me-2 text-primary" /> {post.author}</div>
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

            {/* Sidebar / Related */}
            <div className="col-lg-3 offset-lg-1 mt-5 mt-lg-0">
              <div className="sidebar-sticky pt-lg-5">
                <h5 className="text-white fw-900 mb-4 tracking-widest small uppercase">Latest Insights</h5>
                <div className="d-flex flex-column gap-4">
                  {blogPosts.filter(p => p.id !== post.id).map(related => (
                    <Link key={related.id} to={`/blog/${slugify(related.title)}`} className="related-post-card text-decoration-none group">
                      <div className="mb-2 overflow-hidden rounded">
                        <img src={related.img} alt="" className="w-100 h-100 object-fit-cover transition-all" style={{ height: '120px' }} />
                      </div>
                      <h6 className="text-white mb-1 fw-bold small leading-tight group-hover:text-primary transition-all">{related.title}</h6>
                      <span className="text-white-50 extra-small">{related.date}</span>
                    </Link>
                  ))}
                </div>

                <div className="cta-box-sidebar mt-5 p-4 rounded bg-primary text-dark">
                  <h6 className="fw-900 mb-3">Need Engineering Solutions?</h6>
                  <p className="small mb-4 opacity-80">Consult with our specialists for high-end vertical mobility systems.</p>
                  <Link to="/contact" className="btn btn-dark w-100 rounded-0 fw-bold small">Contact Us</Link>
                </div>
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

        .related-post-card:hover h6 {
          color: var(--primary);
        }

        .related-post-card img:hover {
          transform: scale(1.05);
        }

        .extra-small { font-size: 0.7rem; }
        
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
