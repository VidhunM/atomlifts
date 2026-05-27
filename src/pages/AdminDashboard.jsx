import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Mail, MessageSquare, Upload, Image as ImageIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [heroImage, setHeroImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/heroFrontImage`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          setHeroImage(data.value.startsWith('http') ? data.value : `${backendUrl}${data.value}`);
        }
      }
    } catch (error) {
      console.error('Error fetching hero image:', error);
    }
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      
      if (response.ok) {
        const imagePath = await response.text(); // e.g. "/uploads/image-123.jpg"
        
        // Save the setting path to settings
        const saveResponse = await fetch(`${backendUrl}/api/settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'heroFrontImage', value: imagePath })
        });

        if (saveResponse.ok) {
          setHeroImage(`${backendUrl}${imagePath}`);
          setSuccessMsg('Hero front image updated successfully!');
          setTimeout(() => setSuccessMsg(''), 5000);
        } else {
          setErrorMsg('Failed to save settings to the database.');
        }
      } else {
        setErrorMsg('Failed to upload image to the server.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMsg('An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-dashboard text-white">
      <h2 className="mb-4 font-bold text-white">Dashboard Overview</h2>
      
      {/* Hero Section Customization */}
      <div className="card bg-dark text-white border-secondary mb-5 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3 d-flex align-items-center justify-content-between">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <ImageIcon className="text-primary" size={22} />
            Hero Section customization
          </h4>
          <span className="badge bg-primary px-3 py-2 small">Site Customization</span>
        </div>
        <div className="card-body p-4">
          <p className="text-secondary small mb-4">
            Upload a futuristic front image (e.g. cabin object) for the home hero section. This will replace the default front elevator image dynamically.
          </p>

          <div className="row align-items-center g-4">
            <div className="col-md-4">
              <label className="form-label text-secondary small fw-bold text-uppercase d-block mb-2">Current Hero Image Preview</label>
              <div 
                className="image-preview-box bg-dark-lighter rounded-4 overflow-hidden d-flex align-items-center justify-content-center border border-secondary border-opacity-50" 
                style={{ height: '220px', background: 'rgba(0,0,0,0.3)', position: 'relative' }}
              >
                {heroImage ? (
                  <img src={heroImage} alt="Hero front preview" className="w-100 h-100 object-fit-contain p-2" />
                ) : (
                  <div className="text-center text-secondary opacity-50 p-3">
                    <ImageIcon size={48} className="mb-2" />
                    <p className="small mb-0">Showing Default Lift Object</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="glass-card p-4 border border-secondary border-dashed rounded-4 d-flex flex-column justify-content-center h-100">
                <h5 className="fw-bold mb-2">Upload Front Image</h5>
                <p className="text-secondary small mb-4">
                  Please upload a PNG or JPEG format image. A transparent PNG is highly recommended so that the animated background lines in the hero section flow seamlessly behind it.
                </p>

                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <label className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2.5 fw-bold rounded-3 cursor-pointer">
                    <Upload size={18} /> 
                    {uploading ? 'Uploading...' : 'Select & Upload Image'}
                    <input type="file" className="d-none" onChange={handleHeroImageUpload} accept="image/*" disabled={uploading} />
                  </label>
                  
                  {uploading && (
                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>

                {successMsg && (
                  <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success rounded-3 mt-4 mb-0 py-2.5 px-3 small animate-fade-in">
                    {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger rounded-3 mt-4 mb-0 py-2.5 px-3 small animate-fade-in">
                    {errorMsg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.05); }
        .border-dashed { border-style: dashed !important; }
        .cursor-pointer { cursor: pointer; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
