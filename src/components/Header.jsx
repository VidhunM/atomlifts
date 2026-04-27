import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoImg from '../assets/images/ATOM-Logo02.png';
import escalatorThumb from '../assets/escalator-hero.png';
import walkwayThumb from '../assets/moving-walkway-hero.png';
import QuoteModal from './QuoteModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
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
      isMega: true,
      dropdown: [
        { name: 'Escalator', path: '/escalators/standard', img: escalatorThumb },
        { name: 'Moving Walkways', path: '/escalators/moving-walkways', img: walkwayThumb },
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
    <>
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
                    {link.isMega ? (
                      <div className="dropdown-menu mega-menu-box border-0 shadow-2xl overflow-hidden" aria-labelledby={`dropdown-${link.name}`}>
                        <div className="p-4">
                            <div className="row g-4">
                              {link.dropdown.map((sub) => (
                                <div className="col-12 col-md-6" key={sub.name}>
                                  <Link to={sub.path} className="mega-menu-item text-decoration-none" onClick={() => setIsOpen(false)}>
                                    <div className="mega-img-container mb-3 overflow-hidden shadow-lg">
                                      <img src={sub.img} alt={sub.name} className="mega-img" />
                                      <div className="mega-overlay"></div>
                                    </div>
                                    <h6 className="text-white text-uppercase tracking-widest small fw-800 text-center mb-0 mega-title">{sub.name}</h6>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <ul className="dropdown-menu glass-nav-dropdown border-0 shadow-2xl" aria-labelledby={`dropdown-${link.name}`}>
                          {link.dropdown.map((sub) => (
                            <li key={sub.name} className={sub.subDropdown ? 'dropdown-submenu' : ''}>
                              {sub.subDropdown ? (
                                <>
                                  <Link className="dropdown-item text-white-50 d-flex justify-content-between align-items-center" to={sub.path} onClick={(e) => {
                                    if (window.innerWidth < 992) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      const parent = e.currentTarget.parentElement;
                                      const submenu = parent.querySelector('.dropdown-menu');
                                      if (submenu) {
                                        submenu.style.maxHeight = submenu.style.maxHeight === '500px' ? '0px' : '500px';
                                      }
                                    } else {
                                      setIsOpen(false);
                                    }
                                  }}>
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
                      )}
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
            <div className="d-flex align-items-center justify-content-center pb-3 pb-lg-0">
               <button 
                  onClick={() => { setIsQuoteOpen(true); setIsOpen(false); }}
                  className="btn-premium py-2 px-4 small text-decoration-none border-0"
               >
                  Get Started
               </button>
            </div>
          </div>
        </div>
      </nav>
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
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
  
          .mega-menu-box {
            background: rgba(10, 10, 10, 0.98) !important;
            backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            left: 50% !important;
            transform: translateX(-50%) translateY(20px) !important;
            border-radius: 8px !important;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
            width: 90vw !important;
            max-width: 800px !important;
          }
  
          .custom-dropdown:hover .mega-menu-box {
            transform: translateX(-50%) translateY(0) !important;
          }
  
          .mega-img-container {
            position: relative;
            height: 140px;
            border-radius: 4px;
          }
  
          .mega-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          }
  
          .mega-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            opacity: 0.6;
            transition: opacity 0.3s ease;
          }
  
          .mega-menu-item:hover .mega-img {
            transform: scale(1.1);
          }
  
          .mega-menu-item:hover .mega-overlay {
            opacity: 0.2;
          }
  
          .mega-menu-item:hover .mega-title {
            color: var(--primary) !important;
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
          
          @media (max-width: 991px) {
            .navbar-collapse {
              background: rgba(10, 10, 10, 0.98);
              margin: 0 -1rem;
              padding: 20px;
              max-height: 85vh;
              overflow-y: auto;
              border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .nav-item {
              width: 100%;
              text-align: center;
              margin: 5px 0;
            }
            
            .glass-nav-dropdown {
              position: static !important;
              background: rgba(255, 255, 255, 0.02) !important;
              box-shadow: none !important;
              border: none !important;
              width: 100% !important;
              min-width: 100% !important;
              padding: 0 !important;
              display: block !important;
              max-height: 0;
              overflow: hidden;
              transition: max-height 0.4s ease;
              transform: none !important;
            }
            
            .mega-menu-box {
              position: static !important;
              transform: none !important;
              width: 100% !important;
              max-width: 100% !important;
              background: transparent !important;
              border: none !important;
              padding: 0 !important;
            }
  
            .mega-img-container {
              height: 100px;
            }
  
            .dropdown:hover .glass-nav-dropdown,
            .dropdown-submenu:hover > .glass-nav-dropdown {
              max-height: 1000px;
            }
            
            .dropdown-submenu .dropdown-menu {
              position: static !important;
              display: block !important;
              background: rgba(255, 255, 255, 0.04) !important;
              margin-left: 0 !important;
              max-height: 0;
              overflow: hidden;
            }
            
            .dropdown-item {
              padding: 12px !important;
              text-align: center;
              opacity: 0.7;
              font-size: 0.7rem;
            }
            
            .dropdown-item:hover {
              padding-left: 12px !important;
              opacity: 1;
            }
            
            .submenu-chevron {
              transform: rotate(90deg);
            }
            
            .dropdown-toggle::after {
              display: none;
            }
          }

      `}</style>
    </>
  );
};

export default Header;
