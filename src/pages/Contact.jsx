
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import heroImg from '../assets/contact-hero.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [contactDetails, setContactDetails] = useState({
    hours: 'Mon - Sat 08:00 - 18:00',
    address: 'No.30,Second  Street, Sidco Industrial estate, Ambattur, Chennai  600 098.',
    email1: 'info@atomlifts.com',
    email2: 'admin@atomlifts.com',
    phoneMain: '+91 85508 55001',
    phoneSales: '+91 96000 87456',
    phoneService: '+91 95008 37737'
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/contactDetails`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            try {
              const parsed = JSON.parse(data.value);
              setContactDetails(prev => ({ ...prev, ...parsed }));
            } catch (e) {
              console.error('Error parsing contact details JSON:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching contact details settings:', error);
      }
    };
    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'contact' })
      });
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error sending message. Please check your connection.' });
    }
  };

  return (
    <div className="contact-page bg-dark min-vh-100">
      {/* Hero Section - EXACTLY matching the refined Blog style */}
      <section className="contact-hero-section position-relative pt-5 overflow-hidden mb-4 mb-lg-5 d-flex align-items-center">
        {/* Smoky Gradient Background */}
        <div className="smoky-gradient-bg"></div>

        <div className="container position-relative py-5 mt-3 mt-lg-0" style={{ zIndex: 5 }}>
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
      <section className="contact-content-section py-3 py-lg-5 mt-3 mt-lg-5">
        <div className="container">
          <div className="row g-4 g-lg-5">
            {/* Left Side: Contact Info */}
            <div className="col-lg-6" data-aos="fade-up">
              <div className="pe-lg-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 mb-lg-4 small">WRITE A MESSAGE</h6>
                <h2 className="display-4 fw-800 text-white mb-3 mb-lg-4">Feel Free To <span className="text-primary">Contact Us</span></h2>
                <p className="text-white-50 mb-4 mb-lg-5">
                  Have a query or project in mind? Fill out the form and our team will get back to you shortly. 
                  We're here and happy to hear from you!
                </p>

                <div className="row g-3 g-lg-4 pt-2 pt-lg-4">
                  <div className="col-md-6">
                    <div className="contact-info-card d-flex gap-3 align-items-start">
                      <div className="icon-box-yellow">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h6 className="text-white fw-bold mb-1">Phone</h6>
                        <p className="text-white-50 mb-0">{contactDetails.phoneMain}</p>
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
                        <p className="text-white-50 mb-0">{contactDetails.email1}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3 mt-md-5 contact-info-card-wrapper">
                    <div className="contact-info-card d-flex gap-3 align-items-start">
                      <div className="icon-box-yellow">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h6 className="text-white fw-bold mb-1">Address</h6>
                        <p className="text-white-50 mb-0 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                          {contactDetails.address}
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
                <form className="row g-4" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label className="form-label-contact">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input-contact" 
                      placeholder="Enter Your Full Name" 
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-contact">Phone/Mobile</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input-contact" 
                      placeholder="Mobile Number" 
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-contact">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input-contact" 
                      placeholder="Email Address" 
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label-contact">Lift Type</label>
                    <div className="position-relative">
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="form-input-contact appearance-none"
                      >
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
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input-contact" 
                      rows="4" 
                      placeholder="Your Message"
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2" disabled={status.type === 'loading'}>
                      {status.type === 'loading' ? 'Submitting...' : 'Submit Form'} <Send size={20} />
                    </button>
                    {status.message && (
                      <div className={`mt-3 text-center small ${status.type === 'success' ? 'text-success' : 'text-danger'}`}>
                        {status.message}
                      </div>
                    )}
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

        /* Responsive Fixes */
        .contact-hero-section {
          min-height: 600px;
        }

        @media (max-width: 991px) {
          .contact-hero-section {
            min-height: auto;
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
          .huge-contact-title {
            font-size: clamp(3.5rem, 12vw, 5rem);
            line-height: 1.1;
          }
          .contact-content-section {
            padding-top: 0 !important;
          }
          .contact-form-wrapper {
            padding: 2rem 1.5rem !important;
            margin-top: 2rem;
          }
          .contact-info-card {
            margin-bottom: 1rem;
          }
          .contact-info-card-wrapper {
            margin-top: 1.5rem !important;
          }
        }
        @media (max-width: 576px) {
          .display-4 { font-size: 2.25rem !important; }
          .form-input-contact {
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
