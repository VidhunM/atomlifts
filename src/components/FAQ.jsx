
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqData = [
  {
    question: "How often should an elevator be serviced?",
    answer: "Regular maintenance is crucial for safety and performance. Most elevators require inspection and servicing every 3 to 6 months depending on usage and local regulatory requirements."
  },
  {
    question: "Do you provide emergency repair support?",
    answer: "Yes, we offer 24/7 emergency repair support. Our rapid response team is always on standby to resolve any critical elevator issues or entrapment emergencies immediately."
  },
  {
    question: "Can you modernize old elevators instead of replacing them?",
    answer: "Absolutely. We provide elevator modernization solutions that upgrade safety features, improve performance, and extend the lifespan of your existing system without the need for a full replacement."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section bg-dark py-5 position-relative overflow-hidden">
      <div className="container py-5 position-relative z-10">
        <div className="row mb-5">
          <div className="col-lg-8" data-aos="fade-right">
            <div className="d-flex flex-column align-items-start mb-4">
              <div style={{ width: '50px', height: '4px', background: 'var(--primary)', marginBottom: '20px' }}></div>
              <h6 className="text-primary text-uppercase tracking-wide fw-bold small">Support & Care</h6>
            </div>
            <h2 className="display-4 fw-800 text-white mb-0">
              Most common <span className="text-primary">questions</span> about our services
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="faq-accordion-modern">
              {faqData.map((item, index) => (
                <div 
                  key={index} 
                  className={`faq-item-new ${openIndex === index ? 'active' : ''}`}
                >
                  <div 
                    className="faq-header-new d-flex justify-content-between align-items-center"
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  >
                    <div className="d-flex align-items-center gap-4">
                      <span className="faq-index text-primary fw-bold">0{index + 1}</span>
                      <h4 className="faq-question-new mb-0">{item.question}</h4>
                    </div>
                    <div className="faq-icon-new">
                       {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </div>
                  <div className={`faq-body-new ${openIndex === index ? 'show' : ''}`}>
                    <div className="faq-content-new">
                      <div className="faq-divider mb-3"></div>
                      <p className="mb-0">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          border-top: 1px solid var(--glass-border);
          padding-top: 100px !important;
          padding-bottom: 100px !important;
        }

        .faq-item-new {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          margin-bottom: 15px;
          border-radius: 4px;
          transition: var(--transition);
        }

        .faq-item-new:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(248, 192, 45, 0.3);
        }

        .faq-item-new.active {
          background: rgba(248, 192, 45, 0.03);
          border-color: var(--primary);
        }

        .faq-header-new {
          padding: 25px 35px;
          cursor: pointer;
        }

        .faq-index {
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          opacity: 0.6;
        }

        .faq-question-new {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .faq-icon-new {
          color: var(--primary);
        }

        .faq-body-new {
          max-height: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .faq-body-new.show {
          max-height: 500px;
        }

        .faq-content-new {
          padding: 0 35px 35px 35px;
        }

        .faq-divider {
          width: 30px;
          height: 1px;
          background: var(--primary);
          opacity: 0.5;
        }

        .faq-content-new p {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          font-size: 1rem;
          max-width: 800px;
        }

        @media (max-width: 768px) {
          .faq-header-new {
            padding: 20px;
          }
          .faq-content-new {
            padding: 0 20px 25px 20px;
          }
          .faq-question-new {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;
