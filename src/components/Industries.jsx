import { useState, useEffect, useRef } from 'react';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import stainlessImg from '../assets/Stainless/Stainless.jpg';
import mildSteelsImg from '../assets/Stainless/Mild steels.jpg';
import msImg from '../assets/Stainless/MS.jpg';
import glassImg from '../assets/Stainless/Glass.jpg';
import goodsImg from '../assets/Stainless/Goods.jpg';

// Gallery Images
import s1 from '../assets/Stainless 1/s1.jpg';
import s2 from '../assets/Stainless 1/s2.jpg';
import s3 from '../assets/Stainless 1/s3.jpg';
import s4 from '../assets/Stainless 1/s4.jpg';
import s5 from '../assets/Stainless 1/s5.jpg';
import s6 from '../assets/Stainless 1/s6.jpg';
import s7 from '../assets/Stainless 1/s7.jpg';
import s8 from '../assets/Stainless 1/s8.jpg';

// Mild Steels Gallery
import m1 from '../assets/Mind steel/m1.jpg';
import m2 from '../assets/Mind steel/m2.jpg';
import m3 from '../assets/Mind steel/m3.jpg';
import m4 from '../assets/Mind steel/m4.jpg';
import m5 from '../assets/Mind steel/m5.png';
import m6 from '../assets/Mind steel/m6.jpg';
import m7 from '../assets/Mind steel/m7.jpg';
import m8 from '../assets/Mind steel/m8.jpg';

// MS Designer Gallery
import d1 from '../assets/Designer/d1.jpg';
import d2 from '../assets/Designer/d2.jpg';
import d3 from '../assets/Designer/d3.jpg';
import d4 from '../assets/Designer/d4.jpg';
import d5 from '../assets/Designer/d5.jpg';
import d6 from '../assets/Designer/d6.jpg';
import d7 from '../assets/Designer/d7.jpg';
import d8 from '../assets/Designer/d8.jpg';

// Panoramic Glass Gallery
import gl1 from '../assets/Glass/gl1.jpg';
import gl2 from '../assets/Glass/gl2.jpg';
import gl3 from '../assets/Glass/gl3.jpg';
import gl4 from '../assets/Glass/gl4.jpg';
import gl5 from '../assets/Glass/gl5.jpg';
import gl6 from '../assets/Glass/gl6.jpg';
import gl7 from '../assets/Glass/gl7.jpg';
import gl8 from '../assets/Glass/gl8.jpg';

// Goods Lift Gallery
import g1 from '../assets/goods/g1.jpg';
import g2 from '../assets/goods/g2.jpg';
import g3 from '../assets/goods/g3.jpg';
import g4 from '../assets/goods/g4.jpg';
import g5 from '../assets/goods/g5.jpg';
import g6 from '../assets/goods/g6.jpg';
import g7 from '../assets/goods/g7.jpg';
import g8 from '../assets/goods/g8.jpg';

const industries = [
  {
    image: stainlessImg,
    gallery: [s1, s2, s3, s4, s5, s6, s7, s8],
    title: 'Stainless Steel',
    desc: 'High-durability stainless steel cabins for modern business environments.'
  },
  {
    image: mildSteelsImg,
    gallery: [m1, m2, m3, m4, m5, m6, m7, m8],
    title: 'Mild Steels',
    desc: 'Robust and versatile mild steel elevators tailored for residential use.'
  },
  {
    image: msImg,
    gallery: [d1, d2, d3, d4, d5, d6, d7, d8],
    title: 'MS Designer',
    desc: 'Premium MS-coated cabins with contemporary aesthetics and strength.'
  },
  {
    image: glassImg,
    gallery: [gl1, gl2, gl3, gl4, gl5, gl6, gl7, gl8],
    title: 'Panoramic Glass',
    desc: 'Breathtaking glass elevators providing 360-degree views for luxury.'
  },
  {
    image: goodsImg,
    gallery: [g1, g2, g3, g4, g5, g6, g7, g8],
    title: 'Goods Lift',
    desc: 'Powerful freight elevators designed for high-capacity industrial logistics.'
  }
];

const Industries = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const sliderRef = useRef(null);

  // Auto-slide for mobile grid
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isMobile = window.innerWidth <= 767;
    
    const handleResize = () => { isMobile = window.innerWidth <= 767; };
    window.addEventListener('resize', handleResize);

    const autoSlideInterval = setInterval(() => {
      if (!isMobile || !slider) return;
      
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: slider.clientWidth * 0.85, behavior: 'smooth' });
      }
    }, 2500);

    return () => {
      clearInterval(autoSlideInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openGallery = (gallery) => {
    setActiveGallery(gallery);
    setCurrentImgIndex(0);
  };

  const closeGallery = () => {
    setActiveGallery(null);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % activeGallery.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
  };
  return (
    <section className="industries-section bg-dark py-5 position-relative overflow-hidden">
      <div className="container py-5 mt-5">
        
        {/* Section Header with Nav Arrows */}
        <div className="row align-items-end mb-5 pb-4">
          <div className="col-lg-8" data-aos="fade-right">
            <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">WHAT WE DO</h6>
            <h2 className="display-4 fw-800 text-white mb-0">
               Industry We <span className="text-primary">Serve</span>
            </h2>
          </div>
          <div className="col-lg-4 d-flex justify-content-lg-end mt-4 mt-lg-0" data-aos="fade-left">
             <button className="ind-nav-btn shadow-lg">
                <ChevronLeft size={20} />
             </button>
             <button className="ind-nav-btn shadow-lg">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-5 mobile-slider-row" ref={sliderRef}>
          {industries.map((ind, index) => (
            <div className="col" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="industry-item" onClick={() => openGallery(ind.gallery)}>
                <div className="ind-image-wrapper">
                  <img src={ind.image} alt={ind.title} className="ind-image" />
                  <div className="ind-plus-icon">
                    <Plus size={24} />
                  </div>
                </div>
                <div className="ind-content">
                  <h4 className="fw-bold text-white mb-3" style={{ fontSize: '1.25rem' }}>{ind.title}</h4>
                  <p className="text-white-50 small leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

         {/* Lightbox Modal */}
         {activeGallery && (
           <div className="lightbox-overlay" onClick={closeGallery}>
             <button className="lightbox-close" onClick={closeGallery}>
               <X size={32} />
             </button>
             
             <button className="lightbox-nav left" onClick={prevImg}>
               <ChevronLeft size={40} />
             </button>
             
             <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
               <img src={activeGallery[currentImgIndex]} alt="Gallery" className="lightbox-image" />
               <div className="lightbox-counter text-white small mt-3 opacity-75">
                 {currentImgIndex + 1} / {activeGallery.length}
               </div>
             </div>
             
             <button className="lightbox-nav right" onClick={nextImg}>
               <ChevronRight size={40} />
             </button>
           </div>
         )}

      </div>
    </section>
  );
};

export default Industries;
