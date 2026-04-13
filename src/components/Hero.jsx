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
        <div className="row g-0 align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center py-5 text-center" style={{ paddingTop: '150px' }}>
            <div data-aos="fade-up">
              <h5 className="text-uppercase tracking-widest fw-bold mb-4" style={{ marginTop: '50px', letterSpacing: '0.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)', color: '#FFD700', opacity: 1 }}>
                "Lift Your Expectations!"
              </h5>

              <div className="mb-4 position-relative d-flex flex-column align-items-center">
                <h1 className="huge-heading-3d m-0 text-white" style={{ lineHeight: '0.8' }}>ELEVATOR</h1>
                <h1 className="huge-heading-3d m-0 text-white" style={{ lineHeight: '0.8' }}>ENGINEERING</h1>

                <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 100 }}>
                  <button className="btn-premium btn-animate-up shadow-2xl border-0">
                    <span className="btn-text-wrapper small fw-900">GET STARTED</span>
                    <span className="btn-text-new small fw-900">GET STARTED</span>
                  </button>
                </div>
              </div>


              <div className="row justify-content-center">
                <div className="col-md-7 mt-5">
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
