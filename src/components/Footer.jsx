import { Link } from 'react-router-dom';
import { MessageSquare, Send, Camera, Library } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer bg-dark pt-5 pb-4 border-top border-white border-opacity-10">
      <div className="container">
        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <Link className="d-flex align-items-center mb-4" to="/">
              <span className="fw-bold fs-3 text-white">ATOM<span className="text-gradient">LIFTS</span></span>
            </Link>
            <p className="text-white-50 mb-4" style={{ maxWidth: '300px' }}>
              Advanced vertical mobility solutions designed for tomorrow's infrastructure. Safety, speed, and sophistication.
            </p>
            <div className="d-flex gap-3">
              {[MessageSquare, Send, Camera, Library].map((Icon, i) => (
                <a key={i} href="#" className="glass-card p-2 text-white hover-text-primary transition-all rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-6 col-lg-2">
            <h6 className="text-white fw-bold mb-4">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li><Link to="/" className="hover-text-white transition-all">Home</Link></li>
              <li><Link to="/about" className="hover-text-white transition-all">About Us</Link></li>
              <li><Link to="/contact" className="hover-text-white transition-all">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-6 col-lg-2">
            <h6 className="text-white fw-bold mb-4">Services</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50">
              <li>Residential</li>
              <li>Commercial</li>
              <li>Maintenance</li>
              <li>Smart Systems</li>
            </ul>
          </div>
          
          <div className="col-lg-4">
            <h6 className="text-white fw-bold mb-4">Newsletter</h6>
            <p className="text-white-50 mb-4">Stay updated with the latest in lifting technology.</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control bg-white bg-opacity-5 border-white border-opacity-10 text-white" placeholder="Email address" />
              <button className="btn-premium" type="button">Join</button>
            </div>
          </div>
        </div>
        
        <div className="border-top border-white border-opacity-5 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
          <p className="mb-md-0 mb-3">&copy; {new Date().getFullYear()} Atomlifts Global Inc. All rights reserved.</p>
          <div className="d-flex gap-4">
            <a href="#" className="hover-text-white">Privacy Policy</a>
            <a href="#" className="hover-text-white">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <style>{`
        .hover-text-white:hover { color: white; }
        .hover-text-primary:hover { 
          color: var(--primary) !important;
          border-color: var(--primary) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
