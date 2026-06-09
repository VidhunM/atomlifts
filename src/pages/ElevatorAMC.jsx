import React, { useEffect } from 'react';
import { ShieldAlert, CheckSquare, Zap, Clock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ElevatorAMC = () => {
  useEffect(() => {
    document.title = "Elevator AMC Services | Annual Maintenance Contracts | Atom Lifts";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Atom Lifts provides premium elevator AMC (Annual Maintenance Contract) services. Minimize downtime, ensure passenger safety, and extend your elevator lifespan.');
    }
  }, []);

  return (
    <div className="elevator-amc bg-dark min-vh-100 pb-5 text-white">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '500px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small d-flex align-items-center gap-2">
                <Clock size={16} /> 24/7 Maintenance & Safety Support
              </h6>
              <h1 className="display-4 fw-900 mb-4">
                ELEVATOR <span className="text-primary">AMC SERVICES</span>
              </h1>
              <p className="text-white-50 lead mb-5">
                Preventative maintenance is the key to elevator longevity. Atom Lifts offers flexible, affordable, and highly structured Annual Maintenance Contracts (AMC) to keep your lifts running safely and without interruption.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Get Maintenance Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our AMC */}
      <section className="py-5 container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-900">Preventative Care For <span className="text-primary">Zero Breakdown Uptime</span></h2>
          <p className="text-secondary max-w-600 mx-auto mt-2">
            Minimize emergency breakdown calls and protect your building occupants with certified safety audits and regular inspection logs.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              title: "Certified Safety Audits",
              desc: "Every contract includes monthly checklist audits checking safety gear, ropes, emergency brakes, and door locks.",
              icon: <ShieldCheck size={30} />
            },
            {
              title: "24/7 Priority Callouts",
              desc: "In case of passenger entrapment or sudden breakdown, our dedicated response team reaches your location in less than 30 minutes.",
              icon: <Clock size={30} />
            },
            {
              title: "Genuine Spare Parts",
              desc: "We stock, manage, and replace only OEM-certified spare parts to preserve elevator design parameters and structural safety.",
              icon: <Zap size={30} />
            },
            {
              title: "Digital Maintenance Logs",
              desc: "Track every technician checkup, diagnostic report, and spare part replacement in real time through our digitized portal.",
              icon: <CheckSquare size={30} />
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

      {/* AMC Contract Tiers */}
      <section className="py-5 bg-dark-lighter">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-900 text-white">Select the Right <span className="text-primary">AMC Plan</span></h2>
            <p className="text-secondary max-w-600 mx-auto mt-2">We offer flexible AMC tiers designed to fit residential buildings, commercial spaces, and industrial sites.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              {
                title: "Standard AMC (Semi-Comprehensive)",
                desc: "Ideal for residential apartments and villa lifts looking for reliable routine checkups at competitive pricing.",
                features: ["Monthly regular checkups & lubes", "24/7 Breakdown emergency service", "Safety gear audit once a year", "Labor charges included, parts chargeable"]
              },
              {
                title: "Comprehensive AMC",
                desc: "Complete peace of mind. Covers everything from monthly visits to major component replacements without extra costs.",
                features: ["Monthly regular checkups & lubes", "24/7 Emergency response under 30 mins", "Comprehensive part replacements (controller, ropes)", "Annual safety load test & certification"]
              }
            ].map((plan, idx) => (
              <div className="col-lg-5" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="card h-100 bg-dark border-secondary p-4 shadow-lg">
                  <h3 className="text-white fw-bold mb-2">{plan.title}</h3>
                  <p className="text-white-50 small mb-4">{plan.desc}</p>
                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="d-flex align-items-center gap-2 mb-2 text-white-50 small">
                        <CheckSquare size={16} className="text-primary" /> {feat}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn-outline-premium w-100 text-center py-2.5 text-decoration-none rounded font-bold">
                    Inquire for Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 container">
        <div className="glass-card-dark p-5 text-center position-relative border border-primary border-opacity-25" data-aos="fade-up">
          <h2 className="display-6 fw-900 text-white mb-3">Is your elevator safety certificate expiring?</h2>
          <p className="text-white-50 mb-4 max-w-600 mx-auto">
            Contact us today to schedule a detailed safety health checkup of your elevator shaft, ropes, and traction machines.
          </p>
          <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
            Book Safety Audit <ArrowRight className="ms-2" size={20} />
          </Link>
        </div>
      </section>

      <style>{`
        .bg-dark-lighter { background: #0c111e; }
        .feature-card-premium { transition: all 0.3s ease; }
        .feature-card-premium:hover { border-color: var(--primary) !important; transform: translateY(-5px); }
        .btn-outline-premium {
          border: 1px solid var(--primary); color: var(--primary);
          transition: all 0.3s ease;
        }
        .btn-outline-premium:hover {
          background: var(--primary); color: #000;
        }
        .font-bold { font-weight: 700; }
      `}</style>
    </div>
  );
};

export default ElevatorAMC;
