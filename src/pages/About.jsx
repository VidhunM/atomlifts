
import { 
  CheckCircle2, Trophy, Clock, Users, Lightbulb, Eye, Target, Goal, Heart,
  User, Zap, Box, Home, Hospital, Info, HardHat, Car, Accessibility, Wind, Utensils, Compass
} from 'lucide-react';
import { useState } from 'react';
import aboutHero from '../assets/about-hero.png';
import aboutTeam from '../assets/about-team.png';
import val1 from '../assets/val-1.png';
import val2 from '../assets/val-2.png';
import val3 from '../assets/val-3.png';
import val4 from '../assets/val-4.png';
import team1 from '../assets/team-1.png';
import team2 from '../assets/team-2.png';
import team3 from '../assets/team-3.png';

const About = () => {
  const [activeTab, setActiveTab] = useState('Mission');

  const teamMembers = [
    { name: "Mr. Rajendran", title: "Chairman", img: team1 },
    { name: "Mr. Balagurusamy", title: "Director", img: team2 },
    { name: "Mr. Saravanan", title: "Director", img: team3 }
  ];

  const liftRange = [
    { name: "Passenger Elevator", desc: "Comfort & Safety", icon: <User /> },
    { name: "Hydraulic Elevator", desc: "Powerful Lifting", icon: <Zap /> },
    { name: "MRL Elevator", desc: "Space Saving", icon: <Box /> },
    { name: "Home Lift", desc: "Stylish Living", icon: <Home /> },
    { name: "Hospital Elevator", desc: "Patient Care", icon: <Hospital /> },
    { name: "Capsule Elevator", desc: "Modern Design", icon: <Info /> },
    { name: "Goods Elevator", desc: "Heavy Duty", icon: <HardHat /> },
    { name: "Car Elevator", desc: "Smart Parking", icon: <Car /> },
    { name: "Chair Lifts", desc: "Easy Access", icon: <Accessibility /> },
    { name: "Vacuum Lifts", desc: "Futuristic Tech", icon: <Wind /> },
    { name: "Dumbwaiter Lift", desc: "Quick Service", icon: <Utensils /> },
    { name: "Panoramic Lift", desc: "Scenic Travel", icon: <Compass /> }
  ];

  const valuesData = {
    Mission: {
      icon: <Lightbulb />,
      content: "To design, manufacture, and maintain high-quality elevators and escalators with cutting-edge technology, uncompromising safety, and exceptional service — powered by innovation, integrity, and excellence. We strive to build long-term partnerships through transparent communication, timely project execution, and sustainable engineering practices, ensuring every Atom Lift stands as a symbol of trust, precision, and performance."
    },
    Vision: {
      icon: <Eye />,
      content: "To be the global leader in vertical transportation by revolutionizing urban mobility through intelligent engineering and sustainable design. We envision a future where elevators and escalators are perfectly integrated into the smart city fabric, providing seamless and eco-friendly transit for generations to come."
    },
    Objectives: {
      icon: <Target />,
      content: "Our primary objective is to implement IoT-driven predictive maintenance across all installations to achieve zero-downtime performance. We aim to reach a 100% carbon-neutral manufacturing process while maintaining the highest safety certification standards in the industry (ISO 9001/14001)."
    },
    Goals: {
      icon: <Goal />,
      content: "To install and maintain over 50,000 active units by 2030 while maintaining a 99.9% uptime rate. We are dedicated to expanding our technical support network to ensure a 30-minute response time for all critical maintenance requests globally."
    },
    "Our Promise": {
      icon: <Heart />,
      content: "We promise uncompromising reliability and absolute safety in every lift we manufacture. At AtomLifts, we stand by our installations for their entire lifecycle, offering transparent communication and a commitment to excellence that makes us more than just a vendor—we are your dedicated mobility partner."
    }
  };

  return (
    <div className="about-page bg-dark min-vh-100 pb-5">
      {/* About Hero Section */}
      <section className="about-hero-section position-relative pt-5 overflow-hidden mb-5 d-flex align-items-center" style={{ minHeight: '600px' }}>
        <div className="smoky-gradient-bg"></div>
        <div className="container position-relative py-5" style={{ zIndex: 5 }}>
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-7 d-flex flex-column justify-content-center" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Our Legacy</h6>
              <h1 className="huge-contact-title mb-4">
                ABOUT <span className="text-primary">US</span>
              </h1>
              <p className="text-white-50 lead mb-5 max-w-400">
                Pioneering the next generation of vertical travel through engineering precision and high-accuracy mobility data.
              </p>
            </div>
          </div>
        </div>
        <div className="about-hero-image-overlay d-none d-lg-block" data-aos="fade-left">
          <img src={aboutHero} alt="Engineering Excellence" className="hero-clip-img" />
        </div>
        <div className="yellow-ticker-right-aligned">
          <div className="ticker-track-right">
            {[...Array(100)].map((_, i) => (<div key={i} className="ticker-bar-yellow"></div>))}
            {[...Array(100)].map((_, i) => (<div key={`dup-${i}`} className="ticker-bar-yellow"></div>))}
          </div>
        </div>
      </section>

      {/* 2nd Section: History/Mission */}
      <section className="about-content py-5 my-lg-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">We Help People & Businesses</h6>
              <h2 className="display-5 fw-800 text-white mb-4">Elevating Quality and <br/>Safety to <span className="text-primary">New Heights !</span></h2>
              <p className="text-white-50 mb-5 leading-relaxed">
                Atom Lifts India Pvt. Ltd. has been extending top-notch contributions to the field of vertical transportation. 
                Originally initiated by Mr. Rajendran (former Chief Engineer - Mitsubishi Elevators & Escalators, Japan) 
                as CARE Genuine Elevator Spares & Co. in 2008, It was reformed as Care Elevators took incharge by Mr. Saravanan 
                and Mr. Bala Gurusamy in 2014, Laterally it was formed as Atom Lifts got incorporated as a Private Limited in 2022 
                with Mr. Saravanan & Mr. Balagurusamy appointed as its Directors.
              </p>
              <div className="row g-4 pt-2">
                {["Global Standards", "Mitsubishi Heritage", "Safety First", "24/7 Response"].map((item, i) => (
                  <div className="col-sm-6" key={i}>
                    <div className="d-flex align-items-center gap-3">
                      <CheckCircle2 className="text-primary" size={20} />
                      <span className="text-white fw-medium small text-uppercase tracking-wider">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="glass-card-dark p-2 overflow-hidden shadow-2xl">
                 <img src={aboutTeam} alt="Atom Lifts Engineering Team" className="w-100 rounded" style={{ objectFit: 'cover', minHeight: '450px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3rd Section: Values / Grid Layout */}
      <section className="values-section py-5 my-lg-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-grid-layout position-relative">
                <div className="row g-3">
                  <div className="col-6"><img src={val1} className="w-100 rounded mb-1" style={{ height: '220px', objectFit: 'cover' }} alt="Detail 1" /></div>
                  <div className="col-6"><img src={val2} className="w-100 rounded mb-1" style={{ height: '220px', objectFit: 'cover' }} alt="Detail 2" /></div>
                  <div className="col-6"><img src={val3} className="w-100 rounded" style={{ height: '220px', objectFit: 'cover' }} alt="Detail 3" /></div>
                  <div className="col-6"><img src={val4} className="w-100 rounded" style={{ height: '220px', objectFit: 'cover' }} alt="Detail 4" /></div>
                </div>
                <div className="established-box">
                  <div className="box-content">
                    <h2 className="fw-900 mb-0">2008</h2>
                    <p className="small mb-0 text-uppercase tracking-wider">Established</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="ps-lg-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">OUR FOUNDATION</h6>
                <h2 className="display-6 fw-800 text-white mb-5 text-uppercase">Precision Driven by <span className="text-primary">Innovation</span></h2>
                <div className="values-tabs">
                  <div className="tabs-header d-flex flex-wrap gap-2 mb-4">
                    {Object.keys(valuesData).map((tab) => (
                      <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}>{tab}</button>
                    ))}
                  </div>
                  <div className="tab-content-box p-4 glass-card-dark fade-in-up" key={activeTab}>
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="icon-circle">{valuesData[activeTab].icon}</div>
                      <h4 className="text-white fw-bold mb-0">{activeTab}</h4>
                    </div>
                    <p className="text-white-50 leading-relaxed">{valuesData[activeTab].content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4th Section: Elevator Range */}
      <section className="elevator-range-section py-5 my-lg-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">Our Elevator Range</h6>
            <h2 className="display-4 fw-900 text-white mb-5">Smart, safe & reliable lifts <br/><span className="text-primary">for every need</span></h2>
          </div>
          <div className="row g-4">
            {liftRange.map((lift, i) => (
              <div className="col-lg-3 col-md-6" key={i} data-aos="fade-up" data-aos-delay={i * 50}>
                <div className="lift-range-card p-4 h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="lift-icon-box">{lift.icon}</div>
                    <h5 className="text-white fw-bold mb-0 small-title">{lift.name}</h5>
                  </div>
                  <p className="text-white-50 small mb-0">{lift.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5th Section: Team - Design from Image 1, Content from Image 2 */}
      <section className="team-section py-5 my-lg-5 overflow-hidden">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small">OUR TEAM</h6>
            <h2 className="display-4 fw-900 text-white mb-5">Behind The <span className="text-primary">Scene</span></h2>
          </div>
          
          <div className="row g-5 justify-content-center">
            {teamMembers.map((member, i) => (
              <div className="col-lg-4 col-md-6" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="team-card-new position-relative overflow-hidden">
                  <div className="team-img-container">
                    <img src={member.img} alt={member.name} className="w-100 team-img-professional" />
                    <div className="team-overlay-gradient"></div>
                  </div>
                  <div className="team-info-overlay text-center pb-4">
                    <h4 className="text-white fw-900 mb-1">{member.name}</h4>
                    <p className="text-primary fw-bold text-uppercase small tracking-widest mb-0">{member.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section bg-dark-lighter py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 text-center">
            {[
              { icon: <Trophy />, count: '250+', label: 'Industry Awards' },
              { icon: <Users />, count: '10M+', label: 'Daily Riders' },
              { icon: <Clock />, count: '99.9%', label: 'Uptime Rate' },
              { icon: <CheckCircle2 />, count: '15k+', label: 'Active Lifts' }
            ].map((stat, i) => (
              <div className="col-md-3" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="p-4">
                  <div className="text-primary mb-4 d-inline-block p-4 icon-box-stat">{stat.icon}</div>
                  <h2 className="display-6 fw-800 text-white mb-2">{stat.count}</h2>
                  <p className="text-white-50 small text-uppercase tracking-widest fw-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-hero-section { background: #1a2436; }
        .smoky-gradient-bg {
          position: absolute; top:0; left:0; width:100%; height:100%;
          background: linear-gradient(to right, #1a2436 0%, #1a2436 45%, transparent 85%); z-index:2;
        }
        .about-hero-image-overlay { position:absolute; top:0; right:0; width:60%; height:100%; z-index:1; }
        .hero-clip-img { width:100%; height:100%; object-fit:cover; filter:brightness(0.85); }
        .huge-contact-title { font-size: clamp(3rem, 10vw, 6rem); font-weight:900; color:white; text-transform:uppercase;}
        .yellow-ticker-right-aligned {
          position:absolute; bottom:0; right:0; width:100%; height:40px; overflow:hidden; z-index:10;
          mask-image: linear-gradient(to right, transparent 50%, black 70%);
        }
        .ticker-track-right { display:flex; gap:15px; width:max-content; animation: tickerScrollSeamless 25s linear infinite; }
        .ticker-bar-yellow { width:5px; height:25px; background:#f8c02d; flex-shrink:0; }
        @keyframes tickerScrollSeamless { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .glass-card-dark { background:#141b2b; border: 1px solid rgba(255,255,255,0.05); border-radius:4px; }
        .icon-box-stat { background:rgba(248,192,45,0.1); border:1px solid rgba(248,192,45,0.2); border-radius:4px; }
        .about-grid-layout { padding: 15px; }
        .established-box {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          background: var(--primary); width: 140px; height: 140px;
          display: flex; align-items: center; justify-content: center;
          text-align: center; color: var(--dark); border-radius: 4px;
          box-shadow: 0 0 40px rgba(0,0,0,0.5); z-index: 5;
        }
        .established-box h2 { font-size: 2rem; font-weight: 900; }
        .tab-btn {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: white; padding: 10px 20px; font-weight: 700; font-size: 0.8rem;
          text-transform: uppercase; letter-spacing: 1px; transition: 0.3s;
        }
        .tab-btn.active { background: var(--primary); color: var(--dark); border-color: var(--primary); }
        .icon-circle {
          width: 50px; height: 50px; background: rgba(248,192,45,0.15);
          color: var(--primary); display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
        }
        .lift-range-card {
          background: #141b2b; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px; transition: 0.4s; position: relative; overflow: hidden;
        }
        .lift-range-card:hover { transform: translateY(-10px); border-color: var(--primary); }
        .lift-icon-box {
          width: 40px; height: 40px; background: rgba(248,192,45,0.1);
          color: var(--primary); display: flex; align-items: center; justify-content: center;
          border-radius: 4px; transition: 0.3s;
        }
        .lift-range-card:hover .lift-icon-box { background: var(--primary); color: var(--dark); }
        .small-title { font-size: 0.95rem; }

        .team-card-new { border-radius: 4px; transition: 0.5s; }
        .team-img-container { position: relative; overflow: hidden; background: #1a2436; }
        .team-img-professional { 
          filter: grayscale(100%); 
          transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
          mix-blend-mode: luminosity; 
          height: 450px; 
          object-fit: cover;
          object-position: top;
        }
        .team-card-new:hover .team-img-professional { filter: grayscale(0%); transform: scale(1.05); mix-blend-mode: normal; }
        .team-overlay-gradient {
          position: absolute; bottom: 0; left: 0; width: 100%; height: 60%;
          background: linear-gradient(to top, #0d121f 10%, transparent);
        }
        .team-info-overlay {
          position: absolute; bottom: 0; left: 0; width: 100%; 
          z-index: 5; transition: 0.4s;
          transform: translateY(5px);
        }
        .team-card-new:hover .team-info-overlay { transform: translateY(0); }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.5s ease forwards; }
        @media (max-width: 991px) { .huge-contact-title { font-size: 4rem; } }
      `}</style>
    </div>
  );
};

export default About;
