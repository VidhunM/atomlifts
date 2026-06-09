import React, { useEffect } from 'react';
import { Layers, Shield, RefreshCw, Eye, ArrowRight, CheckSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiftModernization = () => {
  useEffect(() => {
    document.title = "Lift Modernization & Elevator Upgrades | Atom Lifts";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Is your old elevator noisy, slow, or frequently breaking down? Upgrade it with Atom Lifts modernization. Save energy, boost safety, and renew your cabin design.');
    }
  }, []);

  return (
    <div className="lift-modernization bg-dark min-vh-100 pb-5 text-white">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '500px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small d-flex align-items-center gap-2">
                <RefreshCw size={16} /> Restore & Revitalize Older Lifts
              </h6>
              <h1 className="display-4 fw-900 mb-4">
                LIFT <span className="text-primary">MODERNIZATION</span>
              </h1>
              <p className="text-white-50 lead mb-5">
                Don't replace the entire lift system. Atom Lifts specializes in partial and full elevator modernization. By upgrading key components like the controller, traction motor, and car interiors, you can bring old lifts back to brand-new standards at a fraction of the cost.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Request Site Inspection</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modernization Pillars */}
      <section className="py-5 container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-900">How We Upgrade Your <span className="text-primary">Old Elevator</span></h2>
          <p className="text-secondary max-w-600 mx-auto mt-2">
            Targeted upgrades addressing reliability, passenger safety, energy consumption, and visual design.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              title: "Smart Controller VVVF Upgrade",
              desc: "Replace obsolete relay boards with advanced microprocessors and VVVF drives for smooth starts, stops, and pinpoint leveling.",
              icon: <Layers size={30} />
            },
            {
              title: "Gearless Traction Retrofitting",
              desc: "Swap out energy-hungry geared motors with efficient PM Gearless machines. Reduces power consumption by up to 45% and eliminates gearbox noise.",
              icon: <Zap size={30} />
            },
            {
              title: "Safety Enhancement Pack",
              desc: "Integrate latest safety devices: Light curtain sensors, Automatic Rescue Device (ARD), emergency cabin lighting, and overload sensors.",
              icon: <Shield size={30} />
            },
            {
              title: "Luxury Cabin Makeover",
              desc: "Upgrade old wood or scratched metal cabin panelings with sleek steel mirrors, LED ceiling illuminations, and modern display indicators.",
              icon: <Eye size={30} />
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

      {/* Before / After Benefits */}
      <section className="py-5 bg-dark-lighter">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-2 small">Why Modernize?</h6>
              <h2 className="fw-900 mb-4 text-white">Compare The Benefits</h2>
              <p className="text-white-50 mb-4">
                Older elevators (10+ years old) often experience high failure rates, rough rides, and expensive electric bills. Here's what modernization improves:
              </p>
              <ul className="list-unstyled">
                {['Ride Comfort: Eliminates vibrations and alignment jerks', 'Waiting Time: Intelligent group controllers reduce wait by 30%', 'Energy Efficiency: Reclaims power with regenerative drives', 'Building Value: Upgraded lifts significantly raise property appeal'].map((feat, idx) => (
                  <li key={idx} className="d-flex align-items-center gap-2 mb-2 text-white-50">
                    <CheckSquare size={18} className="text-primary" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="table-responsive border border-secondary rounded p-3 bg-dark">
                <table className="table table-dark table-hover mb-0">
                  <thead>
                    <tr>
                      <th className="text-primary text-uppercase small">Metric</th>
                      <th className="text-danger text-uppercase small">Legacy Lift</th>
                      <th className="text-success text-uppercase small">Modernized Lift</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Leveling Accuracy</td>
                      <td>±15mm to ±25mm (Trip hazard)</td>
                      <td>±2mm to ±5mm (Perfect alignment)</td>
                    </tr>
                    <tr>
                      <td>Average Energy Cost</td>
                      <td>High (Geared Induction)</td>
                      <td>Save ~45% (PM Gearless MRL)</td>
                    </tr>
                    <tr>
                      <td>Safety Devices</td>
                      <td>Basic mechanical switch locks</td>
                      <td>Multi-sensor electronic nets + ARD</td>
                    </tr>
                    <tr>
                      <td>Noise Level</td>
                      <td>65-75 dB (Noisy machine room)</td>
                      <td>Below 48 dB (Whisper quiet)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 container">
        <div className="glass-card-dark p-5 text-center position-relative border border-primary border-opacity-25" data-aos="fade-up">
          <h2 className="display-6 fw-900 text-white mb-3">Schedule a free lift life-cycle assessment</h2>
          <p className="text-white-50 mb-4 max-w-600 mx-auto">
            Our diagnostic engineering team will visit your site, inspect your elevator components, and submit a detailed modernization recommendation report.
          </p>
          <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
            Request Assessment Report <ArrowRight className="ms-2" size={20} />
          </Link>
        </div>
      </section>

      <style>{`
        .bg-dark-lighter { background: #0c111e; }
        .feature-card-premium { transition: all 0.3s ease; }
        .feature-card-premium:hover { border-color: var(--primary) !important; transform: translateY(-5px); }
      `}</style>
    </div>
  );
};

export default LiftModernization;
