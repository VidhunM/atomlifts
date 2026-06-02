import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Phone, MapPin, ClipboardList, Send, PhoneCall } from 'lucide-react';
import { API_BASE_URL } from '../config';

const InquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    requirement: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending callback request...' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Mapping 'requirement' to 'message' to match backend schema perfectly
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: `${formData.name.toLowerCase().replace(/\s+/g, '')}@callback.com`, // dummy email for schema
          projectType: 'Callback Request',
          message: `City: ${formData.city} | Requirement: ${formData.requirement}`,
          type: 'callback'
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Callback request sent! We will contact you shortly.' });
        setFormData({ name: '', phone: '', city: '', requirement: '' });
        setTimeout(() => {
          setIsOpen(false);
          setStatus({ type: '', message: '' });
        }, 2500);
      } else {
        setStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting callback request:', error);
      setStatus({ type: 'error', message: 'Connection error. Please try again.' });
    }
  };

  return (
    <>
      {/* Floating Callback Trigger Button (Sticky Bottom-Left on Every Page) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="inquiry-floating-trigger d-flex align-items-center gap-2"
        aria-label="Request Callback"
      >
        <div className="inquiry-trigger-icon-pulse">
          <PhoneCall size={18} />
        </div>
        <span className="inquiry-trigger-text fw-bold text-uppercase tracking-wider">Request Callback</span>
      </button>

      {/* Modal Popup portal */}
      {isOpen && createPortal(
        <div className="inquiry-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="inquiry-modal-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button className="inquiry-modal-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>

            {/* Header */}
            <div className="inquiry-modal-header text-center mb-4">
              <div className="inquiry-header-icon-box mx-auto mb-3">
                <PhoneCall size={28} style={{ color: '#d4af37' }} />
              </div>
              <h3 className="fw-900 text-white text-uppercase tracking-wider mb-2">
                Request a <span style={{ color: '#d4af37' }}>Callback</span>
              </h3>
              <p className="text-white-50 small mb-0 px-3">
                Fill out the quick form below. Our engineer will call you back within 15 minutes!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="inquiry-modal-form">
              <div className="d-flex flex-column gap-3">
                
                {/* Name */}
                <div className="inquiry-input-wrapper">
                  <User size={18} className="inquiry-input-icon" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="inquiry-input-field"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="inquiry-input-wrapper">
                  <Phone size={18} className="inquiry-input-icon" />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="inquiry-input-field"
                    required
                  />
                </div>

                {/* City */}
                <div className="inquiry-input-wrapper">
                  <MapPin size={18} className="inquiry-input-icon" />
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your City"
                    className="inquiry-input-field"
                    required
                  />
                </div>

                {/* Requirement */}
                <div className="inquiry-input-wrapper align-items-start">
                  <ClipboardList size={18} className="inquiry-input-icon mt-3" />
                  <textarea 
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="Briefly state your requirement (e.g. 4-stop passenger lift for home)"
                    className="inquiry-input-field pt-3"
                    rows="3"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="inquiry-submit-btn w-100 py-3 mt-2" 
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading' ? (
                    'Sending Request...'
                  ) : (
                    <>
                      Request Callback <Send size={16} className="ms-2" />
                    </>
                  )}
                </button>

                {/* Status Messaging */}
                {status.message && (
                  <div className={`mt-2 text-center small fw-bold ${status.type === 'success' ? 'text-success' : 'text-danger'}`}>
                    {status.message}
                  </div>
                )}

              </div>
            </form>

          </div>
        </div>,
        document.body
      )}

      <style>{`
        /* Floating Sticky Trigger Style */
        .inquiry-floating-trigger {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 9998;
          background: #0a0f1d;
          color: #ffffff;
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 12px 22px;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.15);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .inquiry-floating-trigger:hover {
          background: #d4af37;
          color: #0a0f1d !important;
          border-color: #d4af37;
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
        }

        .inquiry-trigger-icon-pulse {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: triggerPulse 2s infinite ease-in-out;
        }

        .inquiry-trigger-text {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
        }

        @keyframes triggerPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(10deg); }
          100% { transform: scale(1); }
        }

        /* Modal Overlay */
        .inquiry-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(4, 7, 15, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: inquiryFadeIn 0.3s ease;
        }

        /* Card Container */
        .inquiry-modal-card {
          background: #0a0f1d;
          border: 1px solid rgba(212, 175, 55, 0.25);
          width: 90%;
          max-width: 440px;
          padding: 40px 30px;
          border-radius: 16px;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.1);
          animation: inquirySlideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Close Button */
        .inquiry-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .inquiry-modal-close:hover {
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
          border-color: #d4af37;
          transform: rotate(90deg);
        }

        /* Header Icon Box */
        .inquiry-header-icon-box {
          width: 60px;
          height: 60px;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Input Controls */
        .inquiry-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .inquiry-input-icon {
          position: absolute;
          left: 15px;
          color: rgba(212, 175, 55, 0.7);
          pointer-events: none;
        }

        .inquiry-input-field {
          width: 100%;
          padding: 13px 15px 13px 45px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: #ffffff;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .inquiry-input-field::placeholder {
          color: #64748b;
        }

        .inquiry-input-field:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.04);
          border-color: #d4af37;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.15);
        }

        /* Submit Button */
        .inquiry-submit-btn {
          background: #d4af37;
          color: #0a0f1d;
          border: none;
          border-radius: 8px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inquiry-submit-btn:hover {
          background: #ffffff;
          color: #0a0f1d;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(212, 175, 55, 0.25);
        }

        .inquiry-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Animations */
        @keyframes inquiryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes inquirySlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .inquiry-floating-trigger {
            bottom: 20px;
            left: 20px;
            padding: 10px 18px;
          }
          .inquiry-trigger-text {
            font-size: 0.75rem;
          }
          .inquiry-modal-card {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default InquiryModal;
