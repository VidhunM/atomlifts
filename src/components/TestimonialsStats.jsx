import { Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
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
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}</span>;
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Hours of Works', value: 8240 },
    { label: 'Projects Done', value: 315 },
    { label: 'Satisfied Customers', value: 250 },
    { label: 'Awards Winning', value: 32 }
  ];

  return (
    <section className="testi-stats-section bg-dark py-5 position-relative">
      <div className="container py-5">
        
        {/* Testimonial Slider */}
        <div className="row justify-content-center text-center mb-5 pb-5">
          <div className="col-lg-9" data-aos="fade-up">
            <div className="d-flex justify-content-center gap-1 mb-4 text-primary">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>

            <div className="testimonial-slider-content min-h-200">
               <h2 className="display-5 fw-bold text-white mb-4 leading-tight italic">
                 "{testimonials[activeIndex].text}"
               </h2>
               <h5 className="text-primary fw-bold mb-1">{testimonials[activeIndex].author}</h5>
               <p className="text-white-50 small tracking-widest text-uppercase">{testimonials[activeIndex].location}</p>
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

        {/* Stats Counter Grid */}
        <div className="row g-4 pt-5">
          {stats.map((stat, index) => (
            <div className="col-lg-3 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="stat-card-new shadow-xl">
                <div className="stat-number-new">
                  <Counter end={stat.value} />
                </div>
                <div className="stat-label-new">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsStats;
