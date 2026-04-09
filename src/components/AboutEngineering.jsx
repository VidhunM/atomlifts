import engineerImg from '../assets/engineer.png';

const AboutEngineering = () => {
  const tags = [
    { prefix: 'Certified', title: 'Global Standards' },
    { prefix: 'Safety', title: 'Zero-Fail Rated' },
    { prefix: 'Licensed', title: 'Building Code Expert' },
    { prefix: 'Data', title: 'Cloud Integrated' },
    { prefix: 'Insured', title: 'Global Liability' },
  ];

  return (
    <section className="about-eng-section bg-dark py-5 overflow-hidden">
      <div className="container py-5 mt-5">
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
              Authorized <span className="text-primary">Professionals</span>
            </h2>
            <p className="text-white-50 fs-5 mb-5 leading-relaxed">
              Ascend with confidence knowing your projects are in the hands of certified lift engineers. 
              Our team combines extensive training, industry-leading certifications, and real-world 
              mechanical experience to deliver precise, efficient, and safe vertical mobility solutions for every building.
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
