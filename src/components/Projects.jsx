import React, { useState } from 'react';
import liftInstallationImg from '../assets/lift_installation.png';
import factoryProductionImg from '../assets/factory_production.png';
import completedProjectImg from '../assets/completed_project.png';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('installations');

  const tabsData = {
    installations: {
      title: 'Recent Installations & Site Work',
      subtitle: 'ON-SITE ENGINEERING & QUALITY ASSURANCE',
      image: liftInstallationImg,
      badge: 'Active Site Work',
      desc: 'Our certified vertical mobility engineers are active on sites globally, ensuring flawless installation of complex elevator shaft frames, heavy-duty traction cables, and precise safety gear mechanisms. We prioritize rigorous testing and absolute alignment to sub-millimeter tolerances.',
      features: [
        { label: 'Shaft Alignment', val: 'Sub-millimeter laser calibration' },
        { label: 'Cabling & Traction', val: 'High-tensile multi-alloy steel cables' },
        { label: 'On-Site Safety', val: '100% compliant with international standards' },
        { label: 'Team', val: 'Certified senior mobility experts on-duty' }
      ]
    },
    completed: {
      title: 'Bespoke Completed Projects',
      subtitle: 'PREMIUM ARCHITECTURAL MOBILITY SYSTEMS',
      image: completedProjectImg,
      badge: 'Live Showcase',
      desc: 'Witness our finished masterpieces. From custom panoramic glass capsule elevators in luxury high-rises to high-speed commercial lifts in futuristic corporate hubs. Each completed project stands as a testament to state-of-the-art aesthetics and ultra-smooth riding comfort.',
      features: [
        { label: 'Speed Index', val: 'Up to 4.0 m/s high-speed response' },
        { label: 'Aesthetics', val: 'Cinematic glass capsules with golden HSL accents' },
        { label: 'Connected Lifts', val: 'Real-time cloud & IoT monitoring systems' },
        { label: 'Load Capacity', val: 'Tailored for passenger & freight loads' }
      ]
    },
    factory: {
      title: 'Factory & Heavy Production Floor',
      subtitle: 'PRECISION ADVANCED MANUFACTURING',
      image: factoryProductionImg,
      badge: 'Behind The Scenes',
      desc: 'Explore our state-of-the-art manufacturing plant where high-accuracy structural designs turn into high-performance machinery. Using robotic laser cutting machines and high-grade rustproof alloys, we construct elevator cabins, car frames, and custom control panels to last a lifetime.',
      features: [
        { label: 'Steel Integrity', val: 'High-strength premium anti-rust alloys' },
        { label: 'Machining', val: 'Advanced automated CNC & laser cutting' },
        { label: 'Testing Lab', val: 'Simulated multi-stress load testing' },
        { label: 'Production', val: '100% in-house engineering and assembly' }
      ]
    }
  };

  const currentTab = tabsData[activeTab];

  return (
    <section id="projects" className="projects-section py-5 position-relative overflow-hidden" style={{ background: '#0a0f1d' }}>
      
      {/* Smoky background glow */}
      <div className="position-absolute" style={{
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(13, 202, 240, 0.08) 0%, transparent 70%)',
        top: '-10%', left: '-10%', zIndex: 1
      }}></div>

      <div className="position-absolute" style={{
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
        bottom: '-10%', right: '-10%', zIndex: 1
      }}></div>

      <div className="container py-4 position-relative" style={{ zIndex: 5 }}>
        
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9" data-aos="fade-up">
            <h6 className="text-info text-uppercase tracking-widest fw-800 mb-3 small" style={{ letterSpacing: '0.2em' }}>PROVEN CREDIBILITY</h6>
            <h2 className="display-4 fw-900 text-white mb-3 text-uppercase">
              Real Installations & <span className="text-info">Production</span>
            </h2>
            <p className="text-secondary mx-auto lead" style={{ maxWidth: '650px', fontSize: '1rem' }}>
              We build trust through authenticity. Explore our actual project site work, completed iconic structures, and clean high-tech manufacturing plant.
            </p>
          </div>
        </div>

        {/* Dynamic Tab Navigation Bar */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5" data-aos="fade-up" data-aos-delay="100">
          {[
            { key: 'installations', label: 'Recent Installations' },
            { key: 'completed', label: 'Completed Projects' },
            { key: 'factory', label: 'Factory & Production' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`btn px-4 py-3 rounded-3 font-bold text-uppercase tracking-widest transition-all ${
                activeTab === tab.key 
                  ? 'btn-info text-dark shadow-lg' 
                  : 'btn-outline-secondary text-secondary border-secondary border-opacity-50 hover-text-white'
              }`}
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="row g-5 align-items-center" key={activeTab}>
          
          {/* Left: Dynamic Real Photo with floating badges */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="position-relative p-2 rounded-4 bg-dark-lighter border border-secondary border-opacity-25 shadow-2xl overflow-hidden project-image-container">
              <img 
                src={currentTab.image} 
                alt={currentTab.title} 
                className="w-100 object-fit-cover rounded-3 transition-all"
                style={{ height: '420px', transition: 'all 0.5s' }}
              />
              <div className="position-absolute top-4 left-4 bg-info text-dark fw-bold px-3 py-1.5 rounded-pill shadow-lg small text-uppercase tracking-wider" style={{ top: '20px', left: '20px', fontSize: '0.7rem' }}>
                {currentTab.badge}
              </div>
              <div className="image-overlay-cinematic position-absolute bottom-0 left-0 w-100 p-4 d-flex align-items-end" style={{
                background: 'linear-gradient(to top, rgba(10, 15, 29, 0.95), transparent)',
                height: '140px'
              }}>
                <span className="text-secondary small fw-bold text-uppercase tracking-widest">{currentTab.subtitle}</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Specs, Story, and Custom Features */}
          <div className="col-lg-6" data-aos="fade-left">
            <span className="text-info small fw-bold text-uppercase tracking-widest mb-2 d-block">{currentTab.subtitle}</span>
            <h3 className="h1 text-white fw-800 mb-4">{currentTab.title}</h3>
            
            <p className="text-secondary lead mb-4" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
              {currentTab.desc}
            </p>

            <div className="row g-3">
              {currentTab.features.map((feat, i) => (
                <div className="col-md-6" key={i}>
                  <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-15 h-100 spec-item-box transition-all">
                    <span className="text-secondary small d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>{feat.label}</span>
                    <span className="text-white fw-bold small">{feat.val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 d-flex gap-3 align-items-center">
              <a href="#quote" className="btn btn-info text-dark fw-bold px-4 py-3 rounded-3 text-uppercase tracking-wider transition-all" style={{ fontSize: '0.75rem' }}>
                Request Consultation
              </a>
              <span className="text-secondary small font-bold">100% Authentic Imagery</span>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.03); }
        .project-image-container:hover img {
          transform: scale(1.03);
        }
        .spec-item-box:hover {
          border-color: rgba(59, 130, 246, 0.4) !important;
          background: rgba(59, 130, 246, 0.02) !important;
        }
        
        /* Brighten all text-info and btn-info elements inside this section */
        .projects-section .text-info {
          color: #3b82f6 !important; /* Beautiful vibrant electric blue */
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.25);
        }
        
        .projects-section .btn-info {
          background-color: #3b82f6 !important;
          border-color: #3b82f6 !important;
          color: #ffffff !important;
        }
        
        .projects-section .btn-info:hover {
          background-color: #1d4ed8 !important;
          border-color: #1d4ed8 !important;
          color: #ffffff !important;
          box-shadow: 0 0 15px rgba(29, 78, 216, 0.45) !important;
        }
        
        .projects-section .bg-info {
          background-color: #3b82f6 !important;
          color: #ffffff !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;
