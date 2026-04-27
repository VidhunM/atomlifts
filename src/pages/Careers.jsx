
import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Clock, ChevronRight, CheckCircle2, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/images/careers-hero.png';
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
      location: "Bangalore, Chennai, Madurai...",
      id: 3
    },
    {
      title: "Senior Business Development Executive",
      category: "Development",
      type: "Full time",
      location: "Coimbatore",
      id: 4
    }
  ];

  return (
    <div className="careers-page bg-dark min-vh-100 pb-5">
      {/* Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '500px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Join Our Mission</h6>
              <h1 className="huge-contact-title mb-4">
                CAREERS <span className="text-primary">AT ATOM</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Shape the future of vertical mobility with a team of innovators, engineers, and visionaries.
              </p>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={heroImg} alt="Careers at Atom" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filters-section py-5">
        <div className="container">
          <div className="glass-card-dark p-4 shadow-2xl mb-5" data-aos="fade-up">
            <div className="row g-3 align-items-center">
              <div className="col-lg-4">
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50" size={18} />
                  <input 
                    type="text" 
                    className="form-control bg-dark-lighter border-white border-opacity-10 text-white ps-5 py-3 shadow-none rounded-0" 
                    placeholder="Search for jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-select bg-dark-lighter border-white border-opacity-10 text-white py-3 shadow-none rounded-0">
                  <option>All Job Category</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-select bg-dark-lighter border-white border-opacity-10 text-white py-3 shadow-none rounded-0">
                  <option>All Job Type</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-select bg-dark-lighter border-white border-opacity-10 text-white py-3 shadow-none rounded-0">
                  <option>All Job Location</option>
                </select>
              </div>
              <div className="col-lg-2">
                <button className="btn-premium w-100 py-3 rounded-0">Search</button>
              </div>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="row g-4">
            {jobs.map((job, i) => (
              <div className="col-lg-3 col-md-6" key={job.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="job-card-premium p-4 h-100">
                  <h4 className="text-white fw-800 mb-4 h-100 min-h-80">{job.title}</h4>
                  <div className="job-info-list mb-4">
                    <div className="d-flex align-items-center gap-2 mb-2 text-white-50 small">
                      <Briefcase size={14} className="text-primary" /> {job.category}
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2 text-white-50 small">
                      <Clock size={14} className="text-primary" /> {job.type}
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-4 text-white-50 small">
                      <MapPin size={14} className="text-primary" /> {job.location}
                    </div>
                  </div>
                  <Link to={`/careers/details/${job.id}`} className="text-primary text-decoration-none fw-bold small d-flex align-items-center gap-1 hover-gap">
                    More Details <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="trusted-section py-5 my-lg-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="glass-card-dark p-2 overflow-hidden shadow-2xl">
                <img src={trustedImg} alt="Trusted by Customers" className="w-100 rounded" />
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="ps-lg-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Works About</h6>
                <h2 className="huge-contact-title mb-4" style={{ fontSize: '3.5rem' }}>
                  Trusted by <span className="text-primary">1,000+</span> Happy Customers
                </h2>
                <p className="text-white-50 mb-5 leading-relaxed">
                  For decades, we’ve been dedicated to delivering reliable and innovative solutions that make a difference. 
                  Our focus has always been on building trust through quality, efficiency, and service that goes beyond expectations.
                </p>
                
                <div className="trusted-features">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="icon-circle-small">
                      <CheckCircle2 className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="text-white mb-0 fw-800">100% Client Satisfaction</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-circle-small">
                      <Users className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="text-white mb-0 fw-800">Skilled & Professional Team</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .glass-card-dark { background:#0a0a0a; border: 1px solid rgba(255,255,255,0.05); border-radius:4px; }
        .bg-dark-lighter { background: #111; }
        .job-card-premium {
          background: #0a0a0a; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px; transition: 0.4s;
        }
        .job-card-premium:hover {
          transform: translateY(-10px); border-color: var(--primary);
          background: rgba(248,192,45,0.02);
        }
        .min-h-80 { min-height: 80px; }
        .icon-circle-small {
          width: 35px; height: 35px; background: rgba(248,192,45,0.1);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .hover-gap { transition: gap 0.3s ease; }
        .job-card-premium:hover .hover-gap { gap: 10px !important; }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
};

export default Careers;
