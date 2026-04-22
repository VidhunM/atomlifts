
import { CheckCircle2, Shield, Zap, Gauge, ArrowRight, Activity, Plane, TrainFront } from 'lucide-react';
import walkwayHero from '../assets/moving-walkway-hero.png';
import { Link } from 'react-router-dom';

const MovingWalkways = () => {
  const features = [
    {
      title: "Long Distance",
      desc: "Optimized for seamless transit across large terminals and hubs.",
      icon: <Plane size={30} />
    },
    {
      title: "Smart Control",
      desc: "Microprocessor-based systems for precise speed and safety.",
      icon: <Activity size={30} />
    },
    {
      title: "High Durability",
      desc: "Robust materials designed for 24/7 continuous operation.",
      icon: <Gauge size={30} />
    },
    {
      title: "Silent Motion",
      desc: "Advanced track engineering for a whisper-quiet passenger experience.",
      icon: <Zap size={30} />
    }
  ];

  return (
    <div className="walkway-page bg-dark min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Efficient Transit</h6>
              <h1 className="huge-contact-title mb-4">
                MOVING <span className="text-primary">WALKWAYS</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Effortless travel solutions for airports, metro stations, and large-scale commercial complexes.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Get a Quote</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={walkwayHero} alt="Moving Walkway Engineering" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="product-highlight py-5 my-lg-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="glass-card-dark p-2 overflow-hidden shadow-2xl position-relative">
                 <img src={walkwayHero} alt="Long Distance Travel" className="w-100 rounded" style={{ objectFit: 'cover', minHeight: '500px' }} />
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="ps-lg-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Effortless Travel for</h6>
                <h2 className="display-4 fw-800 text-white mb-4">Long <span className="text-primary">Distances</span></h2>
                <p className="text-white-50 mb-5 leading-relaxed fs-5">
                  Moving walkways are designed to make transportation faster and more convenient across airports, 
                  metro stations, shopping centers, and large commercial hubs. With smooth operation and robust 
                  safety features, they provide comfort and reliability for passengers and heavy luggage alike.
                </p>
                
                <div className="feature-list-check pt-2">
                  {[
                    "Comfortable travel over long distances",
                    "Strong build for continuous use",
                    "Safe, smooth, and low-maintenance design"
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

      {/* Atom Detail Section */}
      <section className="atom-detail py-5 my-lg-5 bg-dark-lighter">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h2 className="display-5 fw-800 text-white mb-4">Atom <span className="text-primary">Moving Walkways</span></h2>
              <div className="detail-text-box ps-4 border-start border-primary border-4">
                <p className="text-white-50 fs-5 leading-relaxed mb-4">
                  The <span className="text-white fw-bold">Atom Moving Walkway</span> from Atom Lifts India Pvt Ltd is a 
                  modern and efficient solution designed for airports, metro stations, malls, and large commercial 
                  complexes. Built to the highest <span className="text-primary fw-bold">IS & EN NORMS</span> standards, 
                  these systems provide safe, comfortable, and continuous horizontal or inclined movement for 
                  passengers, luggage, and trolleys.
                </p>
                <p className="text-white-50 fs-5 leading-relaxed">
                  Engineered for <span className="text-white fw-bold">durability and performance</span>, Atom Moving 
                  Walkways ensure quiet operation, low maintenance, and superior ride comfort, making them ideal for 
                  public spaces and long-distance passenger flow.
                </p>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div className="glass-card-dark p-4 p-md-5 shadow-2xl">
                <h4 className="text-primary text-uppercase tracking-widest fw-800 mb-4 small">Technical Specifications</h4>
                <div className="specs-table">
                  {[
                    { label: "Type", value: "Horizontal / Inclined (Up to 12°)" },
                    { label: "Speed", value: "0.5 – 0.75 m/s" },
                    { label: "Width", value: "800 / 1000 / 1200 mm" },
                    { label: "Drive System", value: "VVVF Controlled" },
                    { label: "Power Supply", value: "3-Phase, 415V AC" },
                    { label: "Compliance", value: "ISO 9001:2015 Certified" }
                  ].map((spec, i) => (
                    <div key={i} className="d-flex justify-content-between py-3 border-bottom border-white border-opacity-10">
                      <span className="text-white-50 small text-uppercase fw-bold">{spec.label}</span>
                      <span className="text-primary fw-bold text-end ms-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="technical-features py-5">
        <div className="container py-5">
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

      {/* CTA Section */}
      <section className="cta-section py-5 my-5">
        <div className="container">
          <div className="glass-card-dark p-5 text-center overflow-hidden position-relative" data-aos="zoom-in">
            <div className="position-relative z-10">
              <h2 className="display-5 fw-800 text-white mb-4">Streamline your passenger flow today.</h2>
              <p className="text-white-50 mb-5 max-w-600 mx-auto">
                Consult with our experts for custom horizontal transit solutions tailored to your facility.
              </p>
              <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
                Get Started Now <ArrowRight className="ms-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .walkway-page { background: #000000; }
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
        .feature-icon-box {
          color: var(--primary);
        }
        
        .max-w-600 { max-width: 600px; }
        
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

export default MovingWalkways;
