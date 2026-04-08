import { Box, Settings, Cpu, ShieldCheck, Zap, HeartPulse } from 'lucide-react';

const services = [
  {
    icon: <Box size={32} />,
    title: 'Precision Lifts',
    desc: 'State-of-the-art vertical mobility solutions for luxury residences and commercial spaces.'
  },
  {
    icon: <Settings size={32} />,
    title: 'Custom Engineering',
    desc: 'Tailor-made designs that integrate seamlessly with your architectural vision.'
  },
  {
    icon: <Cpu size={32} />,
    title: 'Smart Automation',
    desc: 'IoT-integrated systems that learn and optimize traffic flow for maximum efficiency.'
  },
  {
    icon: <ShieldCheck size={32} />,
    title: 'Zero-Fail Safety',
    desc: 'Industry-leading safety protocols and redundant systems for absolute peace of mind.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Fast Installation',
    desc: 'Modern construction methods that reduce downtime and assembly time by 40%.'
  },
  {
    icon: <HeartPulse size={32} />,
    title: '24/7 Monitoring',
    desc: 'Predictive maintenance that identifies and solves issues before they even occur.'
  }
];

const Services = () => {
  return (
    <section className="services-section bg-dark-lighter position-relative">
      <div className="container">
        <div className="row justify-content-center text-center mb-5 pb-4">
          <div className="col-lg-7" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-wider fw-bold mb-3">What We Offer</h6>
            <h2 className="display-5 fw-bold text-white mb-4">Engineering Excellence in Every Floor</h2>
            <p className="text-white-50">Our solutions are built with the user in mind, combining sophisticated technology with intuitive operation.</p>
          </div>
        </div>
        
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="glass-card p-5 h-100 transition-all hover-translate-y border-opacity-10">
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-lg d-inline-block mb-4" style={{ borderRadius: '15px' }}>
                  {service.icon}
                </div>
                <h4 className="fw-bold mb-3 text-white">{service.title}</h4>
                <p className="text-white-50 mb-0 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .hover-translate-y:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--primary);
        }
      `}</style>
    </section>
  );
};

export default Services;
