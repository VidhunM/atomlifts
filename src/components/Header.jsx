import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
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
    { 
      name: 'Escalators', 
      path: '/escalators',
      dropdown: [
        { name: 'Escalator', path: '/escalators/standard' },
        { name: 'Moving Walkways', path: '/escalators/moving-walkways' },
      ]
    },
    { 
      name: 'Lifts', 
      path: '/lifts',
      dropdown: [
        { 
          name: 'Residential', 
          path: '/lifts/residential',
          subDropdown: [
            { name: 'Home Lifts', path: '/lifts/residential/home' },
            { name: 'Passenger Lifts', path: '/lifts/residential/passenger' },
          ]
        },
        { 
          name: 'Commercial', 
          path: '/lifts/commercial',
          subDropdown: [
            { name: 'Hospital Lifts', path: '/lifts/commercial/hospital' },
            { name: 'Premium Lifts', path: '/lifts/commercial/premium' },
            { name: 'Goods Lifts', path: '/lifts/commercial/goods' },
            { name: 'Express Lifts', path: '/lifts/commercial/express' },
            { name: 'Vehicle Lifts', path: '/lifts/commercial/vehicle' },
          ]
        },
        { 
          name: 'Industrial', 
          path: '/lifts/industrial',
          subDropdown: [
            { name: 'Industrial Material Lifts', path: '/lifts/industrial/material' },
          ]
        },
        { 
          name: 'Parking Solutions', 
          path: '/lifts/parking',
          subDropdown: [
            { name: 'Car Parking Lifts', path: '/lifts/parking/car' },
          ]
        },
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'glass-nav py-1' : 'bg-transparent py-2'}`}
         style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)', transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
           <img 
             src={logoImg} 
             alt="Atomlifts Logo" 
             style={{ height: '40px', objectFit: 'contain' }} 
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
              <li key={link.name} className={`nav-item mx-lg-2 ${link.dropdown ? 'dropdown custom-dropdown' : ''}`}>
                {link.dropdown ? (
                  <>
                    <Link 
                      className={`nav-link fw-bold text-uppercase small tracking-widest dropdown-toggle nav-link-custom ${location.pathname.startsWith(link.path) ? 'text-white' : ''}`}
                      to={link.path}
                      id={`dropdown-${link.name}`}
                      role="button"
                      aria-expanded="false"
                    >
                      {link.name} <ChevronDown size={14} className="ms-1 dropdown-chevron" />
                    </Link>
                    <ul className="dropdown-menu glass-nav-dropdown border-0 shadow-2xl" aria-labelledby={`dropdown-${link.name}`}>
                      {link.dropdown.map((sub) => (
                        <li key={sub.name} className={sub.subDropdown ? 'dropdown-submenu' : ''}>
                          {sub.subDropdown ? (
                            <>
                              <Link className="dropdown-item text-white-50 d-flex justify-content-between align-items-center" to={sub.path}>
                                {sub.name} <ChevronRight size={14} className="submenu-chevron" />
                              </Link>
                              <ul className="dropdown-menu glass-nav-dropdown border-0 shadow-2xl submenu-left">
                                {sub.subDropdown.map((subChild) => (
                                  <li key={subChild.name}>
                                    <Link 
                                      className="dropdown-item text-white-50" 
                                      to={subChild.path}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subChild.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link 
                              className="dropdown-item text-white-50" 
                              to={sub.path}
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link 
                    className={`nav-link fw-bold text-uppercase small tracking-widest transition-all nav-link-custom ${location.pathname === link.path ? 'text-white' : ''}`}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
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
      
      <style>{`
        .glass-nav-dropdown {
          background: rgba(10, 10, 10, 0.95) !important;
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 4px !important;
          margin-top: 5px !important;
          min-width: 240px;
          padding: 15px 0;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
        }
        
        .dropdown-item {
          padding: 10px 25px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .dropdown-item:hover {
          background: rgba(248, 192, 45, 0.08) !important;
          color: var(--primary) !important;
          padding-left: 32px !important;
        }
        
        .dropdown-submenu {
          position: relative;
        }
        
        .dropdown-submenu .dropdown-menu {
          top: -15px;
          left: 100%;
          margin-left: 2px;
          display: none;
        }
        
        .dropdown-submenu:hover > .dropdown-menu {
          display: block;
          animation: slideInRight 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .dropdown-chevron, .submenu-chevron {
          opacity: 0.4;
          transition: transform 0.3s ease;
        }
        
        .dropdown:hover .dropdown-chevron {
          transform: rotate(180deg);
          opacity: 1;
        }
        
        .dropdown-submenu:hover .submenu-chevron {
          transform: translateX(5px);
          opacity: 1;
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(15px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (min-width: 992px) {
          .custom-dropdown:hover > .dropdown-menu {
            display: block;
            animation: fadeInMoveUp 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }
        }
        
        @keyframes fadeInMoveUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .dropdown-toggle::after {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export default Header;
