import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Grid } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoImg from '../assets/images/ATOM-Logo02.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 500) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' }, // Placeholder paths to match reference
    { name: 'Pages', path: '/pages' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-4'}`}
         style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)', transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
           <img 
             src={logoImg} 
             alt="Atomlifts Logo" 
             style={{ height: '50px', objectFit: 'contain' }} 
             className="me-2"
           />
        </Link>

        <button 
          className="navbar-toggler border-0 text-white shadow-none" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item mx-lg-2">
                <Link 
                  className={`nav-link fw-bold text-uppercase small tracking-widest transition-all nav-link-custom ${location.pathname === link.path ? 'text-white' : ''}`}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center">
             <Link to="/contact" className="btn-premium py-2 px-4 small text-decoration-none">
                Get Started
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
