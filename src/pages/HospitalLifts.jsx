
import React from 'react';
import { CheckCircle2, Shield, Zap, Gauge, ArrowRight, Activity, Users, Settings, HeartPulse, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/images/hospital-hero.png';

const HospitalLifts = () => {
  const liftModels = [
    {
      title: "Stretcher Lifts",
      subtitle: "Precision & Patient Care",
      desc: "Specially designed for hospitals and healthcare facilities, ensuring safe and comfortable transportation of patients on stretchers along with medical staff and equipment.",
      specs: [
        { label: "Travel Height", value: "Up to 30m (G+10)" },
        { label: "Speed", value: "0.75 – 1.0 m/s" },
        { label: "Capacity", value: "1000 – 1600 kg" },
        { label: "Compliance", value: "IS, EN & NABH" }
      ],
      img: heroImg, // Reusing hero for simplicity or can use specific
      tag: "Hospital Standard"
    },
    {
      title: "Bed Lifts",
      subtitle: "Silent & Smooth Mobility",
      desc: "Engineered for Multi-speciality hospitals and medical institutions, combining precision engineering and energy efficiency to deliver maximum reliability in critical environments.",
      specs: [
        { label: "Travel Height", value: "Up to 30m (G+10)" },
        { label: "Speed", value: "0.75 – 1.0 m/s" },
        { label: "Capacity", value: "13 – 21 Passengers" },
        { label: "Drive", value: "Gearless Traction" }
      ],
      img: heroImg,
      tag: "NABH Compliant",
      featured: true
    }
  ];

  return (
    <div className="product-page bg-dark min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Healthcare Mobility Solutions</h6>
              <h1 className="huge-contact-title mb-4">
                HOSPITAL <span className="text-primary">LIFTS</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Engineered for critical care environments, providing smooth, vibration-free, and reliable transportation for patients and medical staff.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Consult Experts</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={heroImg} alt="Hospital Lifts" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section className="product-models py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {liftModels.map((model, i) => (
              <div className="col-lg-5" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className={`model-card-premium h-100 ${model.featured ? 'featured-model' : ''}`}>
                  <div className="model-img-wrapper overflow-hidden position-relative">
                    <img src={model.img} alt={model.title} className="model-img w-100" />
                    <div className="model-tag text-uppercase">{model.tag}</div>
                    <div className="model-img-overlay"></div>
                  </div>
                  <div className="model-content p-4">
                    <h3 className="text-white fw-800 mb-1">{model.title}</h3>
                    <p className="text-primary small fw-bold text-uppercase tracking-widest mb-3">{model.subtitle}</p>
                    <p className="text-white-50 small mb-4">{model.desc}</p>
                    <div className="model-specs-grid pt-3 border-top border-white border-opacity-10">
                      {model.specs.map((spec, si) => (
                        <div key={si} className="d-flex justify-content-between mb-2">
                          <span className="text-white-50 tiny-text text-uppercase fw-bold">{spec.label}</span>
                          <span className="text-white small fw-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="btn-outline-premium w-100 mt-4 text-decoration-none d-flex justify-content-center align-items-center gap-2">
                      Request Technical Data <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Specific Features */}
      <section className="technical-features py-5 bg-dark-lighter mt-5">
        <div className="container py-5">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Clinical Excellence</h6>
            <h2 className="display-5 fw-900 text-white mb-5">Designed for <span className="text-primary">Patient Care</span></h2>
          </div>
          <div className="row g-4">
            {[
              { title: "Vibration-Free", desc: "Advanced damping systems ensure zero-vibration travel for critical patients.", icon: <Activity size={30} /> },
              { title: "Hygienic Design", desc: "Anti-bacterial stainless steel finishes for easy sterilization.", icon: <Microscope size={30} /> },
              { title: "Emergency Priority", desc: "Integrated override controls for rapid emergency medical response.", icon: <HeartPulse size={30} /> },
              { title: "Precision Leveling", desc: "Accurate floor leveling within +/- 1mm for smooth stretcher transition.", icon: <Settings size={30} /> }
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
              <h2 className="display-5 fw-800 text-white mb-4">Supporting Lifesaving Infrastructure</h2>
              <p className="text-white-50 mb-5 max-w-600 mx-auto">
                Consult with our specialized healthcare engineers for customized hospital lift planning.
              </p>
              <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
                Start Consultation <ArrowRight className="ms-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .product-page { background: #000000; }
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
        .model-card-premium { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius: 4px; transition: 0.4s; overflow: hidden; display: flex; flex-direction: column; }
        .model-card-premium:hover { transform: translateY(-10px); border-color: var(--primary); }
        .featured-model { border-color: rgba(248,192,45,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .model-img-wrapper { height: 300px; }
        .model-img { height: 100%; object-fit: cover; transition: 0.6s; }
        .model-card-premium:hover .model-img { transform: scale(1.1); }
        .model-tag { position: absolute; top: 20px; right: 20px; background: var(--primary); color: #000; padding: 4px 12px; font-size: 0.6rem; font-weight: 900; border-radius: 2px; z-index: 5; }
        .model-img-overlay { position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, #0a0a0a, transparent); }
        .tiny-text { font-size: 0.65rem; letter-spacing: 0.05em; }
        .feature-card-premium { background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius: 4px; transition: 0.4s; }
        .feature-card-premium:hover { transform: translateY(-10px); border-color: var(--primary); background: rgba(248,192,45,0.02); }
        .feature-icon-box { color: var(--primary); }
        .btn-outline-premium { border: 1px solid var(--primary); color: var(--primary); padding: 10px 20px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; transition: 0.3s; }
        .btn-outline-premium:hover { background: var(--primary); color: #000; }
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

export default HospitalLifts;
