import { CheckCircle2, Trophy, Clock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page pt-5">
      <section className="about-hero py-5 mt-5">
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h6 className="text-primary text-uppercase fw-bold mb-3">Our Mission</h6>
              <h1 className="display-4 fw-bold text-white mb-4">Pioneering the Next Generation of <span className="text-gradient">Vertical Travel</span></h1>
              <p className="text-white-50 lead mb-5">
                Atomlifts was founded on a simple principle: to transform the way people move between spaces. We don't just build elevators; we create seamless journeys.
              </p>
              
              <div className="row g-4 mb-5">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <CheckCircle2 className="text-primary" />
                    <span className="text-white fw-medium">Safety First Design</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <CheckCircle2 className="text-primary" />
                    <span className="text-white fw-medium">Carbon Neutral Ops</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <CheckCircle2 className="text-primary" />
                    <span className="text-white fw-medium">24/7 Global Support</span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <CheckCircle2 className="text-primary" />
                    <span className="text-white fw-medium">Smart AI Logistics</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <div className="glass-card p-4">
                 <div style={{ height: '400px', background: 'linear-gradient(135deg, #1a2a44 0%, #00d2ff 100%)', borderRadius: '15px' }} className="opacity-25 d-flex align-items-center justify-content-center">
                    <Users size={100} className="text-white" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section bg-dark-lighter py-5">
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { icon: <Trophy />, count: '250+', label: 'Industry Awards' },
              { icon: <Users />, count: '10M+', label: 'Daily Riders' },
              { icon: <Clock />, count: '99.9%', label: 'Uptime Rate' },
              { icon: <CheckCircle2 />, count: '15k+', label: 'Active Lifts' }
            ].map((stat, i) => (
              <div className="col-md-3" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="p-4">
                  <div className="text-primary mb-3 d-inline-block p-3 glass-card rounded-circle">
                    {stat.icon}
                  </div>
                  <h2 className="fw-bold text-white mb-1">{stat.count}</h2>
                  <p className="text-white-50 small text-uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
