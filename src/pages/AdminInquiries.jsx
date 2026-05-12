import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, User, MessageSquare, Filter, RefreshCw, Trash2 } from 'lucide-react';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, contact, quote

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-inquiries">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="display-6 fw-bold text-white mb-2">Form Inquiries</h2>
          <p className="text-secondary mb-0">Manage and respond to customer inquiries from contact forms and quote requests.</p>
        </div>
        <button 
          onClick={fetchInquiries} 
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      <div className="card bg-dark border-secondary mb-4 shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex align-items-center gap-3">
            <Filter size={18} className="text-primary" />
            <span className="text-white small fw-bold text-uppercase">Filter By:</span>
            <div className="btn-group">
              <button 
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                onClick={() => setFilter('all')}
              >
                All Submissions
              </button>
              <button 
                className={`btn btn-sm ${filter === 'contact' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                onClick={() => setFilter('contact')}
              >
                Contact Forms
              </button>
              <button 
                className={`btn btn-sm ${filter === 'quote' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                onClick={() => setFilter('quote')}
              >
                Quote Requests
              </button>
            </div>
            <div className="ms-auto">
              <span className="badge bg-secondary">{filteredInquiries.length} Total</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-5 glass-card">
          <MessageSquare size={48} className="text-secondary mb-3 opacity-25" />
          <h4 className="text-white">No inquiries found</h4>
          <p className="text-secondary">When customers fill out forms, they will appear here.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry._id} className="col-12">
              <div className="glass-card p-4 border border-secondary border-opacity-25 hover-border-primary position-relative overflow-hidden">
                <div className={`type-badge ${inquiry.type === 'quote' ? 'bg-info' : 'bg-primary'}`}>
                  {inquiry.type === 'quote' ? 'QUOTE REQUEST' : 'CONTACT FORM'}
                </div>
                
                <div className="row g-4">
                  <div className="col-lg-4">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="avatar-circle">
                        <User size={20} />
                      </div>
                      <div>
                        <h5 className="text-white mb-0 fw-bold">{inquiry.name}</h5>
                        <p className="text-secondary small mb-0 d-flex align-items-center gap-1">
                          <Clock size={12} /> {formatDate(inquiry.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="info-list">
                      <div className="info-item d-flex align-items-center gap-2 mb-2">
                        <Mail size={16} className="text-primary" />
                        <a href={`mailto:${inquiry.email}`} className="text-secondary text-decoration-none small">{inquiry.email}</a>
                      </div>
                      {inquiry.phone && (
                        <div className="info-item d-flex align-items-center gap-2 mb-2">
                          <Phone size={16} className="text-primary" />
                          <a href={`tel:${inquiry.phone}`} className="text-secondary text-decoration-none small">{inquiry.phone}</a>
                        </div>
                      )}
                      {inquiry.projectType && (
                        <div className="info-item d-flex align-items-center gap-2">
                          <Filter size={16} className="text-primary" />
                          <span className="text-secondary small">Project: <span className="text-white">{inquiry.projectType}</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-lg-8 border-start border-secondary border-opacity-25">
                    <h6 className="text-primary small fw-bold text-uppercase mb-2">Message:</h6>
                    <p className="text-white-50 inquiry-message">
                      {inquiry.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          transition: all 0.3s ease;
        }
        .hover-border-primary:hover {
          border-color: var(--primary) !important;
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }
        .avatar-circle {
          width: 45px;
          height: 45px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .type-badge {
          position: absolute;
          top: 0;
          right: 0;
          padding: 4px 12px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          border-bottom-left-radius: 12px;
          color: white;
        }
        .inquiry-message {
          white-space: pre-wrap;
          line-height: 1.6;
        }
        .spin {
          animation: rotate 2s linear infinite;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 991px) {
          .col-lg-8 {
            border-start: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1.5rem;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminInquiries;
