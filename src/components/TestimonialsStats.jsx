import { Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      } else {
        setCount(0);
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const testimonials = [
  {
    text: "The precision of Atomlifts engineering is unmatched. Every floor transition is seamless, safe, and whisper-quiet. A true vertical breakthrough.",
    author: "Richard V.",
    location: "Mumbai, India"
  },
  {
    text: "Innovating the core of our building was easy with their smart systems. The real-time monitoring gives our facility managers total peace of mind.",
    author: "Elena M.",
    location: "Dubai, UAE"
  },
  {
    text: "From logistics to luxury, their vertical mobility solutions are high-speed, high-tech, and high-impact. The best in the business.",
    author: "Marcus K.",
    location: "Berlin, Germany"
  }
];

const TestimonialsStats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide for mobile stats grid
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

  const stats = [
    { label: 'Project', value: 500, suffix: '+' },
    { label: 'Satisfied Customer', value: 1000, suffix: '+' },
    { label: 'On Going', value: 200, suffix: '+' },
    { label: 'Own R&D Unit', image: '/strength.png' }
  ];

  return (
    <section className="testi-stats-section bg-dark py-5 position-relative overflow-hidden">
      <div className="container py-5">
        
        {/* Testimonial Slider */}
        <div className="row justify-content-center text-center mb-5 pb-5">
          <div className="col-lg-9" data-aos="fade-up">
            <div className="d-flex justify-content-center gap-1 mb-4 text-primary">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>

            <div className="testimonial-slider-content min-h-200 position-relative overflow-hidden">
               {/* Background Number Animation */}
               <div className="testimonial-bg-number" key={`bg-${activeIndex}`}>
                 {(activeIndex + 1).toString().padStart(2, '0')}
               </div>
               
               <div className="fade-in-up" key={activeIndex}>
                 <h2 className="display-5 fw-bold text-white mb-4 leading-tight italic">
                   "{testimonials[activeIndex].text}"
                 </h2>
                 <h5 className="text-primary fw-bold mb-1">{testimonials[activeIndex].author}</h5>
                 <p className="text-white-50 small tracking-widest text-uppercase">{testimonials[activeIndex].location}</p>
               </div>
            </div>

            <div className="d-flex justify-content-center mt-5">
               {testimonials.map((_, i) => (
                 <div 
                   key={i} 
                   className={`testi-dot ${i === activeIndex ? 'active' : ''}`}
                   onClick={() => setActiveIndex(i)}
                 ></div>
               ))}
            </div>
          </div>
        </div>

        {/* Stats Counter Grid - REVERTED TO OLD 4-COLUMN DESIGN */}
        <div className="row g-4 pt-5 mobile-slider-row" ref={sliderRef}>
          {stats.map((stat, index) => (
            <div className="col-lg-3 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="stat-card-new shadow-xl bg-glass border-glass rounded-4 p-4 text-center h-100">
                <div className="stat-number-new display-4 fw-800 mb-2">
                  {stat.image ? (
                    <div className="py-2 d-flex justify-content-center align-items-center">
                      <img 
                        src={stat.image} 
                        alt={stat.label} 
                        style={{ 
                          height: '60px', 
                          width: 'auto', 
                          objectFit: 'contain',
                          filter: 'brightness(0) saturate(100%) invert(80%) sepia(61%) saturate(1131%) hue-rotate(345deg) brightness(101%) contrast(96%)'
                        }} 
                        className="img-fluid"
                      />
                    </div>
                  ) : stat.isIcon ? (
                    <div className="text-primary py-2">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 11-1-1q-1-1-2-1t-2 1l-1 1" />
                        <path d="M15 11c1 0 2 .5 3 1.5s1 2.5 1 3.5-1 2-2 3-2 1-3 1h-4c-1 0-2-.5-3-1.5S6 16.5 6 15.5s1-2 2-3 2-1 3-1" />
                        <path d="M12 9V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                        <path d="M10 21v-3" />
                        <path d="M14 21v-3" />
                      </svg>
                    </div>
                  ) : (
                    <Counter end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="stat-label-new opacity-75 text-uppercase tracking-wider small fw-bold text-white">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsStats;
