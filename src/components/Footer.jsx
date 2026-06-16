import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Globe
} from 'lucide-react';
import { API_BASE_URL } from '../config';
import logoImg from '../assets/images/ATOM-Logo02.png';

const Footer = () => {
  const [contactDetails, setContactDetails] = useState({
    hours: 'Mon - Sat 08:00 - 18:00',
    address: 'No. 30, Sidco Industrial Estate, Pattravakkam, Ambattur, Chennai - 600 098.',
    email1: 'info@atomlifts.com',
    email2: 'admin@atomlifts.com',
    phoneMain: '+91 85508 55001',
    phoneSales: '+91 96000 87456',
    phoneService: '+91 95008 37737'
  });

  const [branches, setBranches] = useState([
    { key: 'maldives', name: 'Maldives', partner: 'Atomlifts Maldives Pvt Ltd' },
    { key: 'oman', name: 'Oman', partner: 'Airmech Oman LLC' },
    { key: 'saudi-arabia', name: 'Saudi Arabia', partner: 'Al-Qahtani Lift Systems' },
    { key: 'srilanka', name: 'Sri Lanka', partner: 'Lanka Mobility Solutions Pvt Ltd' },
    { key: 'uae', name: 'UAE', partner: 'Atomlifts Gulf LLC' }
  ]);

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

    const fetchBranches = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/overseasBranches`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            try {
              const parsed = JSON.parse(data.value);
              const items = Object.keys(parsed).map(key => ({
                key,
                name: parsed[key].name,
                partner: parsed[key].partner
              }));
              setBranches(items);
            } catch (e) {
              console.error('Error parsing overseas branches JSON:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching overseas branches settings:', error);
      }
    };

    fetchContactDetails();
    fetchBranches();
  }, []);

  return (
    <footer className="footer pt-5 overflow-hidden" style={{ background: '#0a0f1d', color: '#94a3b8' }}>
      <div className="container pt-5">
        <div className="row g-5 mb-5 pb-4">

          {/* Column 1: Brand, Social & Corporate Registration info */}
          <div className="col-lg-3">
            <img src={logoImg} alt="AtomLifts Logo" style={{ height: '55px', marginBottom: '25px', objectFit: 'contain' }} />
            <p className="mb-4 leading-relaxed small-text" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              We are a premier global vertical transportation enterprise, dedicated to the engineering, installation, and smart modernization of high-performance elevators and escalators to ensure absolute safety.
            </p>

            {/* Corporate Registration Details */}
            <div className="corporate-info d-flex flex-column gap-2 mb-4 p-3 rounded bg-dark-lighter border border-secondary border-opacity-15">
              <div className="d-flex align-items-center gap-2 text-white-50" style={{ fontSize: '0.8rem' }}>
                <Landmark size={15} className="text-primary" style={{ color: '#d4af37' }} />
                <span><strong>CIN:</strong> U29309TN2022PTC150917</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-white-50" style={{ fontSize: '0.8rem' }}>
                <ShieldCheck size={15} className="text-primary" style={{ color: '#d4af37' }} />
                <span><strong>GSTIN:</strong> 33AAWCA7368J1ZZ</span>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              {[
                {
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
                  url: 'https://facebook.com',
                  label: 'Facebook',
                  color: '#1877f2'
                },
                {
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>,
                  url: 'https://twitter.com',
                  label: 'Twitter / X',
                  color: '#1da1f2'
                },
                {
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>,
                  url: 'https://linkedin.com',
                  label: 'LinkedIn',
                  color: '#0a66c2'
                },
                {
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
                  url: 'https://instagram.com',
                  label: 'Instagram',
                  color: '#e1306c'
                },
                {
                  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" /><path d="m10 15 5-3-5-3z" /></svg>,
                  url: 'https://youtube.com',
                  label: 'YouTube',
                  color: '#ff0000'
                }
              ].map(({ svg, url, label, color }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn transition-all"
                  aria-label={label}
                  style={{ '--hover-color': color }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-lg-2">
            <h5 className="fw-bold mb-4 text-white text-uppercase tracking-wider" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>Quick Links</h5>
            <div className="footer-links d-flex flex-column gap-2">
              <Link to="/" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Home
              </Link>
              <Link to="/about" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> About Us
              </Link>
              <Link to="/careers" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Careers
              </Link>
              <Link to="/blog" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Our Blog
              </Link>
              <Link to="/contact" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Contact Us
              </Link>

            </div>
          </div>

          {/* Column 3: Specialized Services (SEO Links) */}
          <div className="col-6 col-lg-2">
            <h5 className="fw-bold mb-4 text-white text-uppercase tracking-wider" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>Specialized Services</h5>
            <div className="footer-links d-flex flex-column gap-2">
              <Link to="/solutions/home-lift-chennai" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Home Lift Chennai
              </Link>
              <Link to="/solutions/passenger-lift-manufacturer" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Passenger Lift
              </Link>
              <Link to="/solutions/elevator-amc-services" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Elevator AMC
              </Link>
              <Link to="/solutions/lift-modernization" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Modernization
              </Link>
              <Link to="/solutions/hospital-lift-installation" className="footer-link-new text-decoration-none d-flex align-items-center gap-1">
                <ArrowRight size={12} className="link-arrow" /> Hospital Lifts
              </Link>
            </div>
          </div>

          {/* Column 4: Overseas Locations (Dynamic) */}
          <div className="col-6 col-lg-2">
            <h5 className="fw-bold mb-4 text-white text-uppercase tracking-wider" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>Branch Locations</h5>
            <div className="footer-links d-flex flex-column gap-3">
              {branches.map(branch => (
                <Link
                  key={branch.key}
                  to={`/overseas/${branch.key}`}
                  className="footer-link-new text-decoration-none d-flex flex-column group"
                >
                  <span className="fw-bold text-white-50 d-flex align-items-center gap-1">
                    <Globe size={12} className="text-primary-dim" style={{ color: '#d4af37' }} /> {branch.name} Office
                  </span>
                  <span className="small text-secondary ps-3" style={{ fontSize: '0.75rem' }}>{branch.partner}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Head Office Contact Info */}
          <div className="col-lg-3">
            <h5 className="fw-bold mb-4 text-white text-uppercase tracking-wider" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>Head Office</h5>

            <div className="d-flex flex-column gap-3">
              <div className="footer-contact-item d-flex gap-3 align-items-start">
                <Clock size={18} className="mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="small" style={{ fontSize: '0.85rem' }}>{contactDetails.hours}</span>
              </div>

              <div className="footer-contact-item d-flex gap-3 align-items-start">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="small" style={{ whiteSpace: 'pre-line', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  {contactDetails.address}
                </span>
              </div>

              <div className="footer-contact-item d-flex gap-3 align-items-start">
                <Mail size={18} className="mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                <div className="d-flex flex-column small" style={{ fontSize: '0.85rem' }}>
                  <a href={`mailto:${contactDetails.email1}`} className="text-decoration-none text-secondary hover-primary">{contactDetails.email1}</a>
                  <a href={`mailto:${contactDetails.email2}`} className="text-decoration-none text-secondary hover-primary">{contactDetails.email2}</a>
                </div>
              </div>

              <div className="footer-contact-item d-flex gap-3 align-items-start">
                <Phone size={18} className="mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                <div className="d-flex flex-column small" style={{ fontSize: '0.85rem' }}>
                  <span><strong>Main:</strong> <a href={`tel:${(contactDetails.phoneMain || '').replace(/\s+/g, '')}`} className="text-decoration-none text-secondary hover-primary">{contactDetails.phoneMain}</a></span>
                  <span><strong>Sales:</strong> <a href={`tel:${(contactDetails.phoneSales || '').replace(/\s+/g, '')}`} className="text-decoration-none text-secondary hover-primary">{contactDetails.phoneSales}</a></span>
                  <span><strong>Service:</strong> <a href={`tel:${(contactDetails.phoneService || '').replace(/\s+/g, '')}`} className="text-decoration-none text-secondary hover-primary">{contactDetails.phoneService}</a></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="copyright-bar py-4" style={{ background: '#070b14', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 small opacity-50">
                Copyright © {new Date().getFullYear()} - Atom Lifts India Pvt Ltd. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <div className="d-flex justify-content-center justify-content-md-end gap-4 small">
                <a href="#" className="text-white opacity-50 text-decoration-none hover-primary">Terms & Conditions</a>
                <a href="#" className="text-white opacity-50 text-decoration-none hover-primary">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.02); }
        .footer-social-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          color: #94a3b8;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .footer-social-btn:hover {
          background: var(--hover-color, #d4af37) !important;
          border-color: var(--hover-color, #d4af37) !important;
          color: #fff !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }
        .footer-link-new {
          color: #94a3b8;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }
        .footer-link-new .link-arrow {
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.3s ease;
          color: #d4af37;
        }
        .footer-link-new:hover {
          color: #ffffff !important;
          padding-left: 2px;
        }
        .footer-link-new:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .hover-primary:hover {
          color: #d4af37 !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
