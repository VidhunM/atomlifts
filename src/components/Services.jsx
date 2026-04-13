import passengerImg from '../assets/images/passenger_elevator.png';
import homeLiftImg from '../assets/images/home_lift.png';
import goodsLiftImg from '../assets/images/goods_elevator.png';

const services = [
  {
    id: '01',
    image: passengerImg,
    title: 'Passenger Elevator',
    desc: 'Advanced architectural lift solutions designed for luxury residential and commercial complexes.'
  },
  {
    id: '02',
    image: homeLiftImg,
    title: 'Home Lift',
    desc: 'Elegant and space-efficient vertical mobility solutions tailored for private residences.'
  },
  {
    id: '03',
    image: goodsLiftImg,
    title: 'Goods Elevator',
    desc: 'Heavy-duty freight elevators built for industrial efficiency and maximum payload capacity.'
  }
];

const Services = () => {
  return (
    <section className="services-section bg-dark py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5 pb-5">
          <div className="col-lg-8" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">OUR PRODUCTS</h6>
            <h2 className="display-4 fw-800 text-white mb-0">
              Innovative and <span className="text-primary">Efficient</span> Lift Solutions
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
