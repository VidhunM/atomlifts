import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, Camera, Mail, Globe, MapPin, Phone, Clock } from 'lucide-react';
import { API_BASE_URL } from '../config';
import logoImg from '../assets/images/ATOM-Logo02.png';

const Footer = () => {
  const [contactDetails, setContactDetails] = useState({
    hours: 'Mon - Sat 08:00 - 18:00',
    address: 'No. 87B, Pillayar Koil Street,\nAmbattur Industrial Estate,\nMannurpet, Tamil Nadu 600050, IN',
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

  return (
    <footer className="footer pt-5 overflow-hidden">
      <div className="container pt-5">
        <div className="row g-5 mb-5 pb-4">
          
          {/* Column 1: Brand & Social */}
          <div className="col-lg-4">
            <img src={logoImg} alt="AtomLifts Logo" style={{ height: '60px', marginBottom: '30px' }} />
            <p className="mb-4 leading-relaxed" style={{ maxWidth: '350px', fontSize: '1.05rem' }}>
              Our service is mainly focused on maintenance, repair, and installation of elevators and 
              escalators to ensure safe and efficient travel for passengers.
            </p>
            <div className="d-flex gap-2">
              {[MessageSquare, Send, Camera, Mail, Globe].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-btn">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="col-6 col-lg-2">
            <h5 className="fw-bold mb-4">Company</h5>
            <div className="footer-links">
              <Link to="/" className="footer-link-new">Home</Link>
              <Link to="/services" className="footer-link-new">Our Services</Link>
              <Link to="/projects" className="footer-link-new">Projects</Link>
              <Link to="/blog" className="footer-link-new">Blog</Link>
              <Link to="/contact" className="footer-link-new">Contact</Link>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="col-6 col-lg-3">
            <h5 className="fw-bold mb-4">Services</h5>
            <div className="footer-links">
              <a href="#" className="footer-link-new">Precision Lift Installation</a>
              <a href="#" className="footer-link-new">Smart Control Modernization</a>
              <a href="#" className="footer-link-new">24/7 Safety Monitoring</a>
              <a href="#" className="footer-link-new">Commercial Escalators</a>
              <a href="#" className="footer-link-new">High-Speed Mobility</a>
              <a href="#" className="footer-link-new">Custom Architecture</a>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-lg-3">
            <h5 className="fw-bold mb-4">Contact Us</h5>
            
            <div className="footer-contact-item">
              <Clock size={20} />
              <div>{contactDetails.hours}</div>
            </div>

            <div className="footer-contact-item">
              <MapPin size={20} />
              <div style={{ whiteSpace: 'pre-line' }}>
                {contactDetails.address}
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={20} />
              <div className="d-flex flex-column">
                <span>{contactDetails.email1}</span>
                <span>{contactDetails.email2}</span>
              </div>
            </div>

            <div className="footer-contact-item">
               <Phone size={20} />
               <div className="d-flex flex-column">
                  <span>Main: {contactDetails.phoneMain}</span>
                  <span>Sales: {contactDetails.phoneSales}</span>
                  <span>Service: {contactDetails.phoneService}</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="copyright-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 small opacity-50">
                Copyright {new Date().getFullYear()} - Atom Lifts India Pvt Ltd by Designesia
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
    </footer>
  );
};


export default Footer;
