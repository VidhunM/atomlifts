
import React from 'react';
import { ArrowRight, Layout, MoveRight, Shield, Zap, Activity, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/images/escalators-main-hero.png';
import escalatorHero from '../assets/escalator-hero.png';
import walkwayHero from '../assets/moving-walkway-hero.png';

const EscalatorsHub = () => {
  const categories = [
    {
      title: "Escalators",
      path: "/escalators/standard",
      desc: "Premium vertical transportation for malls, airports, and commercial centers.",
      icon: <Layout size={40} />,
      img: escalatorHero,
      tag: "Standard Series"
    },
    {
      title: "Moving Walkways",
      path: "/escalators/moving-walkways",
      desc: "Efficient horizontal mobility for large transit hubs and airport terminals.",
      icon: <MoveRight size={40} />,
      img: walkwayHero,
      tag: "Transit Series"
    }
  ];

  return (
    <div className="escalators-hub bg-dark min-vh-100">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden d-flex align-items-center" style={{ minHeight: '600px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div className="col-lg-8" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">High-Traffic Transit</h6>
              <h1 className="huge-contact-title mb-4">
                ESCALATORS & <span className="text-primary">WALKWAYS</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-600">
                Precision-engineered horizontal and vertical transportation systems designed for heavy-duty public environments and modern commercial architecture.
              </p>
              <div className="d-flex gap-3">
                <a href="#explore" className="btn-premium px-5 py-3 text-decoration-none">Explore Models</a>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={heroImg} alt="Escalators Hub" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section id="explore" className="py-5 mt-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Transit Solutions</h6>
            <h2 className="display-4 fw-900 text-white">Advanced <span className="text-primary">Mobility</span></h2>
          </div>

          <div className="row g-4 justify-content-center">
            {categories.map((cat, i) => (
              <div className="col-lg-5 col-md-6" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <Link to={cat.path} className="category-card text-decoration-none d-block h-100">
                  <div className="card-img-wrapper overflow-hidden position-relative">
                    <img src={cat.img} alt={cat.title} className="card-img w-100 h-100 object-fit-cover" />
                    <div className="card-overlay"></div>
                    <div className="card-tag">{cat.tag}</div>
                    <div className="card-icon-floating">{cat.icon}</div>
                  </div>
                  <div className="card-body-premium p-4">
                    <h3 className="text-white fw-800 mb-3">{cat.title}</h3>
                    <p className="text-white-50 small mb-4">{cat.desc}</p>
                    <div className="d-flex align-items-center gap-2 text-primary fw-bold small text-uppercase tracking-widest">
                      Explore Series <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Factors Row */}
      <section className="py-5 bg-dark-lighter">
        <div className="container py-5">
          <div className="row g-4 text-center">
             {[
               { icon: <Shield className="text-primary" size={32}/>, title: "Multi-Level Safety", desc: "Equipped with emergency stops and step-gap sensors." },
               { icon: <Zap className="text-primary" size={32}/>, title: "Energy Saving", desc: "Auto-start/stop technology for reduced power idle." },
               { icon: <Activity className="text-primary" size={32}/>, title: "Silent Drive", desc: "Advanced chain and track systems for quiet operation." }
             ].map((f, i) => (
               <div className="col-md-4" key={i} data-aos="fade-up" data-aos-delay={i*100}>
                  <div className="p-4 border border-white border-opacity-5 rounded h-100">
                    <div className="mb-4">{f.icon}</div>
                    <h4 className="text-white fw-bold mb-3">{f.title}</h4>
                    <p className="text-white-50 small mb-0">{f.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <style>{`
        .escalators-hub { background: #000000; }
        .about-hero-section { background: #1a2436; }
        .smoky-gradient-bg {
          position: absolute; top:0; left:0; width:100%; height:100%;
          background: linear-gradient(to right, #1a2436 0%, #1a2436 45%, transparent 85%); z-index:2;
        }
        .about-hero-image-overlay { position:absolute; top:0; right:0; width:60%; height:100%; z-index:1; }
        .hero-clip-img { width:100%; height:100%; object-fit:cover; filter:brightness(0.85); }
        .huge-contact-title { font-size: clamp(3rem, 10vw, 6rem); font-weight:900; color:white; text-transform:uppercase;}
        
        .yellow-ticker-right-aligned {
          position:absolute; bottom:0; right:0; width:100%; height:40px; overflow:hidden; z-index:10;
          mask-image: linear-gradient(to right, transparent 50%, black 70%);
        }
        .ticker-track-right { display:flex; gap:15px; width:max-content; animation: tickerScrollSeamless 25s linear infinite; }
        .ticker-bar-yellow { width:5px; height:25px; background:#f8c02d; flex-shrink:0; }
        @keyframes tickerScrollSeamless { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .category-card { 
          background: #0a0a0a; 
          border: 1px solid rgba(255,255,255,0.05); 
          border-radius: 4px; 
          overflow: hidden; 
          transition: 0.4s;
        }
        .category-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
        }
        .card-img-wrapper { height: 300px; }
        .card-img { transition: 0.8s; }
        .category-card:hover .card-img { transform: scale(1.1); }
        .card-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to top, #0a0a0a, transparent);
        }
        .card-tag {
          position: absolute; top: 20px; right: 20px;
          background: var(--primary); color: black;
          font-size: 0.6rem; font-weight: 900; padding: 4px 12px;
          text-transform: uppercase; border-radius: 2px;
        }
        .card-icon-floating {
          position: absolute; bottom: 20px; right: 20px;
          color: var(--primary); opacity: 0.8;
        }
        .card-body-premium { border-top: 1px solid rgba(255,255,255,0.05); }
        .max-w-600 { max-width: 600px; }

        @media (max-width: 991px) {
          .huge-contact-title { font-size: 3.5rem; }
          .about-hero-section { min-height: 400px !important; text-align: center; }
          .smoky-gradient-bg { background: rgba(26, 36, 54, 0.9); }
          .max-w-600 { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </div>
  );
};

export default EscalatorsHub;
