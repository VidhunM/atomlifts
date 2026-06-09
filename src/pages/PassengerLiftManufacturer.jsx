import React, { useEffect } from 'react';
import { Settings, Shield, Award, Layers, ArrowRight, CheckCircle, Factory, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

const PassengerLiftManufacturer = () => {
  useEffect(() => {
    document.title = "Passenger Lift Manufacturer | Premium Elevator Factory | Atom Lifts";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Atom Lifts is a premium passenger lift manufacturer. We design and build energy-efficient gearless traction passenger elevators for commercial and high-rise residential projects.');
    }
  }, []);

  return (
    <div className="passenger-lift-manufacturer bg-dark min-vh-100 pb-5 text-white">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '500px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small d-flex align-items-center gap-2">
                <Factory size={16} /> Certified Manufacturing Facility
              </h6>
              <h1 className="display-4 fw-900 mb-4">
                PASSENGER LIFT <span className="text-primary">MANUFACTURER</span>
              </h1>
              <p className="text-white-50 lead mb-5">
                Atom Lifts stands as a pioneer in elevator manufacturing. We produce state-of-the-art geared and gearless traction passenger lifts using advanced robotics and German engineering standards.
              </p>
              <div className="d-flex gap-3">
                <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">Explore Manufacturing Capabilities</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Standards */}
      <section className="py-5 container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-900">Precision Manufacturing & <span className="text-primary">Engineering Excellence</span></h2>
          <p className="text-secondary max-w-600 mx-auto mt-2">
            Inside our modern production facility, safety and reliability are built into every single weld, sensor, and control panel.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              title: "Robot-Welded Frames",
              desc: "Ensures structural consistency and high fatigue strength for high-speed high-rise elevator chassis frameworks.",
              icon: <Settings size={30} />
            },
            {
              title: "Testing Tower Validation",
              desc: "Every new design model undergoes rigorous safety testing and ride quality analysis inside our multi-level vertical testing tower.",
              icon: <Layers size={30} />
            },
            {
              title: "ISO 9001 Compliance",
              desc: "Our production plant complies with strict international quality control and manufacturing safety standards.",
              icon: <Shield size={30} />
            },
            {
              title: "VVVF Control Intelligence",
              desc: "Advanced energy-saving controllers designed in-house, optimizing smooth acceleration curves and landing accuracies.",
              icon: <Award size={30} />
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

      {/* Manufacturing Capacities */}
      <section className="py-5 bg-dark-lighter">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-2 small">Versatile Product Line</h6>
              <h2 className="fw-900 mb-4 text-white">Advanced Lift Customization Options</h2>
              <p className="text-white-50 mb-4">
                We manufacture client-centric layouts to fit everything from low-rise flats to heavy-duty corporate commercial towers.
              </p>
              <ul className="list-unstyled">
                {['Custom cabin dimensions to match unique shafts', 'Stunning interior choices: Hairline Stainless Steel, Gold Mirror, Glass Panoramic', 'Eco-friendly PM Gearless Traction Machines (saves 40% energy)', 'Touchless COP panels and smart destination dispatch systems'].map((feat, idx) => (
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
                      <th className="text-primary text-uppercase small">Machine Class</th>
                      <th className="text-primary text-uppercase small">Max Capacity</th>
                      <th className="text-primary text-uppercase small">Max Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Residential Geared</td>
                      <td>4-10 Passengers (680 kg)</td>
                      <td>1.0 m/s</td>
                    </tr>
                    <tr>
                      <td>Commercial Gearless MRL</td>
                      <td>8-16 Passengers (1000 kg)</td>
                      <td>1.75 m/s</td>
                    </tr>
                    <tr>
                      <td>High-Rise Gearless</td>
                      <td>Up to 24 Passengers (1600 kg)</td>
                      <td>2.5 m/s - 4.0 m/s</td>
                    </tr>
                    <tr>
                      <td>Panoramic / Glass Cabin</td>
                      <td>6-15 Passengers (1020 kg)</td>
                      <td>1.5 m/s</td>
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
          <h2 className="display-6 fw-900 text-white mb-3">Partner with a Trusted Lift Manufacturer</h2>
          <p className="text-white-50 mb-4 max-w-600 mx-auto">
            Contact our structural engineers today to discuss technical layouts, shaft CAD designs, and manufacturing lead times.
          </p>
          <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
            Get Technical Quote <ArrowRight className="ms-2" size={20} />
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

export default PassengerLiftManufacturer;
