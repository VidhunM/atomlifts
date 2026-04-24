
import React from 'react';
import { X, Send, Phone, Mail, User, MessageSquare, ChevronDown } from 'lucide-react';
import escalatorImg from '../assets/escalator-hero.png';

const QuoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quote-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="row g-0 h-100">
          <div className="col-lg-5 d-none d-lg-block overflow-hidden">
            <div className="modal-image-side h-100">
              <img src={escalatorImg} alt="Elevator Quote" className="w-100 h-100 object-fit-cover" />
              <div className="image-overlay-text">
                <h4 className="text-white fw-900 mb-0">ATOM <span className="text-primary">LIFTS</span></h4>
                <p className="text-white-50 small mb-0">Innovation in Motion</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-7">
            <div className="modal-form-side p-4 p-md-5">
              <h2 className="display-6 fw-900 text-dark mb-2">Get Your <span className="text-primary">Quote</span></h2>
              <p className="text-muted small mb-4">
                Get a customized quote for your lift requirements. Simply fill in the details below, and our team will get back to you with the best solution tailored to your needs.
              </p>
              
              <form className="quote-form">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="input-group-premium">
                      <User size={18} className="input-icon" />
                      <input type="text" placeholder="Enter Your Full Name" className="form-control-premium" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group-premium">
                      <Phone size={18} className="input-icon" />
                      <input type="tel" placeholder="Mobile Number" className="form-control-premium" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group-premium">
                      <Mail size={18} className="input-icon" />
                      <input type="email" placeholder="Email Address" className="form-control-premium" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group-premium select-wrapper">
                      <ChevronDown size={18} className="select-icon" />
                      <select className="form-control-premium appearance-none" required>
                        <option value="">Select lift type</option>
                        <option value="passenger">Passenger Lift</option>
                        <option value="home">Home Lift</option>
                        <option value="hospital">Hospital Lift</option>
                        <option value="goods">Goods Lift</option>
                        <option value="escalator">Escalator</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-premium align-items-start">
                      <MessageSquare size={18} className="input-icon mt-3" />
                      <textarea placeholder="Your Message" rows="4" className="form-control-premium pt-3"></textarea>
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn-submit-premium w-100 py-3">
                      Submit Form <Send size={18} className="ms-2" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        
        .quote-modal-container {
          background: white;
          width: 95%; max-width: 1000px;
          height: auto; max-height: 90vh;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .modal-close-btn {
          position: absolute; top: 20px; right: 20px;
          background: #f8f9fa; border: none; width: 40px; height: 40px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          color: #333; z-index: 10; transition: 0.3s;
        }
        .modal-close-btn:hover { background: #e9ecef; transform: rotate(90deg); }
        
        .modal-image-side { position: relative; }
        .image-overlay-text {
          position: absolute; bottom: 30px; left: 30px;
          z-index: 2;
        }
        .modal-image-side::after {
          content: ''; position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }
        
        .modal-form-side h2 { color: #1a2436; }
        
        .input-group-premium {
          position: relative;
          display: flex; align-items: center;
        }
        
        .input-icon {
          position: absolute; left: 15px; color: #adb5bd;
          pointer-events: none;
        }
        
        .form-control-premium {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }
        
        .form-control-premium:focus {
          outline: none; border-color: var(--primary);
          background: white; box-shadow: 0 0 0 4px rgba(248, 192, 45, 0.1);
        }
        
        .select-wrapper .select-icon {
          position: absolute; right: 15px; color: #adb5bd;
          pointer-events: none;
        }
        
        .btn-submit-premium {
          background: #1a2436; color: white;
          border: none; border-radius: 8px;
          font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.1em; font-size: 0.85rem;
          transition: all 0.3s ease;
          display: flex; align-items: center; justify-content: center;
        }
        
        .btn-submit-premium:hover {
          background: #000; transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 991px) {
          .modal-form-side { padding: 30px 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default QuoteModal;
