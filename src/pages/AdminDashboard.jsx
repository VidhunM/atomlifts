import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Mail, MessageSquare, Upload, Trash2, Image as ImageIcon, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [heroImages, setHeroImages] = useState([null, null, null, null, null]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/heroFrontImages`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          try {
            const parsed = JSON.parse(data.value);
            if (Array.isArray(parsed)) {
              const loadedImages = [null, null, null, null, null];
              for (let i = 0; i < 5; i++) {
                if (parsed[i]) {
                  loadedImages[i] = parsed[i];
                }
              }
              setHeroImages(loadedImages);
            }
          } catch (e) {
            console.error('Error parsing hero images JSON:', e);
          }
        }
      } else {
        // Try fallback to single image setting for migration
        const oldResponse = await fetch(`${backendUrl}/api/settings/heroFrontImage`);
        if (oldResponse.ok) {
          const oldData = await oldResponse.json();
          if (oldData && oldData.value) {
            setHeroImages([oldData.value, null, null, null, null]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    }
  };

  const handleHeroImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploadingIndex(index);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      
      if (response.ok) {
        const imagePath = await response.text(); // e.g. "/uploads/image-123.jpg"
        const updatedImages = [...heroImages];
        updatedImages[index] = imagePath;

        // Save the setting path to settings
        const saveResponse = await fetch(`${backendUrl}/api/settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'heroFrontImages', value: JSON.stringify(updatedImages) })
        });

        if (saveResponse.ok) {
          setHeroImages(updatedImages);
          setSuccessMsg(`Slot ${index + 1} updated successfully!`);
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
      setUploadingIndex(null);
    }
  };

  const handleRemoveImage = async (index) => {
    if (!window.confirm(`Are you sure you want to clear Slot ${index + 1}?`)) return;
    
    setSuccessMsg('');
    setErrorMsg('');
    const updatedImages = [...heroImages];
    updatedImages[index] = null;

    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'heroFrontImages', value: JSON.stringify(updatedImages) })
      });

      if (saveResponse.ok) {
        setHeroImages(updatedImages);
        setSuccessMsg(`Slot ${index + 1} cleared!`);
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to update settings in database.');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      setErrorMsg('Error resetting slot.');
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
            Hero Section Image Rotator (5 slots)
          </h4>
          <span className="badge bg-primary px-3 py-2 small">Site Customization</span>
        </div>
        <div className="card-body p-4">
          <p className="text-secondary small mb-4">
            Upload up to <strong>5 futuristic front images</strong> (transparent PNGs are highly recommended). 
            If multiple slots contain images, the front elevator image in the Home Hero section will **automatically animate and cycle** between them seamlessly!
          </p>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4 mb-4">
            {heroImages.map((imgPath, index) => {
              const fullUrl = imgPath ? (imgPath.startsWith('http') ? imgPath : `${backendUrl}${imgPath}`) : null;
              const isUploading = uploadingIndex === index;

              return (
                <div key={index} className="col">
                  <div className="card bg-dark-lighter border-secondary rounded-4 overflow-hidden h-100 position-relative shadow-sm transition-all slot-card">
                    <div className="card-header bg-dark text-center py-2 border-secondary border-bottom border-opacity-50">
                      <span className="small text-secondary fw-bold">Slot 0{index + 1}</span>
                    </div>
                    
                    <div 
                      className="d-flex align-items-center justify-content-center bg-black bg-opacity-20" 
                      style={{ height: '160px', position: 'relative' }}
                    >
                      {isUploading ? (
                        <div className="text-center">
                          <div className="spinner-border spinner-border-sm text-primary mb-2" role="status"></div>
                          <div className="small text-secondary">Uploading...</div>
                        </div>
                      ) : fullUrl ? (
                        <>
                          <img src={fullUrl} alt={`Slot ${index + 1}`} className="w-100 h-100 object-fit-contain p-2" />
                          <div className="slot-actions-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center gap-2">
                            <button 
                              className="btn btn-danger btn-sm rounded-circle p-2 shadow-lg"
                              title="Delete Image"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label className="d-flex flex-column align-items-center justify-content-center w-100 h-100 cursor-pointer text-secondary text-opacity-50 hover-text-primary transition-all p-3">
                          <Plus size={32} className="mb-1" />
                          <span className="small font-bold">Add Image</span>
                          <input 
                            type="file" 
                            className="d-none" 
                            accept="image/*" 
                            onChange={(e) => handleHeroImageUpload(index, e)} 
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {successMsg && (
            <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success rounded-3 mb-0 py-2.5 px-3 small animate-fade-in">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger rounded-3 mb-0 py-2.5 px-3 small animate-fade-in">
              {errorMsg}
            </div>
          )}
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
        
        .slot-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .slot-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3) !important;
        }
        .slot-actions-overlay {
          background: rgba(0,0,0,0.6);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .slot-card:hover .slot-actions-overlay {
          opacity: 1;
        }
        .hover-text-primary:hover {
          color: #f8c02d !important;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
