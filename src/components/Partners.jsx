import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import i1 from '../assets/icons/i1 (1).jpg';
import i2 from '../assets/icons/i1 (2).jpg';
import i3 from '../assets/icons/i1 (3).jpg';
import i4 from '../assets/icons/i1 (4).jpg';
import i5 from '../assets/icons/i1 (5).jpg';
import i6 from '../assets/icons/i1 (6).jpg';
import i7 from '../assets/icons/i1 (7).jpg';
import i8 from '../assets/icons/i1 (8).jpg';
import i9 from '../assets/icons/i1 (9).jpg';
import i10 from '../assets/icons/i1 (10).jpg';
import i11 from '../assets/icons/i1 (11).jpg';
import i12 from '../assets/icons/i1 (12).jpg';
import i13 from '../assets/icons/i1 (13).jpg';
import i14 from '../assets/icons/i1 (14).jpg';

const Partners = () => {
  const backendUrl = API_BASE_URL || 'http://localhost:5000';
  const defaultRow1 = [i1, i2, i3, i4, i5, i6, i7];
  const defaultRow2 = [i8, i9, i10, i11, i12, i13, i14];

  const [row1, setRow1] = useState(defaultRow1);
  const [row2, setRow2] = useState(defaultRow2);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings/clientLogos`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            const parsed = JSON.parse(data.value);
            if (parsed && typeof parsed === 'object') {
              if (Array.isArray(parsed.row1)) {
                const valid1 = parsed.row1
                  .filter(img => img !== null && img !== '')
                  .map(img => img.startsWith('http') ? img : `${backendUrl}${img}`);
                if (valid1.length > 0) {
                  setRow1(valid1);
                }
              }
              if (Array.isArray(parsed.row2)) {
                const valid2 = parsed.row2
                  .filter(img => img !== null && img !== '')
                  .map(img => img.startsWith('http') ? img : `${backendUrl}${img}`);
                if (valid2.length > 0) {
                  setRow2(valid2);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching dynamic client logos:', error);
      }
    };
    fetchLogos();
  }, []);

  return (
    <section className="partner-slider bg-dark py-5">
      <div className="container mb-5 pb-4">
        <div className="text-center" data-aos="fade-up">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
             <span className="text-primary text-uppercase tracking-widest fw-800 small">Happy Customers</span>
             <span className="text-white-50">•</span>
             <span className="text-primary text-uppercase tracking-widest fw-800 small">Trust Us</span>
          </div>
          <h2 className="display-4 fw-900 text-white mb-4">OUR <span className="text-primary">CLIENTS</span></h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <p className="text-white-50 lead mb-0" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Thank you for choosing us! We appreciate your trust and are committed to ensuring your satisfaction. 
                Your satisfaction is our top priority, and we will continue to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-0 overflow-hidden">
        {/* Row 1: Sliding Left */}
        <div 
          className="d-flex align-items-center logo-scroll-container mb-4"
          style={{ '--items-count': row1.length }}
        >
          {[...row1, ...row1, ...row1].map((img, idx) => (
            <div className="partner-logo-item" key={`row1-${idx}`}>
               <img src={img} alt={`Partner ${idx}`} className="partner-img-fluid" />
            </div>
          ))}
        </div>

        {/* Row 2: Sliding Right */}
        <div 
          className="d-flex align-items-center logo-scroll-container-reverse"
          style={{ '--items-count': row2.length }}
        >
          {[...row2, ...row2, ...row2].map((img, idx) => (
            <div className="partner-logo-item" key={`row2-${idx}`}>
               <img src={img} alt={`Partner ${idx}`} className="partner-img-fluid" />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .partner-img-fluid {
          max-width: 180px;
          height: auto;
          filter: none;
          opacity: 0.9;
          transition: all 0.4s ease;
        }
        .partner-logo-item:hover .partner-img-fluid {
          opacity: 1;
          transform: scale(1.1);
        }
        .logo-scroll-container-reverse {
          display: flex;
          width: max-content;
          animation: tickerScrollReverse 40s linear infinite;
        }
        @keyframes tickerScrollReverse {
          0% { transform: translateX(calc(-250px * var(--items-count, 7))); }
          100% { transform: translateX(0); }
        }
        /* Override existing tickerScroll if needed to match 7 items */
        .logo-scroll-container {
          animation: tickerScroll 40s linear infinite;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * var(--items-count, 7))); }
        }
        
        @media (max-width: 768px) {
          .partner-img-fluid { max-width: 120px; }
          .partner-logo-item { width: 180px; }
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-180px * var(--items-count, 7))); }
          }
          @keyframes tickerScrollReverse {
            0% { transform: translateX(calc(-180px * var(--items-count, 7))); }
            100% { transform: translateX(0); }
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
