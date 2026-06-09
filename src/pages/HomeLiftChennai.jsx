import React, { useEffect } from 'react';
import { Shield, Home, Sparkles, HelpCircle, ArrowRight, CheckCircle, MapPin, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeLiftChennai = () => {
  useEffect(() => {
    document.title = "Home Lift Chennai | Premium Residential Elevators | Atom Lifts";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Looking for a home lift in Chennai? Atom Lifts offers state-of-the-art, compact, gearless, and glass residential elevators with zero headroom requirements.');
    }
  }, []);

  return (
    <div className="home-lift-chennai bg-dark min-vh-100 pb-5 text-white">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '500px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small d-flex align-items-center gap-2">
                <MapPin size={16} /> Chennai's Leading Residential Lift Brand
              </h6>
              <h1 className="display-4 fw-900 mb-4">
                HOME LIFTS <span className="text-primary">CHENNAI</span>
              </h1>
              <p className="text-white-50 lead mb-5">
                Elevate your luxury living in Chennai with Atom's ultra-compact, pitless, and premium home elevators. Specially engineered for modern apartments, independent villas, and penthouses.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Request Call back</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chennai Features */}
      <section className="py-5 container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-900">Why Atom Lifts is Chennai's <span className="text-primary">#1 Home Lift Choice</span></h2>
          <p className="text-secondary max-w-600 mx-auto mt-2">
            Tailored vertical mobility solutions designed to suit Chennai's unique architectural patterns, space limitations, and coastal weather conditions.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              title: "No Pit & No Headroom",
              desc: "Perfect for existing houses or new builds. Requires zero structural modification and fits easily inside a staircase landing or corner.",
              icon: <Home size={30} />
            },
            {
              title: "Coastal Anti-Corrosion Protection",
              desc: "Every lift installed in coastal Chennai regions (OMR, ECR, Besant Nagar) features marine-grade steel coatings resistant to sea-breeze corrosion.",
              icon: <Shield size={30} />
            },
            {
              title: "Power Efficient (Single Phase)",
              desc: "Consumes less power than a domestic air conditioner. Works seamlessly on domestic single-phase power supplies and home inverter systems.",
              icon: <Gauge size={30} />
            },
            {
              title: "Bespoke Glass Designs",
              desc: "Add aesthetic value to your interior with customizable premium finishes, panoramic glass walls, and touch-screen panels.",
              icon: <Sparkles size={30} />
            }
          ].map((item, idx) => (
            <div className="col-md-6 col-lg-3" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="feature-card-premium p-4 h-100 border border-secondary border-opacity-25 rounded bg-dark-lighter">
                <div className="text-primary mb-3">{item.icon}</div>
                <h4 className="fw-bold mb-3 text-white">{item.title}</h4>
                <p className="text-white-50 small mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-5 bg-dark-lighter">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-2 small">Engineered for Compact Spaces</h6>
              <h2 className="fw-900 mb-4 text-white">Smart Technical Specifications</h2>
              <p className="text-white-50 mb-4">
                Explore the technical capabilities that make our home lifts incredibly flexible to integrate, even in tight structural layouts.
              </p>
              <ul className="list-unstyled">
                {['Zero Pit & Zero Headroom Models', 'Advanced VVVF Drive for Jerk-Free Starts/Stops', 'Automatic Rescue Device (ARD) for power failures', 'Emergency mechanical lowering valve'].map((feat, idx) => (
                  <li key={idx} className="d-flex align-items-center gap-2 mb-2 text-white-50">
                    <CheckCircle size={18} className="text-primary" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="table-responsive border border-secondary rounded p-3 bg-dark">
                <table className="table table-dark table-hover mb-0">
                  <thead>
                    <tr>
                      <th className="text-primary text-uppercase small">Feature</th>
                      <th className="text-primary text-uppercase small">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Max Stops</td>
                      <td>Up to 6 Floors (G+5)</td>
                    </tr>
                    <tr>
                      <td>Capacity Range</td>
                      <td>250 kg to 400 kg (3 to 5 passengers)</td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td>0.15 m/s to 0.3 m/s</td>
                    </tr>
                    <tr>
                      <td>Drive System</td>
                      <td>Sleek Belt-Driven or Hydraulic Option</td>
                    </tr>
                    <tr>
                      <td>Min Cabin Dimension</td>
                      <td>800mm x 800mm (Highly Customizable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Areas Section */}
      <section className="py-5 container text-center">
        <div className="glass-card-dark p-5" data-aos="zoom-in">
          <h3 className="fw-800 mb-4">Active Installations Across Chennai</h3>
          <p className="text-white-50 mb-4 max-w-600 mx-auto">
            From luxury independent villas in **Adyar, ECR, and Anna Nagar** to modern apartments in **OMR, Velachery, and Tambaram**, we deliver reliable home lift solutions with 24/7 localized service centers.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {['Adyar', 'ECR', 'Anna Nagar', 'OMR', 'Velachery', 'Tambaram', 'Nungambakkam', 'Mylapore'].map((area, idx) => (
              <span key={idx} className="badge bg-secondary px-3 py-2 text-uppercase font-bold tracking-wider">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 container">
        <div className="glass-card-dark p-5 text-center position-relative border border-primary border-opacity-25" data-aos="fade-up">
          <h2 className="display-6 fw-900 text-white mb-3">Install a Premium Home Elevator Today</h2>
          <p className="text-white-50 mb-4 max-w-600 mx-auto">
            Speak to our Chennai-based design engineers to receive a free site inspection and customized cabin layout design.
          </p>
          <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
            Get Free Consultation <ArrowRight className="ms-2" size={20} />
          </Link>
        </div>
      </section>

      <style>{`
        .bg-dark-lighter { background: #0c111e; }
        .feature-card-premium { transition: all 0.3s ease; }
        .feature-card-premium:hover { border-color: var(--primary) !important; transform: translateY(-5px); }
        .font-bold { font-weight: 700; }
        .tracking-wider { letter-spacing: 0.1em; }
      `}</style>
    </div>
  );
};

export default HomeLiftChennai;
