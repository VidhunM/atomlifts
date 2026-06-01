import React from 'react';
import { Factory, Users, Zap, Settings, ShieldCheck, PenTool } from 'lucide-react';

const WhyChoose = () => {
  const reasons = [
    {
      icon: <Factory size={32} />,
      title: "Own Manufacturing",
      desc: "In-house production facility ensuring superior quality control and timely delivery of precision components."
    },
    {
      icon: <Users size={32} />,
      title: "Experienced Engineers",
      desc: "A team of highly skilled vertical mobility specialists with decades of combined industry expertise."
    },
    {
      icon: <Zap size={32} />,
      title: "Fast Breakdown Support",
      desc: "Rapid response service network available 24/7 to minimize downtime and restore operations swiftly."
    },
    {
      icon: <Settings size={32} />,
      title: "Custom Lift Solutions",
      desc: "Tailor-made designs that perfectly adapt to your building's architectural and functional requirements."
    },
    {
      icon: <PenTool size={32} />,
      title: "AMC & Modernization",
      desc: "Comprehensive maintenance and upgrade services to extend equipment life and enhance performance."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Safety Certified Components",
      desc: "Strict adherence to international safety standards with 100% certified and rigorously tested parts."
    }
  ];

  return (
    <section className="why-choose-section py-4 bg-dark-lighter">
      <div className="container py-3">
        <div className="text-center mb-4" data-aos="fade-up">
          {/* <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3">THE ATOM ADVANTAGE</h6> */}
          <h2 className="display-5 fw-800 text-dark">Why Choose <span className="text-primary">Atom Lifts</span></h2>
          <div className="mx-auto mt-2" style={{ width: '60px', height: '3px', background: 'var(--primary)' }}></div>
        </div>

        <div className="row g-4 mt-2">
          {reasons.map((reason, index) => (
            <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="reason-card h-100 p-4">
                <div className="reason-icon-wrapper mb-3">
                  {reason.icon}
                </div>
                <h4 className="fw-700 mb-2">{reason.title}</h4>
                <p className="text-muted mb-0 small">{reason.desc}</p>
                <div className="card-accent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-choose-section {
          position: relative;
          background-color: #F8FAFC;
        }

        .reason-card {
          background: white;
          border-radius: 4px;
          border: 1px solid rgba(0,0,0,0.05);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.02);
        }

        .reason-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(26, 54, 93, 0.08);
          border-color: rgba(26, 54, 93, 0.1);
        }

        .reason-icon-wrapper {
          width: 55px;
          height: 55px;
          background: rgba(26, 54, 93, 0.05);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: var(--transition);
        }

        .reason-icon-wrapper svg {
          width: 28px;
          height: 28px;
        }

        .reason-card:hover .reason-icon-wrapper {
          background: var(--primary);
          color: white;
          transform: rotateY(360deg);
        }

        .reason-card h4 {
          color: #0F172A;
          font-size: 1.15rem;
        }

        .reason-card p {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .card-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: var(--transition);
        }

        .reason-card:hover .card-accent {
          width: 100%;
        }

        @media (max-width: 991px) {
          .why-choose-section {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .display-5 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChoose;
