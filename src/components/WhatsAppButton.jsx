import React, { useState } from 'react';
import { PhoneCall, FileText, X } from 'lucide-react';
import QuoteModal from './QuoteModal';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.559 4.191 1.62 6.046L0 24l6.105-1.602a11.83 11.83 0 005.94 1.603h.005c6.634 0 12.032-5.396 12.035-12.03a11.85 11.85 0 00-3.529-8.412z" />
  </svg>
);

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const whatsappNumber = "919600087456";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi, I'm interested in Atom Lifts services. Can you help me with a quote?`;

  return (
    <>
      <div className="whatsapp-container">
        {/* Quick Actions Menu */}
        <div className={`whatsapp-menu ${isOpen ? 'active' : ''}`}>
          <button 
            className="whatsapp-menu-item quote-btn"
            onClick={() => {
              setIsQuoteModalOpen(true);
              setIsOpen(false);
            }}
          >
            <span className="menu-label">Quick Quote</span>
            <FileText size={20} />
          </button>
          
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-menu-item chat-btn"
          >
            <span className="menu-label">Talk to Expert</span>
            <WhatsAppIcon size={20} />
          </a>
        </div>

        {/* Main Floating Button */}
        <button 
          className={`whatsapp-main-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Contact Us"
        >
          {isOpen ? <X size={28} /> : (
            <>
              <WhatsAppIcon size={30} />
              <span className="whatsapp-badge">1</span>
            </>
          )}
        </button>
      </div>

      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />

      <style>{`
        .whatsapp-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 15px;
        }

        .whatsapp-main-btn {
          width: 60px;
          height: 60px;
          background-color: #25d366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .whatsapp-main-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-main-btn.active {
          background-color: var(--primary);
          transform: rotate(90deg);
        }

        .whatsapp-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: #ff4d4f;
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          border: 2px solid white;
        }

        .whatsapp-menu {
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: var(--transition);
        }

        .whatsapp-menu.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .whatsapp-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-decoration: none;
          white-space: nowrap;
        }

        .menu-label {
          font-size: 14px;
          font-weight: 600;
        }

        .quote-btn {
          background-color: var(--primary);
          color: white;
        }

        .quote-btn:hover {
          background-color: var(--secondary);
          color: var(--primary);
          transform: translateX(-5px);
        }

        .chat-btn {
          background-color: #25d366;
          color: white;
        }

        .chat-btn:hover {
          background-color: #128c7e;
          transform: translateX(-5px);
        }

        @media (max-width: 768px) {
          .whatsapp-container {
            bottom: 20px;
            right: 20px;
          }
          .whatsapp-main-btn {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
