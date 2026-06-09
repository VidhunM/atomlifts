import React, { useEffect } from 'react';
import { Activity, ShieldCheck, Heart, Clock, ArrowRight, CheckSquare, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const HospitalLiftInstallation = () => {
  useEffect(() => {
    document.title = "Hospital Lift Installation | Stretcher & Bed Elevators | Atom Lifts";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Atom Lifts installs high-performance, certified hospital lifts. Stretcher and bed elevators engineered with smooth travel curves, hygiene-focused steel, and ARD backup.');
    }
  }, []);

  return (
    <div className="hospital-lift-installation bg-dark min-vh-100 pb-5 text-white">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '500px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small d-flex align-items-center gap-2">
                <PlusSquare size={16} /> Certified Medical Mobility Solutions
              </h6>
              <h1 className="display-4 fw-900 mb-4">
                HOSPITAL LIFT <span className="text-primary">INSTALLATION</span>
              </h1>
              <p className="text-white-50 lead mb-5">
                Critical care demands engineering perfection. Atom Lifts specializes in hospital elevator design and installation. Our stretcher and bed elevators feature ultra-smooth vertical travel curves, spacious cabins, and fail-safe safety backups.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Consult Medical Lift Specialist</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Care Specs */}
      <section className="py-5 container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-900">Engineered for Safe <span className="text-primary">Patient Transportation</span></h2>
          <p className="text-secondary max-w-600 mx-auto mt-2">
            Every medical elevator is designed to handle stretchers, hospital beds, wheelchairs, and sensitive clinical diagnostic equipment.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              title: "Jerk-Free Smooth Ride",
              desc: "Driven by advanced VVVF controllers ensuring gradual acceleration, minimal decibel noise levels, and zero landing bumps.",
              icon: <Activity size={30} />
            },
            {
              title: "Antibacterial Interiors",
              desc: "Cabin walls built using certified hygienic stainless steel panels that are easy to clean, sterilize, and disinfect.",
              icon: <Heart size={30} />
            },
            {
              title: "Power Fail-Safe Backup",
              desc: "Includes high-capacity Automatic Rescue Devices (ARD) and mechanical emergency valve systems to handle hospital blackouts.",
              icon: <ShieldCheck size={30} />
            },
            {
              title: "Extended Door Hold Time",
              desc: "Equipped with light-ray screens and smart sensors to prevent premature door closing while transporting patients.",
              icon: <Clock size={30} />
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

      {/* Technical Standards Table */}
      <section className="py-5 bg-dark-lighter">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-2 small">Regulatory Compliance</h6>
              <h2 className="fw-900 mb-4 text-white">Hospital Elevator Dimensions & Specs</h2>
              <p className="text-white-50 mb-4">
                We manufacture and install hospital elevators complying strictly with national building code (NBC) dimensions for medical stretcher access.
              </p>
              <ul className="list-unstyled">
                {['Spacious interior cabins capable of accommodating standard stretchers and oxygen cylinders', 'Option for center opening or two-speed telescopic doors', 'Smooth landing accuracy within ±2mm to facilitate bump-free bed transfer', 'Advanced dispatch override for medical emergencies'].map((feat, idx) => (
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
                      <th className="text-primary text-uppercase small">Feature</th>
                      <th className="text-primary text-uppercase small">Standard Class</th>
                      <th className="text-primary text-uppercase small">Stretcher Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Capacity (kg)</td>
                      <td>1020 kg (15 Passengers)</td>
                      <td>1360 kg to 2000 kg</td>
                    </tr>
                    <tr>
                      <td>Clear Cabin Size</td>
                      <td>1000mm x 2400mm</td>
                      <td>1300mm x 2400mm</td>
                    </tr>
                    <tr>
                      <td>Min Door Opening</td>
                      <td>900mm wide</td>
                      <td>1200mm to 1500mm wide</td>
                    </tr>
                    <tr>
                      <td>Door Type</td>
                      <td>Telescopic Sliding</td>
                      <td>Telescopic / Center Opening</td>
                    </tr>
                    <tr>
                      <td>Control System</td>
                      <td>VVVF Closed Loop</td>
                      <td>VVVF Closed Loop (Full Collective)</td>
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
          <h2 className="display-6 fw-900 text-white mb-3">Looking to install a hospital stretcher elevator?</h2>
          <p className="text-white-50 mb-4 max-w-600 mx-auto">
            Get in touch with our medical facility consulting division to receive CAD shaft blueprints, load analysis, and regulatory design layouts.
          </p>
          <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
            Consult Design Engineer <ArrowRight className="ms-2" size={20} />
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

export default HospitalLiftInstallation;
