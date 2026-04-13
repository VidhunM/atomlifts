import engineerImg from '../assets/engineer_new.png';

const AboutEngineering = () => {
  const tags = [
    { prefix: 'ISO 9001', title: 'Quality Standards' },
    { prefix: '24/7', title: 'Smart Monitoring' },
    { prefix: 'Predictive', title: 'Maintenance' },
    { prefix: 'Safety', title: 'First Protocol' },
    { prefix: 'Global', title: 'Parts Network' },
  ];

  return (
    <section className="about-eng-section bg-dark py-4 overflow-hidden">
      <div className="container py-2">
        <div className="row g-5 align-items-center">
          
          {/* Left Side: Image with Animated Bars */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="eng-image-container shadow-2xl">
              <img src={engineerImg} alt="Lead Engineer" className="eng-image" />
              
              {/* Animated Bars Over Image */}
              <div className="eng-bars-overlay">
                <div className="eng-bars-track">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="eng-bar"></div>
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div key={`repeat-${i}`} className="eng-bar"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content and Animated Tags */}
          <div className="col-lg-6 ps-lg-5" data-aos="fade-left">
            <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">OUR EXPERTISE</h6>
            <h2 className="display-4 fw-800 text-white mb-4">
              Precision <span className="text-primary">Engineering</span> Systems
            </h2>
            <p className="text-white-50 fs-5 mb-5 leading-relaxed">
              At Atomlifts, we don't just maintain elevators; we engineer the future of vertical mobility. 
              Our certified specialists deploy advanced diagnostics and IoT-integrated solutions to ensure 
              your systems operate with surgical precision and absolute safety, day and night.
            </p>

            {/* Horizontal Scrolling Tags */}
            <div className="tag-cloud-container">
              <div className="tag-track">
                {tags.concat(tags).map((tag, index) => (
                  <div className="tag-item d-flex align-items-center" key={index}>
                    <span>{tag.prefix}</span> {tag.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutEngineering;
