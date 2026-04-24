
import React from 'react';
import { CheckCircle2, Shield, Zap, Gauge, ArrowRight, Activity, Users, Layers, ZapIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import atlasMini from '../assets/images/atlas-mini.png';
import atlasPro from '../assets/images/atlas-pro.png';
import atlasMax from '../assets/images/atlas-max.png';
import heroImg from '../assets/hero-lift.png'; 

const PassengerLifts = () => {
  const liftModels = [
    {
      title: "Atlas Mini",
      subtitle: "Smooth, Safe & Efficient",
      desc: "Atom Atlas mini is a high-performance passenger lift designed to deliver smooth, safe, and efficient vertical transportation for residential and commercial buildings up to 30 meters travel (G+10 levels).",
      specs: [
        { label: "Travel Height", value: "Up to 30m (G+10)" },
        { label: "Speed", value: "0.7 - 1.5 m/s" },
        { label: "Capacity", value: "4-16 Passengers" },
        { label: "Drive", value: "Geared / Gearless" }
      ],
      img: atlasMini,
      tag: "Residential & Low-rise"
    },
    {
      title: "Atlas Pro",
      subtitle: "Premium Performance",
      desc: "Atom Atlas Pro represents the premium range of passenger elevators, designed for high-rise buildings demanding superior performance, safety, and comfort. Powered by advanced gearless technology.",
      specs: [
        { label: "Travel Height", value: "Up to 60 meters" },
        { label: "Speed", value: "1.50 - 2.00 m/s" },
        { label: "Capacity", value: "Up to 21 Passengers" },
        { label: "Drive", value: "Gearless Traction" }
      ],
      img: atlasPro,
      tag: "Premium High-rise",
      featured: true
    },
    {
      title: "Atlas Max",
      subtitle: "Ultimate High-Rise",
      desc: "Atom Atlas Max is the ultimate high-rise passenger lift, built to handle demanding traffic conditions with unmatched efficiency, reliability, and safety for towers up to 90 meters.",
      specs: [
        { label: "Travel Height", value: "Up to 90m (G+30)" },
        { label: "Speed", value: "2.50 - 4.0 m/s" },
        { label: "Capacity", value: "2100 kg Max" },
        { label: "Drive", value: "Gearless traction" }
      ],
      img: atlasMax,
      tag: "Corporate & Luxury"
    }
  ];

  return (
    <div className="passenger-lifts-page bg-dark min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Advanced Vertical Mobility</h6>
              <h1 className="huge-contact-title mb-4">
                PASSENGER <span className="text-primary">LIFTS</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Experience the perfect blend of engineering excellence and aesthetic design with our Atlas series passenger elevators.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Explore Solutions</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={heroImg} alt="Passenger Lift Hero" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Model Cards Section */}
      <section className="product-models py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">The Atlas Series</h6>
            <h2 className="display-5 fw-900 text-white mb-5">Engineering <span className="text-primary">Masterpieces</span></h2>
          </div>

          <div className="row g-4">
            {liftModels.map((model, i) => (
              <div className="col-lg-4" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className={`model-card-premium h-100 ${model.featured ? 'featured-model' : ''}`}>
                  <div className="model-img-wrapper overflow-hidden position-relative">
                    <img src={model.img} alt={model.title} className="model-img w-100" />
                    <div className="model-tag text-uppercase">{model.tag}</div>
                    <div className="model-img-overlay"></div>
                  </div>
                  <div className="model-content p-4">
                    <h3 className="text-white fw-800 mb-1">{model.title}</h3>
                    <p className="text-primary small fw-bold text-uppercase tracking-widest mb-3">{model.subtitle}</p>
                    <p className="text-white-50 small mb-4 line-clamp-3">{model.desc}</p>
                    
                    <div className="model-specs-grid pt-3 border-top border-white border-opacity-10">
                      {model.specs.map((spec, si) => (
                        <div key={si} className="d-flex justify-content-between mb-2">
                          <span className="text-white-50 tiny-text text-uppercase fw-bold">{spec.label}</span>
                          <span className="text-white small fw-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/contact" className="btn-outline-premium w-100 mt-4 text-decoration-none d-flex justify-content-center align-items-center gap-2">
                      Get Quotation <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="technical-features py-5 bg-dark-lighter mt-5">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Core Technologies</h6>
            <h2 className="display-5 fw-900 text-white mb-5">Built for <span className="text-primary">Reliability</span></h2>
          </div>
          <div className="row g-4">
            {[
              { title: "Advanced Traction", desc: "Energy-efficient gearless motors for silent and smooth operation.", icon: <ZapIcon size={30} /> },
              { title: "Smart Control", desc: "VVVF control systems for precise leveling and energy savings.", icon: <Settings size={30} /> },
              { title: "Safety First", desc: "Multiple safety sensors and emergency landing devices as standard.", icon: <Shield size={30} /> },
              { title: "High Capacity", desc: "Designed to handle high traffic volumes in peak hours effectively.", icon: <Users size={30} /> }
            ].map((feature, i) => (
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

      {/* CTA Section */}
      <section className="cta-section py-5 my-5">
        <div className="container">
          <div className="glass-card-dark p-5 text-center overflow-hidden position-relative" data-aos="zoom-in">
            <div className="position-relative z-10">
              <h2 className="display-5 fw-800 text-white mb-4">Elevate your building's standards</h2>
              <p className="text-white-50 mb-5 max-w-600 mx-auto">
                Our experts are ready to help you choose the perfect passenger lift for your project's specific needs.
              </p>
              <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
                Start Consultation <ArrowRight className="ms-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .passenger-lifts-page { background: #000000; }
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
        
        .glass-card-dark { background:#0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius:4px; }
        
        .model-card-premium {
          background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px; transition: 0.4s; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .model-card-premium:hover {
          transform: translateY(-10px); border-color: var(--primary);
        }
        .featured-model {
          border-color: rgba(248,192,45,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .model-img-wrapper {
          height: 250px;
        }
        .model-img {
          height: 100%; object-fit: cover; transition: 0.6s;
        }
        .model-card-premium:hover .model-img {
          transform: scale(1.1);
        }
        .model-tag {
          position: absolute; top: 20px; right: 20px;
          background: var(--primary); color: #000;
          padding: 4px 12px; font-size: 0.6rem; font-weight: 900;
          border-radius: 2px; z-index: 5;
        }
        .model-img-overlay {
          position: absolute; bottom: 0; left: 0; width: 100%; height: 50%;
          background: linear-gradient(to top, #0a0a0a, transparent);
        }
        
        .tiny-text { font-size: 0.65rem; letter-spacing: 0.05em; }
        .line-clamp-3 {
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
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
        
        .btn-outline-premium {
          border: 1px solid var(--primary); color: var(--primary);
          padding: 10px 20px; font-weight: 800; font-size: 0.8rem;
          text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s;
        }
        .btn-outline-premium:hover {
          background: var(--primary); color: #000;
        }

        .max-w-600 { max-width: 600px; }
        .max-w-400 { max-width: 400px; }
        
        @media (max-width: 991px) {
          .huge-contact-title { font-size: 3.5rem; }
          .about-hero-section { min-height: 400px !important; text-align: center; }
          .smoky-gradient-bg { background: rgba(26, 36, 54, 0.9); }
          .max-w-400 { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </div>
  );
};

export default PassengerLifts;
