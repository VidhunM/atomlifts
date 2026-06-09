import React, { useState, useEffect } from 'react';
import { Phone, Clock, User, MessageSquare, Filter, RefreshCw, Trash2, CheckCircle2, AlertCircle, Search, MapPin } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminCallbacks = () => {
  const [callbacks, setCallbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, contacted
  const [searchQuery, setSearchQuery] = useState('');

  const backendUrl = API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCallbacks();
  }, []);

  const fetchCallbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/inquiries`);
      const data = await response.json();
      // Filter for callback type only
      const callbackInquiries = data.filter(item => item.type === 'callback');
      setCallbacks(callbackInquiries);
    } catch (error) {
      console.error('Error fetching callback requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'contacted' ? 'pending' : 'contacted';
    try {
      const response = await fetch(`${backendUrl}/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setCallbacks(prev => 
          prev.map(item => item._id === id ? { ...item, status: newStatus } : item)
        );
      } else {
        console.error('Failed to update callback status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteCallback = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this callback request?')) return;
    try {
      const response = await fetch(`${backendUrl}/api/inquiries/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCallbacks(prev => prev.filter(item => item._id !== id));
      } else {
        console.error('Failed to delete callback request');
      }
    } catch (error) {
      console.error('Error deleting callback:', error);
    }
  };

  // Filter & Search Logic
  const filteredCallbacks = callbacks.filter(item => {
    const matchesFilter = filter === 'all' ? true : (item.status || 'pending') === filter;
    
    // Safety check parsing values
    const name = item.name ? item.name.toLowerCase() : '';
    const phone = item.phone ? item.phone.toLowerCase() : '';
    const message = item.message ? item.message.toLowerCase() : '';
    const query = searchQuery.toLowerCase();

    const matchesSearch = name.includes(query) || phone.includes(query) || message.includes(query);
    
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Parse details out of message (which was formatted as "City: X | Requirement: Y")
  const parseMessageDetails = (messageStr) => {
    if (!messageStr) return { city: 'N/A', requirement: 'N/A' };
    const parts = messageStr.split('|');
    let city = 'N/A';
    let requirement = messageStr;
    
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.startsWith('City:')) {
        city = trimmed.replace('City:', '').trim();
      } else if (trimmed.startsWith('Requirement:')) {
        requirement = trimmed.replace('Requirement:', '').trim();
      }
    });

    return { city, requirement };
  };

  return (
    <div className="admin-callbacks">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 mb-5">
        <div>
          <h2 className="display-6 fw-bold text-white mb-2">Callback Requests</h2>
          <p className="text-secondary mb-0">Review and track callbacks requested by potential clients from the sticky trigger form.</p>
        </div>
        <button 
          onClick={fetchCallbacks} 
          className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2"
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="card bg-dark border-secondary mb-4 shadow-sm">
        <div className="card-body p-3">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            
            {/* Left: Filters */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center gap-2">
                <Filter size={18} className="text-primary" />
                <span className="text-white small fw-bold text-uppercase whitespace-nowrap">Filter By:</span>
              </div>
              <div className="btn-group flex-wrap">
                <button 
                  className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'contacted' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                  onClick={() => setFilter('contacted')}
                >
                  Contacted
                </button>
              </div>
            </div>

            {/* Right: Search */}
            <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
              <div className="position-relative w-100" style={{ maxWidth: '300px' }}>
                <Search size={16} className="text-secondary position-absolute top-50 start-0 translate-middle-y ms-3" />
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary py-2 ps-5 pe-3 small-input" 
                  placeholder="Search name, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="badge bg-secondary whitespace-nowrap">{filteredCallbacks.length} Requests</span>
            </div>

          </div>
        </div>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredCallbacks.length === 0 ? (
        <div className="text-center py-5 glass-card">
          <MessageSquare size={48} className="text-secondary mb-3 opacity-25" />
          <h4 className="text-white">No callback requests found</h4>
          <p className="text-secondary">When users submit callback requests, they will appear here.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCallbacks.map((item) => {
            const isContacted = item.status === 'contacted';
            const { city, requirement } = parseMessageDetails(item.message);

            return (
              <div key={item._id} className="col-12">
                <div className="glass-card p-4 border border-secondary border-opacity-25 hover-border-primary position-relative overflow-hidden">
                  
                  {/* Status Indicator Badge */}
                  <div className={`status-badge ${isContacted ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {isContacted ? 'CONTACTED' : 'PENDING'}
                  </div>

                  <div className="row g-4">
                    {/* User Metadata */}
                    <div className="col-lg-4">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className={`avatar-circle ${isContacted ? 'bg-success-dark' : 'bg-warning-dark'}`}>
                          <User size={20} className={isContacted ? 'text-success' : 'text-warning'} />
                        </div>
                        <div>
                          <h5 className="text-white mb-0 fw-bold">{item.name}</h5>
                          <p className="text-secondary small mb-0 d-flex align-items-center gap-1">
                            <Clock size={12} /> {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="info-list">
                        {item.phone && (
                          <div className="info-item d-flex align-items-center gap-2 mb-2">
                            <Phone size={16} className="text-primary" />
                            <a href={`tel:${item.phone}`} className="text-secondary text-decoration-none small fw-bold text-white-hover">{item.phone}</a>
                          </div>
                        )}
                        <div className="info-item d-flex align-items-center gap-2 mb-3">
                          <MapPin size={16} className="text-primary" />
                          <span className="text-secondary small">City: <strong className="text-white">{city}</strong></span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="d-flex gap-2 mt-4">
                        <button
                          onClick={() => handleToggleStatus(item._id, item.status)}
                          className={`btn btn-sm d-flex align-items-center gap-1.5 px-3 py-2 fw-bold ${
                            isContacted ? 'btn-outline-warning' : 'btn-success text-dark'
                          }`}
                        >
                          {isContacted ? (
                            <>
                              <AlertCircle size={15} /> Mark Pending
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={15} /> Mark Called
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteCallback(item._id)}
                          className="btn btn-outline-danger btn-sm p-2 d-flex align-items-center justify-content-center"
                          title="Delete Request"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>

                    {/* Requirement details */}
                    <div className="col-lg-8 border-start border-secondary border-opacity-25">
                      <h6 className="text-primary small fw-bold text-uppercase mb-2">Requirement:</h6>
                      <p className="text-white-50 callback-requirement">
                        {requirement}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
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
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg-success-dark {
          background: rgba(40, 167, 69, 0.15);
          border: 1px solid rgba(40, 167, 69, 0.25);
        }
        .bg-warning-dark {
          background: rgba(255, 193, 7, 0.15);
          border: 1px solid rgba(255, 193, 7, 0.25);
        }
        .status-badge {
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
        .callback-requirement {
          white-space: pre-wrap;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .text-white-hover:hover {
          color: #ffffff !important;
        }
        .spin {
          animation: rotate 2s linear infinite;
        }
        .small-input {
          font-size: 0.85rem;
        }
        .gap-1\.5 {
          gap: 0.375rem;
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

export default AdminCallbacks;
