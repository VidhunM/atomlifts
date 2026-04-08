import liftObject from '../assets/lift-object.png';
import liftBg from '../assets/lift-bg.png';

const Hero = () => {
  return (
    <section className="hero-section position-relative overflow-hidden" style={{ minHeight: '180vh' }}>
      {/* FULL-SCREEN LIFT BACKGROUND */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ 
          background: `url(${liftBg}) no-repeat center center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed', // Parallax effect for "filling" look
          zIndex: 1
        }}
      ></div>
      
      {/* Removed overlay for full clarity */}

      {/* Animated Yellow Lines Layer */}
      <div className="animated-lines-container" style={{ height: '300px', zIndex: 3 }}>
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
        <span>Explore Atomlifts</span>
        <div className="line" style={{ height: '80px' }}></div>
      </div>

      {/* HERO CONTENT WRAPPER */}
      <div className="container-fluid px-0 position-relative" style={{ zIndex: 10 }}>
        
        {/* TOP SECTION: Typography */}
        <div className="row g-0 align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center py-5 text-center" style={{ paddingTop: '150px' }}>
            <div data-aos="fade-up">
              <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3" style={{ marginTop: '50px' }}>
                "Lift Your Expectations!"
              </h6>
              
              <div className="mb-4">
                <h1 className="huge-heading m-0 text-gradient">ELEVATOR</h1>
                <h1 className="huge-heading huge-heading-outline m-0">ENGINEERING</h1>
              </div>

              <div className="mb-5">
                <button className="btn-premium">Get Started</button>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-6">
                  <p className="text-white opacity-75 hero-sub-text mb-0 fs-5">
                    We specialize in the repair, modernization, and installation of all types of commercial and residential elevators. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Floating Model */}
        <div className="row justify-content-center py-5 position-relative overflow-hidden" style={{ minHeight: '80vh' }}>
           {/* Removed glow for cleaner object view */}

           <div className="col-lg-12 text-center py-5 position-relative" style={{ zIndex: 10 }} data-aos="zoom-in">
              <div className="lift-object-container d-inline-block">
                <img 
                  src={liftObject} 
                  alt="Futuristic Elevator Cabin" 
                  className="lift-main-image"
                  style={{ maxHeight: '90vh', width: 'auto', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.9))' }}
                />
              </div>
           </div>
        </div>
      </div>

      {/* Bottom transition to page content */}
      <div className="position-absolute w-100" style={{ bottom: '0', height: '200px', background: 'linear-gradient(to bottom, transparent, var(--dark))', zIndex: 5 }}></div>
    </section>
  );
};

export default Hero;
