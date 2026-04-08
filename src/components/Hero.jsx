import heroImg from '../assets/images/h1.jpg';
import celestialBg from '../assets/celestial-bg.png';

const Hero = () => {
  return (
    <section className="hero-section position-relative bg-dark" style={{ overflow: 'hidden' }}>
      {/* Background Celestial Layer - Absolute to Hero Area Only */}
      <div 
        className="position-absolute top-0 start-0 w-100" 
        style={{ 
          height: '100%',
          background: `url(${celestialBg}) no-repeat center center`,
          backgroundSize: 'cover',
          opacity: 0.3,
          zIndex: 1
        }}
      ></div>

      {/* Animated Yellow Lines Layer - Absolute to Hero Area only */}
      <div className="animated-lines-container" style={{ height: '300px' }}>
        <div className="lines-track">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="line-item"></div>
          ))}
          {[...Array(40)].map((_, i) => (
            <div key={i + 40} className="line-item"></div>
          ))}
        </div>
      </div>

      {/* Vertical Scroll Indicator (Left) */}
      <div className="scroll-indicator-vertical d-none d-md-flex" style={{ zIndex: 20 }}>
        <span>Scroll to top</span>
        <div className="line" style={{ height: '60px' }}></div>
      </div>

      {/* MAIN HERO CONTENT - 100vh Split */}
      <div className="container-fluid px-0">
        <div className="row g-0 align-items-center" style={{ minHeight: '100vh' }}>
          
          {/* Section 1: Content & Giant Typography (Left) */}
          <div className="col-lg-6 d-flex flex-column justify-content-center hero-content py-5" style={{ paddingLeft: 'calc(50px + 5%)' }}>
            <div className="text-start pe-lg-5" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3">
                "Lift Your Expectations!"
              </h6>
              
              <div className="mb-4">
                <h1 className="huge-heading m-0">ELEVATOR</h1>
                <h1 className="huge-heading huge-heading-outline m-0">ENGINEERING</h1>
              </div>

              <div className="mb-5">
                <button className="btn-premium">Get Started</button>
              </div>

              <p className="text-white-50 hero-sub-text mb-0 fs-5 border-start border-primary border-3 ps-4 py-1">
                We specialize in the repair, modernization, and installation of all types of commercial and residential elevators. 
              </p>
            </div>
          </div>

          {/* Section 2: Large Floating Lift Image (Right) */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center py-5 position-relative">
            <div className="px-4 text-center" data-aos="zoom-in" data-aos-delay="200" style={{ zIndex: 10 }}>
              <img 
                src={heroImg} 
                alt="Modern Elevator" 
                className="lift-main-image rounded-4"
                style={{ maxHeight: '70vh', width: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* SECOND SECTION (Text Only) - Aligns below Hero */}
        <div className="row justify-content-center py-5 bg-dark-lighter position-relative" style={{ zIndex: 11 }}>
           <div className="col-lg-9 text-center py-5 px-4" data-aos="fade-up">
              <h2 className="display-5 fw-bold text-white mb-4 uppercase">Reliability & Safety First</h2>
              <div className="row justify-content-center">
                <div className="col-md-10">
                   <p className="text-white-50 lead mb-0">
                    Our experienced technicians are available to provide reliable and timely service, 
                    ensuring your safety and satisfaction through every floor. From smart automation to heavy-duty industrial lifts, 
                    we bring the future of vertical mobility to your building today.
                  </p>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Subtle Overlay to blend hero with bottom section */}
      <div className="position-absolute w-100" style={{ bottom: '0', height: '100px', background: 'linear-gradient(to bottom, transparent, var(--dark))', zIndex: 5 }}></div>
    </section>
  );
};

export default Hero;
