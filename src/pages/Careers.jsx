import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, ChevronRight, CheckCircle2, Users, Rocket, ZapIcon, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import trustedImg from '../assets/images/trusted-grid.png';

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const jobs = [
    {
      title: "Store & Dispatch Incharge",
      category: "Factory",
      type: "Full time",
      location: "Chennai",
      id: 1
    },
    {
      title: "Site Coordinators",
      category: "Development",
      type: "Full time",
      location: "Chennai",
      id: 2
    },
    {
      title: "Branch Manager",
      category: "Management",
      type: "Full time",
      location: "Bangalore, Chennai...",
      id: 3
    },
    {
      title: "Senior Business Development",
      category: "Development",
      type: "Full time",
      location: "Coimbatore",
      id: 4
    }
  ];

  return (
    <div className="careers-page bg-dark min-vh-100 pb-5">
      {/* Cinematic Hero Section */}
      <section className="careers-hero position-relative d-flex align-items-center justify-content-center text-center overflow-hidden pt-5" style={{ zIndex: 1 }}>
        <div className="hero-bg-overlay"></div>
        <div className="container position-relative z-10 pt-5 mt-4 mt-lg-5">
          <div className="d-inline-block mb-4 px-4 py-2 rounded-pill border-glow" data-aos="fade-down">
            <span className="text-warning small fw-900 tracking-widest text-uppercase d-flex align-items-center gap-2">
              <Rocket size={16} /> Shape The Future
            </span>
          </div>
          <h1 className="hero-title text-white mb-4 fw-900 text-uppercase" data-aos="zoom-in" data-aos-delay="100">
            Build Your <br className="d-block d-md-none" />
            <span className="text-warning glow-text">Legacy</span>
          </h1>
          <p className="lead text-light max-w-600 mx-auto mb-5" data-aos="fade-up" data-aos-delay="200" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Join a team of visionary engineers, designers, and innovators revolutionizing vertical mobility across the globe.
          </p>
        </div>
        
        {/* Animated Background Elements */}
        <div className="ambient-glow position-absolute top-50 start-50 translate-middle"></div>
      </section>

      {/* Floating Filter Bar */}
      <section className="filter-section container position-relative" style={{ zIndex: 20 }} data-aos="fade-up" data-aos-delay="300">
        <div className="glass-filter-bar p-3 p-lg-4 rounded-3 shadow-2xl">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-lg-4">
              <div className="position-relative">
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white" size={18} />
                <input 
                  type="text" 
                  className="form-control premium-input ps-5" 
                  placeholder="Search for roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <select className="form-select premium-select">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Management</option>
                <option>Sales</option>
              </select>
            </div>
            <div className="col-6 col-lg-3">
              <select className="form-select premium-select">
                <option>All Locations</option>
                <option>Chennai</option>
                <option>Bangalore</option>
                <option>Coimbatore</option>
              </select>
            </div>
            <div className="col-12 col-lg-2">
              <button className="btn-premium w-100 h-100 py-3 m-0 d-flex justify-content-center align-items-center" style={{ minHeight: '50px' }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="open-positions py-5 my-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5" data-aos="fade-right">
            <div>
              <h6 className="text-warning text-uppercase tracking-widest fw-800 mb-2 small">Current Openings</h6>
              <h2 className="display-5 fw-900 text-white mb-0">Join The <span className="text-warning">Team</span></h2>
            </div>
            <p className="text-light mb-0 mt-3 mt-md-0 small fw-bold">{jobs.length} Positions Available</p>
          </div>

          <div className="row g-4">
            {jobs.map((job, i) => (
              <div className="col-12 col-md-6 col-xl-3" key={job.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="job-card-elite p-4 h-100 d-flex flex-column">
                  <div className="mb-4">
                    <h4 className="text-white fw-900 mb-0 job-title">{job.title}</h4>
                  </div>
                  
                  <div className="job-meta mt-auto mb-4">
                    <div className="d-flex align-items-center gap-2 mb-2 text-white-50 small fw-bold">
                      <Clock size={16} className="text-warning" /> {job.type}
                    </div>
                    <div className="d-flex align-items-center gap-2 text-white-50 small fw-bold">
                      <MapPin size={16} className="text-warning" /> {job.location}
                    </div>
                  </div>
                  
                  <Link to={`/careers/details/${job.id}`} className="apply-btn-elite text-decoration-none">
                    <span>View Details</span>
                    <div className="icon-wrapper"><ChevronRight size={18} /></div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us & Culture */}
      <section className="culture-section py-5 bg-dark-lighter position-relative overflow-hidden">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-right">
              <h6 className="text-warning text-uppercase tracking-widest fw-800 mb-3 small">Life At Atom</h6>
              <h2 className="display-4 fw-900 text-white mb-4">
                More Than Just A <span className="text-warning">Workplace</span>
              </h2>
              <p className="text-light mb-5 lead fs-6">
                We foster an environment where innovation thrives, ideas are heard, and every team member has the opportunity to make a massive impact on the future of infrastructure.
              </p>
              
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="culture-feature d-flex gap-3">
                    <div className="culture-icon"><ZapIcon size={24} /></div>
                    <div>
                      <h5 className="text-white fw-bold mb-1">Innovation First</h5>
                      <p className="text-white-50 small mb-0">Work with cutting-edge tech.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="culture-feature d-flex gap-3">
                    <div className="culture-icon"><Globe size={24} /></div>
                    <div>
                      <h5 className="text-white fw-bold mb-1">Global Impact</h5>
                      <p className="text-white-50 small mb-0">Projects that change skylines.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="culture-feature d-flex gap-3">
                    <div className="culture-icon"><Shield size={24} /></div>
                    <div>
                      <h5 className="text-white fw-bold mb-1">Health & Wellness</h5>
                      <p className="text-white-50 small mb-0">Comprehensive benefits package.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="culture-feature d-flex gap-3">
                    <div className="culture-icon"><Users size={24} /></div>
                    <div>
                      <h5 className="text-white fw-bold mb-1">Top-Tier Team</h5>
                      <p className="text-white-50 small mb-0">Collaborate with industry experts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left">
              <div className="culture-image-wrapper position-relative">
                <div className="glass-card-dark p-2 overflow-hidden shadow-2xl rounded-4 position-relative z-10 border-warning-subtle">
                  <img src={trustedImg} alt="Atom Culture" className="w-100 rounded-3 object-fit-cover" style={{ minHeight: '400px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-4 my-4 py-lg-5 my-lg-5">
        <div className="container">
          <div className="glass-card-dark p-4 p-lg-5 text-center overflow-hidden position-relative rounded-4" data-aos="zoom-in">
            <div className="position-relative z-10">
              <h2 className="display-5 fw-800 text-white mb-3">Don't see a fit?</h2>
              <p className="text-light mb-4 max-w-600 mx-auto">
                We're always looking for exceptional talent. Send us your resume and we'll reach out when a matching role opens up.
              </p>
              <Link to="/contact" className="btn-premium px-5 py-3 text-decoration-none">
                Submit Resume <ChevronRight className="ms-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero Section */
        .careers-hero {
          min-height: 55vh;
          background: #050505;
          padding-bottom: 80px;
        }
        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .hero-bg-overlay {
          position: absolute; top:0; left:0; width:100%; height:100%;
          background: radial-gradient(circle at center, rgba(248,192,45,0.08) 0%, rgba(5,5,5,1) 80%);
          z-index: 1;
        }
        .border-glow {
          background: rgba(248,192,45,0.08);
          border: 1px solid rgba(248,192,45,0.4);
          box-shadow: 0 0 20px rgba(248,192,45,0.15);
        }
        .glow-text { text-shadow: 0 0 30px rgba(248,192,45,0.5); }
        .ambient-glow {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(248,192,45,0.1) 0%, transparent 60%);
          z-index: 0; filter: blur(50px);
        }

        /* Filter Bar */
        .filter-section {
          margin-top: -60px;
        }
        .glass-filter-bar {
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .premium-input, .premium-select {
          background: #1a1a1a !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
          color: white !important;
          padding: 14px 20px;
          border-radius: 6px;
          transition: 0.3s;
          box-shadow: none !important;
        }
        .premium-input::placeholder { color: rgba(255,255,255,0.5); }
        .premium-input:focus, .premium-select:focus {
          border-color: var(--warning) !important;
          background: #222 !important;
        }
        .premium-select { cursor: pointer; }

        /* Job Cards */
        .job-card-elite {
          background: linear-gradient(145deg, #181818, #0a0a0a);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
        }
        .job-card-elite::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(248,192,45,0.04), transparent);
          transform: skewX(-25deg); transition: 0.7s;
        }
        .job-card-elite:hover::before { left: 200%; }
        .job-card-elite:hover {
          transform: translateY(-8px);
          border-color: rgba(248,192,45,0.4);
          box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(248,192,45,0.1);
        }
        .job-title { font-size: 1.25rem; line-height: 1.3; }

        /* Apply Button inside Card */
        .apply-btn-elite {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 20px; border-radius: 6px;
          color: white; font-size: 0.8rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.05em;
          transition: 0.3s;
        }
        .apply-btn-elite .icon-wrapper {
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: 0.3s;
        }
        .job-card-elite:hover .apply-btn-elite {
          background: var(--warning); color: #000; border-color: var(--warning);
        }
        .job-card-elite:hover .icon-wrapper {
          background: #000; color: var(--warning); transform: translateX(5px);
        }

        /* Culture Section */
        .culture-icon {
          width: 50px; height: 50px;
          background: rgba(248,192,45,0.15);
          color: #f8c02d !important;
          border: 1px solid rgba(248,192,45,0.3);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: 0.3s;
        }
        .culture-feature:hover .culture-icon {
          background: var(--warning); color: #000; transform: scale(1.1) rotate(5deg);
        }
        .border-warning-subtle { border-color: rgba(248,192,45,0.3) !important; }

        /* Mobile Specific Fixes */
        @media (max-width: 991px) {
          .careers-hero { min-height: 45vh; padding-top: 120px; padding-bottom: 60px; }
          .hero-title { font-size: 2.8rem; }
          .filter-section { margin-top: -30px; }
          .glass-filter-bar { padding: 20px !important; }
          .premium-input, .premium-select { padding: 12px 15px; font-size: 0.95rem; }
          .job-title { font-size: 1.15rem; }
          .culture-image-wrapper img { min-height: 250px !important; }
        }
      `}</style>
    </div>
  );
};

export default Careers;
