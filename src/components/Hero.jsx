import React, { useState, useEffect } from 'react';
import liftObject from '../assets/lift-object.png';
import liftBg from '../assets/lift-bg.png';
import QuoteModal from './QuoteModal';
import { API_BASE_URL } from '../config';

const Hero = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [heroFrontImages, setHeroFrontImages] = useState([liftObject]);
  const [activeIndex, setActiveIndex] = useState(0);
  const backendUrl = API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/settings/heroFrontImages`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            const parsed = JSON.parse(data.value);
            if (Array.isArray(parsed)) {
              const validImages = parsed
                .filter(img => img !== null && img !== '')
                .map(img => img.startsWith('http') ? img : `${backendUrl}${img}`);
              
              if (validImages.length > 0) {
                setHeroFrontImages(validImages);
                return;
              }
            }
          }
        }

        // Fallback to single image setting
        const oldResponse = await fetch(`${backendUrl}/api/settings/heroFrontImage`);
        if (oldResponse.ok) {
          const oldData = await oldResponse.json();
          if (oldData && oldData.value) {
            const singleImgUrl = oldData.value.startsWith('http') ? oldData.value : `${backendUrl}${oldData.value}`;
            setHeroFrontImages([singleImgUrl]);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching hero dynamic front images:', error);
      }
    };
    fetchHeroImages();
  }, []);

  // Set up auto-rotation interval
  useEffect(() => {
    if (heroFrontImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroFrontImages.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(interval);
  }, [heroFrontImages]);

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section position-relative overflow-hidden" style={{ minHeight: '180vh' }}>
      {/* FULL-SCREEN LIFT BACKGROUND */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 hero-bg-parallax"
        style={{
          background: `url(${liftBg}) no-repeat center center`,
          backgroundSize: 'cover',
          zIndex: 1
        }}
      ></div>

      {/* Animated Yellow Lines Layer */}
      <div className="animated-lines-container" style={{ height: '300px', zIndex: 3 }}>
        <div className="lines-track">
          {[...Array(250)].map((_, i) => (
            <div key={i} className="line-item"></div>
          ))}
          {[...Array(250)].map((_, i) => (
            <div key={i + 250} className="line-item"></div>
          ))}
        </div>
      </div>

      {/* Vertical Scroll Indicator (Left) */}
      <div className="scroll-indicator-vertical d-none d-md-flex" style={{ zIndex: 20 }}>
        <span>Explore Atomlifts</span>
        <div className="line" style={{ height: '80px' }}></div>
      </div>

      {/* HERO CONTENT WRAPPER */}
      <div className="container-fluid px-0 position-relative" style={{ zIndex: 10 }}>

        {/* TOP SECTION: Typography & Premium Content */}
        <div className="row g-0 align-items-center hero-top-section">
          <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center py-5 text-center hero-top-inner">
            <div data-aos="fade-up" className="container">
              
              <h5 className="text-uppercase tracking-widest fw-bold mb-4" style={{ marginTop: '50px', letterSpacing: '0.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#FFD700', opacity: 1 }}>
                "Lift Your Expectations!"
              </h5>

              {/* Large Headline */}
              <h1 className="display-4 fw-800 text-white mb-4 text-uppercase" style={{ 
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)'
              }}>
                Premium Elevator <span className="text-primary text-gradient">Solutions</span> <br className="d-none d-md-block" /> for Modern Buildings
              </h1>

              {/* Subheading */}
              <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                  <p className="text-white-50 hero-sub-text mb-0 fs-5" style={{ 
                    fontWeight: '400', 
                    letterSpacing: '0.02em',
                    lineHeight: '1.6'
                  }}>
                    Manufacturing, Installation & Maintenance Across Tamil Nadu
                  </p>
                </div>
              </div>

              {/* Two Call-to-Action Buttons */}
              <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
                <button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="btn-premium d-inline-flex align-items-center gap-2"
                  style={{ borderRadius: '4px' }}
                >
                  Get Free Consultation
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
                
                <button 
                  onClick={handleScrollToProjects}
                  className="btn-outline-premium d-inline-flex align-items-center gap-2"
                  style={{ borderRadius: '4px' }}
                >
                  View Projects
                </button>
              </div>

              {/* 3 Quick Trust Badges in a Row */}
              <div className="row justify-content-center g-4 pt-4 border-top border-secondary-subtle mx-auto" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', maxWidth: '800px' }}>
                {/* Badge 1 */}
                <div className="col-4">
                  <div className="d-flex flex-column align-items-center">
                    <span className="fs-2 fw-800 mb-1" style={{ color: '#d4af37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>15+</span>
                    <span className="text-uppercase tracking-wider fw-bold text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Years Experience</span>
                  </div>
                </div>
                {/* Badge 2 */}
                <div className="col-4">
                  <div className="d-flex flex-column align-items-center">
                    <span className="fs-2 fw-800 mb-1" style={{ color: '#d4af37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>24/7</span>
                    <span className="text-uppercase tracking-wider fw-bold text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Service Support</span>
                  </div>
                </div>
                {/* Badge 3 */}
                <div className="col-4">
                  <div className="d-flex flex-column align-items-center">
                    <span className="fs-2 fw-800 mb-1" style={{ color: '#d4af37', textShadow: '0 2px 10px rgba(212, 175, 55, 0.3)' }}>1000+</span>
                    <span className="text-uppercase tracking-wider fw-bold text-white-50" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Installations</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Floating Model with Dynamic Rotator Animation */}
        <div className="row justify-content-center pt-0 pt-lg-5 pb-5 position-relative overflow-hidden hero-bottom-section">
          <div className="col-lg-12 text-center pt-0 pt-lg-5 pb-5 position-relative" style={{ zIndex: 10 }}>
            <div className="lift-object-container d-inline-block position-relative" style={{ animation: 'floatLift 4s ease-in-out infinite' }}>
              
              {/* Spacer image to control natural layout constraints (invisible) */}
              <img
                src={heroFrontImages[0]}
                alt="Layout spacer"
                className="lift-spacer-image opacity-0"
                style={{ maxHeight: '80vh', width: 'auto', pointerEvents: 'none', display: 'block', margin: '0 auto' }}
              />

              {/* Dynamic Overlaying Rotating Images */}
              {heroFrontImages.map((imgUrl, index) => (
                <img
                  key={imgUrl + index}
                  src={imgUrl}
                  alt={`Futuristic Elevator Cabin ${index + 1}`}
                  className="lift-rotating-image position-absolute top-0 start-50"
                  style={{
                    maxHeight: '80vh',
                    width: 'auto',
                    filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.95))',
                    transition: 'all 1.6s cubic-bezier(0.25, 1, 0.3, 1)',
                    opacity: index === activeIndex ? 1 : 0,
                    transform: `translateX(-50%) scale(${index === activeIndex ? 1.0 : 0.93})`,
                    pointerEvents: index === activeIndex ? 'auto' : 'none',
                    zIndex: index === activeIndex ? 2 : 1
                  }}
                />
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition to page content */}
      <div className="position-absolute w-100" style={{ bottom: '0', height: '200px', background: 'linear-gradient(to bottom, transparent, var(--dark))', zIndex: 5 }}></div>
      
      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </section>
  );
};

export default Hero;
