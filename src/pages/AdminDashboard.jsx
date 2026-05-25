import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Mail, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2 className="mb-4 font-bold text-white">Dashboard Overview</h2>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary h-100 shadow-sm hover-shadow-lg" style={{ transition: 'all 0.3s' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary p-3 rounded-circle me-3">
                  <FileText size={24} className="text-white" />
                </div>
                <h4 className="card-title mb-0">Blogs Management</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                Create new articles, update existing blog posts, or remove outdated content from your site's blog section.
              </p>
              <Link to="/admin/blogs" className="btn btn-primary w-100">Go to Blogs</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary h-100 shadow-sm hover-shadow-lg" style={{ transition: 'all 0.3s' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success p-3 rounded-circle me-3">
                  <Briefcase size={24} className="text-white" />
                </div>
                <h4 className="card-title mb-0">Jobs Management</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                Post new career opportunities, update job requirements, or toggle the active status of current listings.
              </p>
              <Link to="/admin/jobs" className="btn btn-success w-100">Go to Jobs</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary h-100 shadow-sm hover-shadow-lg" style={{ transition: 'all 0.3s' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-warning p-3 rounded-circle me-3">
                  <Mail size={24} className="text-dark" />
                </div>
                <h4 className="card-title mb-0">Form Inquiries</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                View and manage submissions from contact forms and quote requests across your website.
              </p>
              <Link to="/admin/inquiries" className="btn btn-warning w-100">View Inquiries</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary h-100 shadow-sm hover-shadow-lg" style={{ transition: 'all 0.3s' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info p-3 rounded-circle me-3">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <h4 className="card-title mb-0">Testimonials & Stats</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                Add, edit, or delete customer testimonials and highlight dynamic performance statistics.
              </p>
              <Link to="/admin/testimonials-stats" className="btn btn-info w-100 text-white fw-bold">Manage Testimonials & Stats</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
