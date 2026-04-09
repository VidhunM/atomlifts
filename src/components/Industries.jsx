import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ind1 from '../assets/ind1.png';
import ind2 from '../assets/ind2.png';
import ind3 from '../assets/ind3.png';
import ind4 from '../assets/ind4.png';

const industries = [
  {
    image: ind1,
    title: 'Commercial Real Estate',
    desc: 'High-traffic elevator solutions for corporate towers and luxury office complexes.'
  },
  {
    image: ind2,
    title: 'Modern Healthcare',
    desc: 'Precision hospital lifts designed for critical patient transport and hygiene standards.'
  },
  {
    image: ind3,
    title: 'Industrial Logistics',
    desc: 'Heavy-duty freight elevators for warehouses and smart manufacturing facilities.'
  },
  {
    image: ind4,
    title: 'Luxury Residential',
    desc: 'Custom-designed private elevators for high-end villas and residential developments.'
  }
];

const Industries = () => {
  return (
    <section className="industries-section bg-dark py-5 position-relative">
      <div className="container py-5 mt-5">
        
        {/* Section Header with Nav Arrows */}
        <div className="row align-items-end mb-5 pb-4">
          <div className="col-lg-8" data-aos="fade-right">
            <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">WHAT WE DO</h6>
            <h2 className="display-4 fw-800 text-white mb-0">
               Industry We <span className="text-primary">Serve</span>
            </h2>
          </div>
          <div className="col-lg-4 d-flex justify-content-lg-end mt-4 mt-lg-0" data-aos="fade-left">
             <button className="ind-nav-btn shadow-lg">
                <ChevronLeft size={20} />
             </button>
             <button className="ind-nav-btn shadow-lg">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="row g-4">
          {industries.map((ind, index) => (
            <div className="col-lg-3 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="industry-item">
                <div className="ind-image-wrapper">
                  <img src={ind.image} alt={ind.title} className="ind-image" />
                  <div className="ind-plus-icon">
                    <Plus size={24} />
                  </div>
                </div>
                <div className="ind-content">
                  <h4 className="fw-bold text-white mb-3" style={{ fontSize: '1.25rem' }}>{ind.title}</h4>
                  <p className="text-white-50 small leading-relaxed">
                    {ind.desc}
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

export default Industries;
