import React, { useState, useEffect } from 'react';
import liftObject from '../assets/lift-object.png';
import liftBg from '../assets/lift-bg.png';
import QuoteModal from './QuoteModal';

const Hero = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [heroFrontImages, setHeroFrontImages] = useState([liftObject]);
  const [activeIndex, setActiveIndex] = useState(0);
  const backendUrl = 'http://localhost:5000';

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

        {/* TOP SECTION: Typography */}
        <div className="row g-0 align-items-center hero-top-section">
          <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center py-5 text-center hero-top-inner">
            <div data-aos="fade-up">
              <h5 className="text-uppercase tracking-widest fw-bold mb-4" style={{ marginTop: '50px', letterSpacing: '0.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#FFD700', opacity: 1 }}>
                "Lift Your Expectations!"
              </h5>

              <div className="mb-0 mb-md-4 position-relative d-flex flex-column align-items-center">
                <h1 className="huge-heading m-0 text-white" style={{ lineHeight: '0.8', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>ELEVATOR</h1>
                <h1 className="huge-heading m-0 text-white" style={{ lineHeight: '0.8', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>ENGINEERING</h1>
              </div>


              <div className="row justify-content-center">
                <div className="col-md-7 mt-0 mt-md-5">
                  <p className="text-white hero-sub-text mb-0 fs-5" style={{ 
                    fontWeight: '400', 
                    letterSpacing: '0.02em',
                    lineHeight: '1.6',
                    opacity: 0.9
                  }}>
                    We specialize in the repair, modernization, and installation of all types of commercial and residential elevators. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Floating Model with Dynamic Rotator Animation */}
        <div className="row justify-content-center pt-0 pt-lg-5 pb-5 position-relative overflow-hidden hero-bottom-section">
          <div className="col-lg-12 text-center pt-0 pt-lg-5 pb-5 position-relative" style={{ zIndex: 10 }} data-aos="zoom-in">
            <div className="lift-object-container d-inline-block position-relative">
              
              {/* Spacer image to control natural layout constraints (invisible) */}
              <img
                src={heroFrontImages[0]}
                alt="Layout spacer"
                className="lift-main-image opacity-0"
                style={{ maxHeight: '90vh', width: 'auto', pointerEvents: 'none' }}
              />

              {/* Dynamic Overlaying Rotating Images */}
              {heroFrontImages.map((imgUrl, index) => (
                <img
                  key={imgUrl + index}
                  src={imgUrl}
                  alt={`Futuristic Elevator Cabin ${index + 1}`}
                  className="lift-main-image position-absolute top-0 start-50 translate-middle-x"
                  style={{
                    maxHeight: '90vh',
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
