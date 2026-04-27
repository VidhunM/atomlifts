
import { CheckCircle2, Shield, Zap, Gauge, ArrowRight, Layout, Settings, Activity } from 'lucide-react';
import escalatorHero from '../assets/escalator-hero.png';
import { Link } from 'react-router-dom';

const Escalator = () => {
  const features = [
    {
      title: "Advanced Safety",
      desc: "Multi-layered safety sensors and emergency braking systems.",
      icon: <Shield size={30} />
    },
    {
      title: "Energy Efficient",
      desc: "VVVF drive technology reduces power consumption by up to 40%.",
      icon: <Zap size={30} />
    },
    {
      title: "Heavy Traffic",
      desc: "Built to withstand high-volume transit in airports and malls.",
      icon: <Gauge size={30} />
    },
    {
      title: "Quiet Operation",
      desc: "Precision-engineered chains and tracks for near-silent travel.",
      icon: <Activity size={30} />
    }
  ];

  return (
    <div className="escalator-page bg-dark min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Precision Engineering</h6>
              <h1 className="huge-contact-title mb-4">
                ESCALATOR <span className="text-primary">SYSTEMS</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Premium vertical transportation solutions designed for high-density commercial and public environments.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Get a Quote</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={escalatorHero} alt="Escalator Engineering" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Product Highlight Section (Matching the provided design) */}
      <section className="product-highlight py-5 my-lg-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="glass-card-dark p-2 overflow-hidden shadow-2xl position-relative">
                 <img src={escalatorHero} alt="Vertical Transport" className="w-100 rounded" style={{ objectFit: 'cover', minHeight: '500px' }} />
                 <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-10">
                    {/* Visual overlay element */}
                 </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="ps-lg-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Smooth, Safe & Reliable</h6>
                <h2 className="display-4 fw-800 text-white mb-4">Vertical <span className="text-primary">Transport</span></h2>
                <p className="text-white-50 mb-5 leading-relaxed fs-5">
                  Our escalators are designed to handle heavy foot traffic with maximum safety and efficiency. 
                  Built with advanced technology and durable materials, they ensure a seamless travel experience 
                  in malls, airports, metro stations, and commercial spaces. With energy-saving features and 
                  modern design, we deliver convenience that lasts.
                </p>
                
                <div className="feature-list-check pt-2">
                  {[
                    "High safety standards with advanced controls",
                    "Durable design for continuous operation",
                    "Energy-efficient and low-maintenance"
                  ].map((item, i) => (
                    <div className="d-flex align-items-center gap-3 mb-4" key={i}>
                      <div className="icon-circle-small">
                        <CheckCircle2 className="text-primary" size={20} />
                      </div>
                      <span className="text-white fw-medium fs-5">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Features Grid */}
      <section className="technical-features py-5 bg-dark-lighter">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Core Features</h6>
            <h2 className="display-5 fw-900 text-white mb-5">Engineered for <span className="text-primary">Performance</span></h2>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div className="col-lg-3 col-md-6" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="feature-card-premium p-4 h-100">
                  <div className="feature-icon-box mb-4">{feature.icon}</div>
                  <h4 className="text-white fw-bold mb-3">{feature.title}</h4>
                  <p className="text-white-50 small mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atom Escalators Detail Section */}
      <section className="atom-escalator-detail py-5 my-lg-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="display-5 fw-800 text-white mb-4">Atom <span className="text-primary">Escalators</span></h2>
              <div className="detail-text-box ps-4 border-start border-primary border-4">
                <p className="text-white-50 fs-5 leading-relaxed mb-4">
                  The <span className="text-white fw-bold">Atom Escalators</span> from Atom Lifts India Pvt Ltd are 
                  designed to deliver seamless vertical movement for commercial complexes, malls, metro stations, 
                  airports, and corporate spaces. Built to <span className="text-primary fw-bold">IS & EN Norms</span>, 
                  these escalators ensure maximum safety, durability, and comfort while maintaining a sleek and 
                  modern design that complements any architecture.
                </p>
                <p className="text-white-50 fs-5 leading-relaxed">
                  With advanced <span className="text-white fw-bold">microprocessor-based control</span>, energy-efficient 
                  drive systems, and anti-slip step technology, Atom Escalators provide smooth, quiet, and reliable 
                  performance — ideal for high-traffic public environments.
                </p>
              </div>
            </div>

            <div className="col-lg-5" data-aos="fade-left">
              <div className="glass-card-dark p-4 p-md-5 shadow-2xl">
                <h4 className="text-primary text-uppercase tracking-widest fw-800 mb-4 small">Technical Specifications</h4>
                <div className="specs-table">
                  {[
                    { label: "Speed", value: "0.5 m/s" },
                    { label: "Inclination", value: "30° or 35°" },
                    { label: "Step Width", value: "600 / 800 / 1000 mm" },
                    { label: "Drive Type", value: "VVVF Controlled" },
                    { label: "Power Supply", value: "3-Phase, 415V AC" },
                    { label: "Compliance", value: "IS & EN NORMS Certified" }
                  ].map((spec, i) => (
                    <div key={i} className="d-flex justify-content-between py-3 border-bottom border-white border-opacity-10">
                      <span className="text-white-50 small text-uppercase fw-bold">{spec.label}</span>
                      <span className="text-primary fw-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 my-5">
        <div className="container">
          <div className="glass-card-dark p-5 text-center overflow-hidden position-relative" data-aos="zoom-in">
            <div className="position-relative z-10">
              <h2 className="display-5 fw-800 text-white mb-4">Ready to upgrade your infrastructure?</h2>
              <p className="text-white-50 mb-5 max-w-600 mx-auto">
                Contact our engineering team today for a comprehensive site analysis and custom escalator proposal.
              </p>
              <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
                Start Consultation <ArrowRight className="ms-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .glass-card-dark { background:#0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius:4px; }
        .icon-circle-small {
          width: 35px; height: 35px; background: rgba(248,192,45,0.1);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .feature-card-premium {
          background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px; transition: 0.4s;
        }
        .feature-card-premium:hover {
          transform: translateY(-10px); border-color: var(--primary);
          background: rgba(248,192,45,0.02);
        }
        .feature-icon-box { color: var(--primary); }
      `}</style>
    </div>
  );
};

export default Escalator;
