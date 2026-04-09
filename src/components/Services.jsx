import service1 from '../assets/service1.png';
import service2 from '../assets/service2.png';
import service3 from '../assets/service3.png';

const services = [
  {
    id: '01',
    image: service1,
    title: 'Precision Elevator Engineering',
    desc: 'Advanced architectural lift solutions designed for luxury residential and commercial complexes.'
  },
  {
    id: '02',
    image: service2,
    title: 'Smart Control Systems',
    desc: 'Intelligent IoT-enabled elevator management for optimized traffic and efficiency.'
  },
  {
    id: '03',
    image: service3,
    title: 'Premium Maintenance',
    desc: 'Expert technical support and proactive safety inspections to ensure zero downtime.'
  }
];

const Services = () => {
  return (
    <section className="services-section bg-dark py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header based on reference image */}
        <div className="row justify-content-center text-center mb-5 pb-5">
          <div className="col-lg-8" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">OUR SERVICES</h6>
            <h2 className="display-4 fw-800 text-white mb-0">
              Innovative and <span className="text-primary">Efficient</span> Lift Services
            </h2>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="row g-5">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={service.id} data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="service-card-new h-100">
                
                {/* Image Wrapper with Number Tag */}
                <div className="service-card-img-wrapper">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="service-card-img shadow-lg"
                  />
                  <div className="service-number-tag shadow-lg">
                    {service.id}
                  </div>
                </div>

                {/* Content below the image */}
                <div className="service-content px-3">
                  <h4 className="service-title-new">{service.title}</h4>
                  <p className="service-desc-new">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
