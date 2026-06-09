
import { 
  CheckCircle2, Trophy, Clock, Users, Lightbulb, Eye, Target, Goal, Heart,
  User, Zap, Box, Home, Hospital, Info, HardHat, Car, Accessibility, Wind, Utensils, Compass, Gem, ArrowRight,
  Award, TrendingUp, Gauge, Building2
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';
import aboutHero from '../assets/about-hero.png';
import aboutTeam from '../assets/about_team_new.png';
import val1 from '../assets/val-1.png';
import val2 from '../assets/val-2.png';
import val3 from '../assets/val-3.png';
import val4 from '../assets/val-4.png';
import team1 from '../assets/team-1.png';
import team2 from '../assets/team-2.png';
import team3 from '../assets/team-3.png';

const Counter = ({ end, duration = 2000, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let timer = null;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (timer) clearInterval(timer);
        let start = 0;
        const increment = end / (duration / 16);
        timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
            timer = null;
          } else {
            setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
          }
        }, 16);
      } else {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        setCount(0);
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => {
      if (timer) clearInterval(timer);
      observer.disconnect();
    };
  }, [end, duration, decimals]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const About = () => {
  const [activeTab, setActiveTab] = useState('Mission');
  const [stats, setStats] = useState({
    awards: 250,
    riders: 10,
    uptime: 99.9,
    lifts: 15
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/aboutStats`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            const parsed = JSON.parse(data.value);
            if (parsed) {
              setStats({
                awards: parsed.awards ?? 250,
                riders: parsed.riders ?? 10,
                uptime: parsed.uptime ?? 99.9,
                lifts: parsed.lifts ?? 15
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const teamMembers = [
    { name: "Mr. Saravanan", title: "Chairman and Managing Director", img: team3 },
    { name: "Mr. Balagurusamy", title: "Director", img: team2 },
    { name: "Mr. Rajendran", title: "", img: team1 }
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
                {["Global Standards", "Atom Heritage", "Safety First", "24/7 Response"].map((item, i) => (
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
          
          {/* Section Header */}
          <div className="text-center mb-5" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-800 mb-3 small" style={{ letterSpacing: '0.15em' }}>OUR FOUNDATION</h6>
            <h2 className="display-4 fw-900 text-white mb-5 text-uppercase">Precision Driven by <span className="text-primary">Innovation</span></h2>
          </div>

          <div className="row g-4 justify-content-center">
            
            {/* Card 1: Our Vision */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="foundation-card position-relative overflow-hidden rounded-4 shadow-2xl transition-all" style={{
                height: '420px',
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.75)), url(${val1}) no-repeat center center`,
                backgroundSize: 'cover'
              }}>
                <div className="card-inner-content d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                  <div className="icon-badge mb-4">
                    <Eye size={48} className="text-white opacity-90" />
                  </div>
                  <h3 className="text-white fw-800 display-6 mb-3">Our Vision</h3>
                  <div className="arrow-box transition-all">
                    <ArrowRight size={28} className="text-white opacity-80" />
                  </div>
                </div>

                {/* Sliding Info Overlay on Hover */}
                <div className="hover-sliding-panel position-absolute w-100 h-100 top-0 left-0 p-4 d-flex flex-column align-items-center justify-content-center text-center transition-all">
                  <h4 className="text-primary fw-bold mb-3 text-uppercase small tracking-widest">Our Vision</h4>
                  <p className="text-white opacity-90 small leading-relaxed mb-0">
                    To be the global leader in vertical transportation by revolutionizing urban mobility through intelligent engineering and sustainable design. We envision a future where elevators and escalators are perfectly integrated into the smart city fabric, providing seamless and eco-friendly transit for generations to come.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Our Mission */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="foundation-card position-relative overflow-hidden rounded-4 shadow-2xl transition-all" style={{
                height: '420px',
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.75)), url(${val2}) no-repeat center center`,
                backgroundSize: 'cover'
              }}>
                <div className="card-inner-content d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                  <div className="icon-badge mb-4">
                    <Target size={48} className="text-white opacity-90" />
                  </div>
                  <h3 className="text-white fw-800 display-6 mb-3">Our Mission</h3>
                  <div className="arrow-box transition-all">
                    <ArrowRight size={28} className="text-white opacity-80" />
                  </div>
                </div>

                {/* Sliding Info Overlay on Hover */}
                <div className="hover-sliding-panel position-absolute w-100 h-100 top-0 left-0 p-4 d-flex flex-column align-items-center justify-content-center text-center transition-all">
                  <h4 className="text-primary fw-bold mb-3 text-uppercase small tracking-widest">Our Mission</h4>
                  <p className="text-white opacity-90 small leading-relaxed mb-0">
                    To design, manufacture, and maintain high-quality elevators and escalators with cutting-edge technology, uncompromising safety, and exceptional service — powered by innovation, integrity, and excellence. We strive to build long-term partnerships through transparent sustainable engineering practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Our Values */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="foundation-card position-relative overflow-hidden rounded-4 shadow-2xl transition-all" style={{
                height: '420px',
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.75)), url(${val4}) no-repeat center center`,
                backgroundSize: 'cover'
              }}>
                <div className="card-inner-content d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                  <div className="icon-badge mb-4">
                    <Gem size={48} className="text-white opacity-90" />
                  </div>
                  <h3 className="text-white fw-800 display-6 mb-3">Our Values</h3>
                  <div className="arrow-box transition-all">
                    <ArrowRight size={28} className="text-white opacity-80" />
                  </div>
                </div>

                {/* Sliding Info Overlay on Hover */}
                <div className="hover-sliding-panel position-absolute w-100 h-100 top-0 left-0 p-4 d-flex flex-column align-items-center justify-content-center text-center transition-all">
                  <h4 className="text-primary fw-bold mb-3 text-uppercase small tracking-widest">Our Values</h4>
                  <p className="text-white opacity-90 small leading-relaxed mb-0">
                    We promise uncompromising reliability and absolute safety in every lift we manufacture. At AtomLifts, we stand by our installations for their entire lifecycle, offering transparent communication and a commitment to excellence that makes us more than just a vendor—we are your dedicated mobility partner.
                  </p>
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
            {teamMembers.map((member, i) => {
              const isRajendran = member.name === "Mr. Rajendran";
              return (
                <div className="col-lg-4 col-md-6" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="team-card-new position-relative overflow-hidden" style={{ height: '450px' }}>
                    <div className="team-img-container h-100 d-flex align-items-center justify-content-center" style={{ background: '#141b2b' }}>
                      {!isRajendran ? (
                        <img src={member.img} alt={member.name} className="w-100 team-img-professional" />
                      ) : (
                        <div className="text-center p-4">
                          <Users size={64} className="text-primary mb-3 opacity-25" />
                          <p className="text-secondary small tracking-widest mb-0 text-uppercase fw-bold" style={{ fontSize: '0.65rem', opacity: 0.5 }}>Executive Advisor</p>
                        </div>
                      )}
                      <div className="team-overlay-gradient"></div>
                    </div>
                    <div className="team-info-overlay text-center pb-4">
                      <h4 className="text-white fw-900 mb-1">{member.name}</h4>
                      {member.title && <p className="text-primary fw-bold text-uppercase small tracking-widest mb-0">{member.title}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="stats-section bg-dark-lighter py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 text-center">
            {[
              { icon: <Award />, end: stats.awards, suffix: '+', label: 'Industry Awards' },
              { icon: <TrendingUp />, end: stats.riders, suffix: 'M+', label: 'Daily Riders' },
              { icon: <Gauge />, end: stats.uptime, suffix: '%', decimals: 1, label: 'Uptime Rate' },
              { icon: <Building2 />, end: stats.lifts, suffix: 'k+', label: 'Active Lifts' }
            ].map((stat, i) => (
              <div className="col-md-3" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="p-4">
                  <div className="text-primary mb-4 d-inline-block p-4 icon-box-stat">{stat.icon}</div>
                  <h2 className="display-6 fw-800 text-white mb-2">
                    <Counter end={stat.end} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </h2>
                  <p className="text-white-50 small text-uppercase tracking-widest fw-bold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .icon-box-stat { background:rgba(248,192,45,0.1); border:1px solid rgba(248,192,45,0.2); border-radius:4px; }
        .about-grid-layout { padding: 15px; }

        /* Premium MNC-style Foundation Cards */
        .foundation-card {
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          cursor: pointer;
        }
        .foundation-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--primary) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5) !important;
        }
        .card-inner-content {
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .foundation-card:hover .card-inner-content {
          opacity: 0;
          transform: scale(0.9);
        }
        .hover-sliding-panel {
          background: rgba(10, 15, 29, 0.96);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          transform: translateY(100%);
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-top: 3px solid var(--primary);
          z-index: 5;
        }
        .foundation-card:hover .hover-sliding-panel {
          transform: translateY(0);
        }
        .arrow-box {
          border: 2px solid rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .foundation-card:hover .arrow-box {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--dark) !important;
          transform: rotate(-45deg);
        }
        .icon-badge {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.5s ease;
        }
        .foundation-card:hover .icon-badge {
          transform: scale(1.08);
          border-color: var(--primary);
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
        
        @media (max-width: 991px) { 
          .team-img-professional { height: 350px; }
          .established-box-premium { width: 100px; height: 100px; }
          .established-box-premium h2 { font-size: 1.5rem; }
      `}</style>
    </div>
  );
};

export default About;
