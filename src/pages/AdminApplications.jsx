import React, { useState, useEffect } from 'react';
import { Trash2, ExternalLink, Clock, User, Mail, Phone, FileText } from 'lucide-react';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await fetch(`http://localhost:5000/api/applications/${id}`, { method: 'DELETE' });
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-applications text-white">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
        <h2 className="mb-0">Job Applications</h2>
        <p className="text-secondary mb-0">{applications.length} Total Submissions</p>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
      ) : (
        <div className="row g-4">
          {applications.map((app) => (
            <div className="col-12" key={app._id}>
              <div className="card bg-dark border-secondary shadow-sm">
                <div className="card-body p-4">
                  <div className="row align-items-start">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <User size={18} className="text-primary" />
                        <h5 className="mb-0 fw-bold">{app.fullName}</h5>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-1 text-secondary small">
                        <Mail size={14} /> {app.email}
                      </div>
                      <div className="d-flex align-items-center gap-2 text-secondary small">
                        <Phone size={14} /> {app.phone}
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="mb-2">
                        <span className="text-secondary small d-block mb-1">Applying for</span>
                        <div className="fw-bold">{app.jobTitle || 'N/A'}</div>
                      </div>
                      <div className="d-flex align-items-center gap-2 text-secondary small">
                        <Clock size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="col-md-2">
                      <div className="mb-2 text-center text-md-start">
                        <span className="text-secondary small d-block mb-1">Status</span>
                        <select 
                          className={`form-select form-select-sm bg-dark text-white border-secondary ${
                            app.status === 'Pending' ? 'text-warning' : 
                            app.status === 'Accepted' ? 'text-success' : 
                            app.status === 'Rejected' ? 'text-danger' : 'text-info'
                          }`}
                          value={app.status}
                          onChange={(e) => updateStatus(app._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2 text-end">
                      <div className="d-flex flex-column gap-2">
                        <a 
                          href={`http://localhost:5000${app.resume}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                        >
                          <ExternalLink size={14} /> View Resume
                        </a>
                        <button 
                          className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center gap-2"
                          onClick={() => handleDelete(app._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr className="border-secondary my-3" />
                  
                  <div className="cover-letter-preview">
                    <span className="text-secondary small d-block mb-2"><FileText size={14} className="me-1" /> Cover Letter</span>
                    <p className="small mb-0 text-light" style={{ whiteSpace: 'pre-wrap' }}>{app.coverLetter}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="col-12">
              <div className="card bg-dark border-secondary p-5 text-center">
                <p className="text-secondary mb-0">No applications received yet.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
