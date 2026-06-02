import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuoteModal from '../components/QuoteModal';
import aboutHero from '../assets/about-hero.png';
import { API_BASE_URL } from '../config';

const defaultBranchData = {
  maldives: {
    name: 'Maldives',
    partner: 'Atomlifts Maldives Pvt Ltd',
    address: 'H. Coral Reef, 3rd Floor, Boduthakurufaanu Magu, Malé, Maldives',
    phone: '+960 3302020',
    email: 'maldives@atomlifts.com'
  },
  oman: {
    name: 'Oman',
    partner: 'Airmech Oman LLC',
    address: 'P.O. Box 2033, Ruwi 112, Rusay, Industrial Estate, Road No. 4A, Sultanate of Oman',
    phone: '+968 24447060',
    email: 'oman@atomlifts.com'
  },
  'saudi-arabia': {
    name: 'Saudi Arabia',
    partner: 'Al-Qahtani Lift Systems',
    address: 'King Abdulaziz Road, Al Yasmin District, P.O. Box 90432, Riyadh 11613, Kingdom of Saudi Arabia',
    phone: '+966 11 405 8899',
    email: 'ksa@atomlifts.com'
  },
  srilanka: {
    name: 'Sri Lanka',
    partner: 'Lanka Mobility Solutions Pvt Ltd',
    address: 'No. 450, Galle Road, Colombo 03, Sri Lanka',
    phone: '+94 11 257 5800',
    email: 'srilanka@atomlifts.com'
  },
  uae: {
    name: 'UAE',
    partner: 'Atomlifts Gulf LLC',
    address: 'Office 1204, Aspect Tower, Business Bay, P.O. Box 45012, Dubai, United Arab Emirates',
    phone: '+971 4 456 7890',
    email: 'uae@atomlifts.com'
  }
};

const OverseasBranch = () => {
  const { country } = useParams();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [branches, setBranches] = useState(defaultBranchData);
  
  const countryKey = country ? country.toLowerCase() : '';
  const branch = branches[countryKey] || branches['oman'];

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/overseasBranches`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            try {
              const parsed = JSON.parse(data.value);
              setBranches(prev => ({ ...prev, ...parsed }));
            } catch (e) {
              console.error('Error parsing branches settings JSON:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching overseas branch settings:', error);
      }
    };
    fetchBranchData();
  }, []);

  return (
    <div className="overseas-branch-page bg-light min-vh-100 pb-5">
      
      {/* About-Style Hero Banner Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px', background: '#0a0f1d' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Authorized Mobility Partner</h6>
              <h1 className="display-3 fw-900 text-white mb-4 text-uppercase">
                ATOMLIFTS <span className="text-primary">{branch.name}</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400" style={{ maxWidth: '500px' }}>
                Delivering high-accuracy vertical mobility systems and premium elevator engineering globally.
              </p>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={aboutHero} alt="Engineering Excellence" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Breadcrumb Header */}
      <div className="w-100 py-3 mb-5" style={{ background: '#1A365D', borderBottom: '2px solid #D4AF37' }}>
        <div className="container">
          <div className="d-flex align-items-center text-white small">
            <Link to="/" className="text-white-50 text-decoration-none fw-bold text-uppercase me-2 hover-accent">HOME</Link>
            <span className="text-white-50 me-2">»</span>
            <span className="fw-bold text-uppercase text-warning">{branch.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content Card Container */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8" data-aos="zoom-in">
            
            {/* Premium Card */}
            <div className="card border-0 shadow-lg p-4 p-md-5 text-center position-relative overflow-hidden" style={{
              borderRadius: '8px',
              background: '#FFFFFF',
              borderTop: '4px solid #D4AF37'
            }}>
              
              {/* Vertical Mobility / Elevator Icon */}
              <div className="d-inline-flex align-items-center justify-content-center mb-4 p-3 rounded-circle" style={{
                background: 'rgba(26, 54, 93, 0.05)',
                width: '70px',
                height: '70px',
                margin: '0 auto'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 11 12 6 7 11"></polyline>
                  <polyline points="7 13 12 18 17 13"></polyline>
                </svg>
              </div>

              {/* Sub-label */}
              <span className="text-uppercase tracking-widest fw-bold text-muted mb-2 d-block" style={{ fontSize: '0.8rem', letterSpacing: '0.15em' }}>
                Atomlifts Partner at
              </span>

              {/* Country Title */}
              <h1 className="display-4 fw-800 mb-5" style={{ color: '#1A365D', letterSpacing: '-0.01em' }}>
                {branch.name}
              </h1>

              {/* Branch Content Details */}
              <div className="branch-details-box py-4 px-3 mb-5 rounded" style={{ background: '#F8FAFC', border: '1px dashed rgba(26, 54, 93, 0.1)' }}>
                <h4 className="fw-bold mb-4" style={{ color: '#1A365D' }}>{branch.partner}</h4>
                
                <p className="fs-5 mb-4 text-secondary mx-auto" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
                  {branch.address}
                </p>

                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mt-4 pt-3 border-top" style={{ borderColor: 'rgba(26, 54, 93, 0.08)' }}>
                  
                  {/* Phone */}
                  <div className="d-flex align-items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span className="fw-bold" style={{ color: '#1A365D' }}>{branch.phone}</span>
                  </div>

                  {/* Email */}
                  <div className="d-flex align-items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <span className="fw-bold" style={{ color: '#1A365D' }}>{branch.email}</span>
                  </div>

                </div>
              </div>

              {/* Call to Actions */}
              <div className="d-flex justify-content-center gap-3">
                <button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="btn-premium d-inline-flex align-items-center gap-2 px-4 py-3"
                  style={{ borderRadius: '4px' }}
                >
                  Enquire Us
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
                
                <Link 
                  to="/contact" 
                  className="btn-outline-premium d-inline-flex align-items-center gap-2 px-4 py-3 text-decoration-none"
                  style={{ borderRadius: '4px' }}
                >
                  Contact Head Office
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Side Enquire Floating Tab */}
      <div 
        onClick={() => setIsQuoteOpen(true)}
        className="d-none d-md-flex align-items-center justify-content-center gap-2 shadow"
        style={{
          position: 'fixed',
          right: '0',
          top: '40%',
          transform: 'rotate(-90deg) translateY(34px)',
          transformOrigin: 'right center',
          background: '#1A365D',
          borderBottom: '3px solid #D4AF37',
          color: '#FFFFFF',
          padding: '10px 24px',
          cursor: 'pointer',
          zIndex: '999',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '0.1em'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        ENQUIRE US
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      
      <style>{`
        .hover-accent:hover {
          color: #D4AF37 !important;
        }
      `}</style>
    </div>
  );
};

export default OverseasBranch;
