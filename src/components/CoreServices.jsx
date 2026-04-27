
import { Settings, Hammer, Zap, RefreshCcw, SearchCheck, UserCheck, FileSignature, PhoneForwarded, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const coreServices = [
  // Group 1
  {
    icon: <Settings size={40} />,
    title: 'Spares Manufacturing',
    desc: 'Precision engineering and fabrication of custom elevator and escalator components to global standards.'
  },
  {
    icon: <Hammer size={40} />,
    title: 'Installation & Removal',
    desc: 'Professional end-to-end installation and expert dismantling for both new builds and site upgrades.'
  },
  {
    icon: <Zap size={40} />,
    title: 'Enhancement Services',
    desc: 'Comprehensive performance optimization solutions designed to extend the life of your vertical mobility systems.'
  },
  {
    icon: <RefreshCcw size={40} />,
    title: 'Modernization',
    desc: 'Full-scale system updates providing reliable maintenance and advanced repair services for all lift types.'
  },
  // Group 2
  {
    icon: <SearchCheck size={40} />,
    title: 'Consultation & Analysis',
    desc: 'Expert advice and safety audits to ensure your elevators are operating at peak efficiency.'
  },
  {
    icon: <UserCheck size={40} />,
    title: 'AMC / One-Time Service',
    desc: 'Specialized maintenance plans providing single and comprehensive solutions for total peace of mind.'
  },
  {
    icon: <FileSignature size={40} />,
    title: 'Licensing Services',
    desc: 'Efficient and cost-effective approach to new lift licensing and regulatory renewals.'
  },
  {
    icon: <PhoneForwarded size={40} />,
    title: 'Call Backs & Repair',
    desc: 'Rapid response elevator service offering comprehensive repairs for your daily operational needs.'
  }
];

const CoreServices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 4));

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : (window.innerWidth < 1024 ? 2 : 4));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(coreServices.length / itemsPerPage);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section className="core-services-section bg-dark py-5 position-relative overflow-hidden">
      <div className="container py-2">
        
        {/* Section Header with Slider Navigation */}
        <div className="row align-items-end mb-5 pb-4">
          <div className="col-lg-8" data-aos="fade-right">
            <div className="d-flex flex-column align-items-start mb-4">
              <div style={{ width: '50px', height: '4px', background: 'var(--primary)', marginBottom: '20px' }}></div>
              <h6 className="text-primary text-uppercase tracking-wide fw-bold small">Our Engineering</h6>
            </div>
            <h2 className="display-4 fw-800 text-white mb-0">
              We <span className="text-primary">Lift</span> You Up
            </h2>
          </div>
          <div className="col-lg-4 d-flex justify-content-lg-end mt-4 mt-lg-0" data-aos="fade-left">
             <button onClick={prevSlide} className="ind-nav-btn shadow-lg me-3">
                <ChevronLeft size={20} />
             </button>
             <button onClick={nextSlide} className="ind-nav-btn shadow-lg">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {/* Core Services Slider Track */}
        <div className="core-slider-overflow">
          <div 
            className="row g-0 transition-all duration-700" 
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              display: 'flex',
              flexWrap: 'nowrap',
              transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {coreServices.map((service, index) => (
              <div 
                className="flex-shrink-0 px-2" 
                key={index}
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="core-service-card shadow-xl p-4 text-center h-100 mx-1">
                  <div className="core-icon-box mb-4 text-primary">
                    {service.icon}
                  </div>
                  <h4 className="fw-bold text-white mb-3" style={{ fontSize: '1.25rem' }}>{service.title}</h4>
                  <p className="text-white-50 small leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Pagination Dots */}
        <div className="d-flex justify-content-center mt-4">
           {[...Array(totalSlides)].map((_, i) => (
             <div 
               key={i} 
               onClick={() => setCurrentSlide(i)}
               className={`testi-dot ${i === currentSlide ? 'active' : ''}`}
             ></div>
           ))}
        </div>

      </div>
      <style>{`
        @media (max-width: 991px) {
          .core-services-section .row.align-items-end { text-align: center; }
          .core-services-section .d-flex.flex-column.align-items-start { align-items: center !important; }
        }
      `}</style>
    </section>
  );
};

export default CoreServices;
