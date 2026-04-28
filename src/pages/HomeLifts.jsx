
import { CheckCircle2, Shield, Zap, Gauge, ArrowRight, Layout, Settings, Activity, Smartphone, Volume2, X, Info, Search } from 'lucide-react';
import { useState } from 'react';
import homeLiftHero from '../assets/images/home_lift.png';
import logoImg from '../assets/images/ATOM-Logo02.png';
import zen1 from '../assets/project1.png';
import zen2 from '../assets/service2.png';
import zen3 from '../assets/project3.png';
import zen4 from '../assets/val-4.png';
import { Link } from 'react-router-dom';

const HomeLifts = () => {
  const [selectedZen, setSelectedZen] = useState(null);

  const zenSeries = [
    {
      id: "100",
      name: "Zen 100",
      tagline: "Compact. Safe. Elegant.",
      image: zen1,
      desc: "A premium home elevator solution designed specifically for compact residential spaces.",
      longDesc: "The Atom Zen 100 is our most space-conscious model, perfect for existing homes where space is at a premium. It features a unique drum motor traction system that eliminates the need for a large machine room.",
      features: [
        "Minimal shaft space (1000x1000 mm)",
        "Just 800 mm pit depth",
        "Manual full-vision swing doors",
        "Quiet drum motor traction system"
      ],
      specs: {
        capacity: "250kg",
        stops: "Up to 3",
        speed: "0.3 m/s",
        drive: "Drum Traction"
      }
    },
    {
      id: "200",
      name: "Zen 200",
      tagline: "Vertical Living Redefined.",
      image: zen2,
      desc: "Tailored for G+3 villas and independent residences with automated doors.",
      longDesc: "Zen 200 brings the convenience of a commercial elevator into the comfort of your home. With fully automated telescopic doors and advanced safety sensors.",
      features: [
        "Designed for homes with up to 4 stops",
        "Fits into smaller shafts",
        "Custom design finishes",
        "AI-enabled controller"
      ],
      specs: {
        capacity: "320kg - 400kg",
        stops: "Up to 5",
        speed: "0.4 m/s",
        drive: "Traction VVVF"
      }
    },
    {
      id: "300",
      name: "Zen 300",
      tagline: "Premium Luxury Living.",
      image: zen3,
      desc: "The most powerful and spacious home elevator in the Zen Series for luxury bungalows.",
      longDesc: "Our flagship gearless model, the Zen 300, offers the smoothest and most energy-efficient ride in the industry with future-ready technology.",
      features: [
        "Spacious cabins and silent gearless rides",
        "Full-glass customization",
        "IoT-enabled & AI controlled",
        "Priority installation"
      ],
      specs: {
        capacity: "450kg+",
        stops: "Up to 7",
        speed: "0.5 m/s",
        drive: "Gearless MRL"
      }
    },
    {
      id: "400",
      name: "Zen 400",
      tagline: "Advanced Vacuum Tech.",
      image: zen4,
      desc: "A cutting-edge vacuum-style lift with a sleek cylindrical design and zero-shaft installation.",
      longDesc: "The Zen 400 uses revolutionary pneumatic technology. It requires no pit, no shaft, and no machine room, offering a panoramic cabin experience.",
      features: [
        "Modern vacuum lift technology",
        "Zero-shaft installation",
        "Fast & clean setup",
        "Panoramic cabin experience"
      ],
      specs: {
        capacity: "2 adults",
        stops: "Up to 4",
        speed: "0.2 m/s",
        drive: "Pneumatic/Vacuum"
      }
    }
  ];

  return (
    <div className="homelifts-page bg-dark min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-4 mb-lg-5 d-flex align-items-center">
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Residential Excellence</h6>
              <h1 className="huge-contact-title mb-4">
                ZEN SERIES <br/> <span className="text-primary">HOME LIFTS</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-500">
                Revolutionizing vertical mobility for modern homes with compact, elegant, and safe elevator solutions.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Request Brochure</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={homeLiftHero} alt="Home Lift Engineering" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Zen Series Gallery Row */}
      <section className="zen-series-gallery py-2">
        <div className="container-fluid px-lg-5">
          <div className="text-center mb-4" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-2 small">Zen Selection</h6>
            <h2 className="display-5 fw-900 text-white mb-1">The <span className="text-primary">Zen Collection</span></h2>
            <p className="text-white-50 small">Click any model for technical details and specifications</p>
          </div>

          <div className="row g-3 justify-content-center">
            {zenSeries.map((zen, i) => (
              <div className="col-lg-3 col-md-6" key={zen.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="zen-gallery-card cursor-pointer" onClick={() => setSelectedZen(zen)}>
                  <div className="zen-img-wrapper">
                    <img src={zen.image} alt={zen.name} className="zen-gallery-img" />
                    
                    {/* Logo Integrated into the design */}
                    <div className="zen-integrated-logo">
                       <img src={logoImg} alt="Atom" />
                       <div className="logo-line"></div>
                       <span>ZEN {zen.id}</span>
                    </div>

                    <div className="zen-gallery-overlay">
                       <div className="overlay-content">
                          <Search className="text-primary mb-2" size={30} />
                          <h5 className="text-white fw-900 mb-0">{zen.name}</h5>
                          <p className="text-primary extra-small tracking-widest uppercase fw-bold">View Specs</p>
                       </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                     <h6 className="text-white fw-800 mb-0">{zen.name}</h6>
                     <p className="text-white-50 extra-small mb-0">{zen.tagline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedZen && (
        <div className="zen-modal-overlay" onClick={() => setSelectedZen(null)}>
           <div className="zen-modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedZen(null)}><X /></button>
              <div className="row g-0 h-100">
                 <div className="col-lg-6 h-100 position-relative d-none d-lg-block">
                    <img src={selectedZen.image} alt={selectedZen.name} className="w-100 h-100 object-fit-cover" />
                    <div className="modal-brand-badge">
                       <img src={logoImg} alt="Atom Lifts" />
                       <h3 className="text-white fw-900 mt-2">ZEN SERIES</h3>
                    </div>
                 </div>
                 <div className="col-lg-6 h-100 overflow-y-auto">
                    <div className="p-4 p-md-5">
                       <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">{selectedZen.tagline}</h6>
                       <h2 className="display-4 fw-900 text-white mb-4">{selectedZen.name}</h2>
                       <p className="text-white-50 fs-5 mb-5">{selectedZen.longDesc}</p>
                       
                       <div className="specs-grid row g-3 mb-5">
                          {Object.entries(selectedZen.specs).map(([label, value]) => (
                             <div className="col-6" key={label}>
                                <div className="p-3 bg-white bg-opacity-5 rounded border border-white border-opacity-10">
                                   <div className="text-white-50 extra-small text-uppercase fw-bold mb-1 tracking-wider">{label}</div>
                                   <div className="text-primary fw-900">{value}</div>
                                </div>
                             </div>
                          ))}
                       </div>

                       <div className="mb-5">
                          <h5 className="text-white fw-bold mb-4 d-flex align-items-center gap-2">
                             <Settings className="text-primary" size={20} />
                             Core Features
                          </h5>
                          <div className="row g-3">
                             {selectedZen.features.map((feature, idx) => (
                                <div className="col-12" key={idx}>
                                   <div className="d-flex align-items-center gap-3">
                                      <CheckCircle2 className="text-primary" size={18} />
                                      <span className="text-white-50">{feature}</span>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="mt-5 d-grid gap-3">
                          <Link to="/contact" className="btn-premium py-3 text-center text-decoration-none" onClick={() => setSelectedZen(null)}>
                             Enquire Now <ArrowRight className="ms-2" size={18} />
                          </Link>
                          <button className="btn btn-outline-light py-3 text-uppercase small tracking-widest fw-bold" onClick={() => setSelectedZen(null)}>
                             Close Details
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section py-0 my-0 py-lg-5 my-lg-5">
        <div className="container">
          <div className="glass-card-dark p-3 p-lg-5 text-center overflow-hidden position-relative" data-aos="zoom-in">
            <div className="position-relative z-10">
              <h2 className="display-5 fw-800 text-white mb-2 mb-lg-4">Elevate Your Living Experience.</h2>
              <p className="text-white-50 mb-3 mb-lg-5 max-w-600 mx-auto">
                Consult with our residential specialists to find the perfect Zen Series lift for your home.
              </p>
              <div className="d-flex justify-content-center flex-wrap gap-4 gap-lg-5">
                <div className="text-center">
                   <div className="icon-badge-premium mb-3"><Smartphone size={24} /></div>
                   <div className="text-white small fw-bold uppercase">IoT Control</div>
                </div>
                <div className="text-center">
                   <div className="icon-badge-premium mb-3"><Shield size={24} /></div>
                   <div className="text-white small fw-bold uppercase">Safe Transit</div>
                </div>
                <div className="text-center">
                   <div className="icon-badge-premium mb-3"><Volume2 size={24} /></div>
                   <div className="text-white small fw-bold uppercase">Silent Drive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Gallery Card Styles */
        .zen-gallery-card { transition: transform 0.4s ease; }
        .zen-gallery-card:hover { transform: translateY(-8px); }
        .zen-img-wrapper { 
           position: relative; aspect-ratio: 1 / 1; border-radius: 4px; overflow: hidden;
           border: 1px solid rgba(255,255,255,0.05);
        }
        .zen-gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .zen-gallery-card:hover .zen-gallery-img { transform: scale(1.1); }
        
        .zen-integrated-logo {
           position: absolute; bottom: 0; left: 0; width: 100%;
           background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
           padding: 40px 20px 20px;
           display: flex; flex-direction: column; align-items: center; gap: 10px; z-index: 10;
        }
        .zen-integrated-logo img { height: 25px; filter: drop-shadow(0 0 10px var(--primary)); }
        .logo-line { width: 40px; height: 2px; background: var(--primary); box-shadow: 0 0 15px var(--primary); }
        .zen-integrated-logo span { color: white; font-weight: 900; font-size: 1rem; letter-spacing: 0.3em; text-shadow: 0 0 10px rgba(255,255,255,0.5); }

        .zen-gallery-overlay {
           position: absolute; top: 0; left: 0; width: 100%; height: 100%;
           background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
           display: flex; align-items: center; justify-content: center;
           opacity: 0; transition: all 0.4s ease;
        }
        .zen-gallery-card:hover .zen-gallery-overlay { opacity: 1; }
        .overlay-content { text-align: center; transform: translateY(20px); transition: all 0.4s ease; }
        .zen-gallery-card:hover .overlay-content { transform: translateY(0); }

        /* Modal Styles */
        .zen-modal-overlay {
           position: fixed; top:0; left:0; width:100%; height:100%;
           background: rgba(0,0,0,0.98); z-index: 9999;
           display: flex; align-items: center; justify-content: center;
           padding: 20px; backdrop-filter: blur(20px);
        }
        .zen-modal-content {
           background: #080808; width: 100%; max-width: 1300px;
           height: 90vh; border: 1px solid rgba(255,255,255,0.08);
           border-radius: 4px; position: relative; overflow: hidden;
        }
        .modal-close-btn {
           position: absolute; top: 25px; right: 25px;
           background: rgba(248, 192, 45, 0.1); border: 1px solid rgba(248, 192, 45, 0.2);
           color: var(--primary); width: 45px; height: 45px; border-radius: 50%;
           z-index: 100; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;
        }
        .modal-close-btn:hover { background: var(--primary); color: black; transform: rotate(90deg); }
        
        .modal-brand-badge {
           position: absolute; top: 40px; left: 40px;
           background: rgba(10,10,10,0.6); backdrop-filter: blur(10px);
           padding: 30px; border: 1px solid rgba(255,255,255,0.1);
           border-radius: 4px;
        }
        .modal-brand-badge img { height: 40px; }

        .icon-badge-premium {
           width: 60px; height: 60px; border: 1px solid rgba(248, 192, 45, 0.3);
           border-radius: 50%; display: flex; align-items: center; justify-content: center;
           color: var(--primary); margin: 0 auto; transition: 0.3s;
        }
        .glass-card-dark:hover .icon-badge-premium { background: var(--primary); color: black; }

        .extra-small { font-size: 0.65rem; }
        
        @media (min-width: 992px) {
          .about-hero-section { min-height: 650px; }
        }
        @media (max-width: 991px) {
          .about-hero-section { min-height: 400px; }
          .zen-img-wrapper { width: 100%; height: auto; aspect-ratio: 4/5; }
          .zen-modal-content { height: 95vh; overflow-y: auto; }
        }
      `}</style>
    </div>
  );
};

export default HomeLifts;
