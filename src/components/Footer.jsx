import { Link } from 'react-router-dom';
import { MessageSquare, Send, Camera, Mail, Globe, MapPin, Phone, Clock } from 'lucide-react';
import logoImg from '../assets/images/ATOM-Logo02.png';

const Footer = () => {
  return (
    <footer className="footer bg-dark pt-5 overflow-hidden">
      <div className="container pt-5">
        <div className="row g-5 mb-5 pb-4">
          
          {/* Column 1: Brand & Social */}
          <div className="col-lg-4">
            <img src={logoImg} alt="AtomLifts Logo" style={{ height: '60px', marginBottom: '30px' }} />
            <p className="text-white-50 mb-4 leading-relaxed" style={{ maxWidth: '350px', fontSize: '1.05rem' }}>
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
            <h5 className="text-white fw-bold mb-4">Company</h5>
            <div className="footer-links">
              <Link to="/" className="footer-link-new">Home</Link>
              <Link to="/services" className="footer-link-new">Our Services</Link>
              <Link to="/projects" className="footer-link-new">Projects</Link>
              <Link to="/about" className="footer-link-new">Get Started</Link>
              <Link to="/blog" className="footer-link-new">Blog</Link>
              <Link to="/contact" className="footer-link-new">Contact</Link>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="col-6 col-lg-3">
            <h5 className="text-white fw-bold mb-4">Services</h5>
            <div className="footer-links">
              <a href="#" className="footer-link-new">Precision Lift Installation</a>
              <a href="#" className="footer-link-new">Smart Control Modernization</a>
              <a href="#" className="footer-link-new">24/7 Safety Monitoring</a>
              <a href="#" className="footer-link-new">Commercial Escalators</a>
              <a href="#" className="footer-link-new">High-Speed Mobility</a>
              <a href="#" className="footer-link-new">Custom Architecture</a>
            </div>
          </div>

          {/* Column 4: Contact Info (Content from Image 1) */}
          <div className="col-lg-3">
            <h5 className="text-white fw-bold mb-4">Contact Us</h5>
            
            <div className="footer-contact-item">
              <Clock size={20} />
              <div>Mon - Sat 08.00 - 18.00</div>
            </div>

            <div className="footer-contact-item">
              <MapPin size={20} />
              <div>73 Pillayar Koil Street, Ambattur Indus Estate, Ambattur, Tamil Nadu 600050, IN</div>
            </div>

            <div className="footer-contact-item">
              <Mail size={20} />
              <div className="d-flex flex-column">
                <span>saravanan@atomlifts.com</span>
                <span>admin@atomlifts.com</span>
              </div>
            </div>

            <div className="footer-contact-item">
               <Phone size={20} />
               <div className="d-flex flex-column">
                  <span>Sales: 96000 87456</span>
                  <span>Service: 95008 37737</span>
               </div>
            </div>

            <button className="btn-premium w-100 py-3 mt-3 shadow-lg" style={{ borderRadius: '4px' }}>
              Get Started
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="copyright-bar">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-white-50 small">
                Copyright {new Date().getFullYear()} - Atom Lifts India Pvt Ltd by Designesia
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <div className="d-flex justify-content-center justify-content-md-end gap-4 small">
                <a href="#" className="text-white-50 text-decoration-none">Terms & Conditions</a>
                <a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
