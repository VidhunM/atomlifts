
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import heroImg from '../assets/contact-hero.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    liftType: '',
    message: ''
  });

  return (
    <div className="contact-page bg-dark min-vh-100">
      {/* Hero Section - EXACTLY matching the refined Blog style */}
      <section className="contact-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        {/* Smoky Gradient Background */}
        <div className="smoky-gradient-bg"></div>

        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h1 className="huge-contact-title mb-4">
                CONTACT <span className="text-primary">US</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Precision Lift Engineering for Mapping, Inspections, and High Accuracy Vertical Mobility Data.
              </p>
            </div>
          </div>
        </div>

        {/* Right Corner Image */}
        <div className="contact-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img 
            src={heroImg} 
            alt="Customer Support" 
            className="hero-clip-img" 
          />
        </div>
        
        {/* Yellow Bar Ticker - Looping seamlessly */}
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="ticker-bar-yellow"></div>
            ))}
            {/* Duplicated for seamless loop */}
            {[...Array(100)].map((_, i) => (
              <div key={`dup-${i}`} className="ticker-bar-yellow"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section - Contents from Image 2 */}
      <section className="contact-content-section py-5 mt-5">
        <div className="container">
          <div className="row g-5">
            {/* Left Side: Contact Info */}
            <div className="col-lg-6" data-aos="fade-up">
              <div className="pe-lg-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-4 small">WRITE A MESSAGE</h6>
                <h2 className="display-4 fw-800 text-white mb-4">Feel Free To <span className="text-primary">Contact Us</span></h2>
                <p className="text-white-50 mb-5">
                  Have a query or project in mind? Fill out the form and our team will get back to you shortly. 
                  We're here and happy to hear from you!
                </p>

                <div className="row g-4 pt-4">
                  <div className="col-md-6">
                    <div className="contact-info-card d-flex gap-3 align-items-start">
                      <div className="icon-box-yellow">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h6 className="text-white fw-bold mb-1">Phone</h6>
                        <p className="text-white-50 mb-0">+91 85508 55001</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-info-card d-flex gap-3 align-items-start">
                      <div className="icon-box-yellow">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h6 className="text-white fw-bold mb-1">Email</h6>
                        <p className="text-white-50 mb-0">info@atomlifts.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-5">
                    <div className="contact-info-card d-flex gap-3 align-items-start">
                      <div className="icon-box-yellow">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h6 className="text-white fw-bold mb-1">Address</h6>
                        <p className="text-white-50 mb-0 leading-relaxed">
                          No. 87B, Pillayar Koil Street, Ambattur Industrial Estate,<br />
                          Mannurpet, Tamil Nadu 600 050, IN.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="col-lg-6" data-aos="fade-left">
              <div className="contact-form-wrapper glass-card-dark p-4 p-md-5">
                <form className="row g-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="col-md-6">
                    <label className="form-label-contact">Full Name</label>
                    <input type="text" className="form-input-contact" placeholder="Enter Your Full Name" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-contact">Phone/Mobile</label>
                    <input type="text" className="form-input-contact" placeholder="Mobile Number" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-contact">Email</label>
                    <input type="email" className="form-input-contact" placeholder="Email Address" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-contact">Lift Type</label>
                    <div className="position-relative">
                      <select className="form-input-contact appearance-none">
                        <option value="">Select lift type</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                        <option>Parking Solutions</option>
                      </select>
                      <ChevronDown size={18} className="select-arrow" />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label-contact">Your Message *</label>
                    <textarea className="form-input-contact" rows="4" placeholder="Your Message"></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2">
                      Submit Form <Send size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .icon-box-yellow {
          background: var(--primary);
          color: var(--dark);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .glass-card-dark {
          background: #141b2b;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .form-label-contact {
          display: block;
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input-contact {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 20px;
          color: white;
          border-radius: 4px;
          transition: var(--transition);
        }

        .form-input-contact:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--primary);
        }

        .form-input-contact::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .select-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: rgba(255, 255, 255, 0.4);
        }

        .appearance-none {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        @media (max-width: 576px) {
          .display-4 { font-size: 2rem !important; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
