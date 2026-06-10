import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Mail, MessageSquare, Upload, Trash2, Image as ImageIcon, Plus, Video, Users, Globe, Award, PhoneCall } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
  // Hero Rotator States
  const [heroImages, setHeroImages] = useState([null, null, null, null, null]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  
  // Visual Precision Video States
  const [videoInput, setVideoInput] = useState('');
  const [activeVideo, setActiveVideo] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Contact Us Details States
  const [contactDetails, setContactDetails] = useState({
    hours: 'Mon - Sat 08:00 - 18:00',
    address: 'No.30,Second  Street, Sidco Industrial estate, Ambattur, Chennai  600 098.',
    email1: 'info@atomlifts.com',
    email2: 'admin@atomlifts.com',
    phoneMain: '+91 85508 55001',
    phoneSales: '+91 96000 87456',
    phoneService: '+91 95008 37737'
  });

  // Common UI feedback
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const backendUrl = API_BASE_URL;

  useEffect(() => {
    fetchHeroImages();
    fetchVideoSetting();
    fetchContactDetails();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/heroFrontImages`, {
        credentials: 'include'
      });
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

  const fetchVideoSetting = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/visualPrecisionVideo`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          setActiveVideo(data.value);
          if (!data.value.includes('/uploads/')) {
            setVideoInput(data.value);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching video setting:', error);
    }
  };

  const fetchContactDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/contactDetails`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          try {
            const parsed = JSON.parse(data.value);
            setContactDetails(prev => ({ ...prev, ...parsed }));
          } catch (e) {
            console.error('Error parsing contact details settings JSON:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching contact details settings:', error);
    }
  };

  const handleSaveContactDetails = async () => {
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'contactDetails', value: JSON.stringify(contactDetails) })
      });
      if (saveResponse.ok) {
        setSuccessMsg('Contact Us details updated successfully!');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to save contact details to the database.');
      }
    } catch (error) {
      console.error('Error saving contact details:', error);
      setErrorMsg('An error occurred while saving.');
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

  const handleSaveVideoUrl = async () => {
    if (!videoInput.trim()) {
      alert('Please enter a valid YouTube URL');
      return;
    }
    
    setSuccessMsg('');
    setErrorMsg('');
    
    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'visualPrecisionVideo', value: videoInput.trim() })
      });

      if (saveResponse.ok) {
        setActiveVideo(videoInput.trim());
        setSuccessMsg('Visual Precision Video showcase updated successfully!');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to save settings to the database.');
      }
    } catch (error) {
      console.error('Error saving video settings:', error);
      setErrorMsg('An error occurred while saving.');
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 35 * 1024 * 1024) {
      alert('Video file size exceeds 35MB. For larger videos, hosting on YouTube is highly recommended.');
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('image', file); // Multer upload middleware expects field 'image'
    setUploadingVideo(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const videoPath = await response.text(); // e.g. "/uploads/image-123.mp4"
        
        const saveResponse = await fetch(`${backendUrl}/api/settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'visualPrecisionVideo', value: videoPath })
        });

        if (saveResponse.ok) {
          setActiveVideo(videoPath);
          setVideoInput(''); // Clear the text input as we're using file upload
          setSuccessMsg('Visual Precision MP4 Showcase Video uploaded and saved successfully!');
          setTimeout(() => setSuccessMsg(''), 5000);
        } else {
          setErrorMsg('Failed to save video path to database.');
        }
      } else {
        setErrorMsg('Failed to upload video to the server.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setErrorMsg('An error occurred during video upload.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleClearVideo = async () => {
    if (!window.confirm('Are you sure you want to reset to the default YouTube video showcase?')) return;

    setSuccessMsg('');
    setErrorMsg('');
    const defaultValue = 'https://www.youtube.com/embed/5m3O5PzO4c4?autoplay=1';

    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'visualPrecisionVideo', value: defaultValue })
      });

      if (saveResponse.ok) {
        setActiveVideo(defaultValue);
        setVideoInput(defaultValue);
        setSuccessMsg('Showcase Video reset to default YouTube link.');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to reset video settings.');
      }
    } catch (error) {
      console.error('Error clearing video:', error);
      setErrorMsg('Error resetting video settings.');
    }
  };

  return (
    <div className="admin-dashboard text-white">
      <h2 className="mb-4 font-bold text-white">Dashboard Overview</h2>
      
      {/* Hero Section Customization */}
      <div className="card bg-dark text-white border-secondary mb-4 shadow-lg">
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
        </div>
      </div>

      {/* Visual Precision Video Customization */}
      <div className="card bg-dark text-white border-secondary mb-5 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3 d-flex align-items-center justify-content-between">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <Video className="text-warning" size={22} />
            Visual Precision Showcase Video
          </h4>
          <span className="badge bg-warning text-dark px-3 py-2 small fw-bold">Video Showcase</span>
        </div>
        <div className="card-body p-4">
          <p className="text-secondary small mb-4">
            Manage the cinematic video that opens when users click the play button in the <strong>Visual Precision</strong> section of the homepage.
            You can either paste a <strong>YouTube URL</strong> or upload a <strong>Custom MP4/WebM Video File</strong> directly.
          </p>

          <div className="row g-4 align-items-center">
            {/* Left: Active Showcase Indicator / Preview */}
            <div className="col-md-4">
              <label className="form-label text-secondary small fw-bold text-uppercase d-block mb-2">Showcase Video Source</label>
              <div 
                className="image-preview-box bg-dark-lighter rounded-4 overflow-hidden d-flex flex-column align-items-center justify-content-center border border-secondary border-opacity-50 p-3" 
                style={{ height: '220px', background: 'rgba(0,0,0,0.3)', position: 'relative' }}
              >
                {activeVideo ? (
                  activeVideo.includes('/uploads/') ? (
                    <div className="text-center">
                      <Video size={48} className="text-warning mb-2 animate-pulse" />
                      <span className="badge bg-success mb-2 px-3 py-1.5 small">Custom Video (MP4)</span>
                      <p className="small text-secondary text-truncate max-width-200 mt-1 mb-0">{activeVideo.split('/').pop()}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <ImageIcon size={48} className="text-primary mb-2" />
                      <span className="badge bg-primary mb-2 px-3 py-1.5 small">YouTube Video</span>
                      <p className="small text-secondary text-truncate max-width-200 mt-1 mb-0">{activeVideo}</p>
                    </div>
                  )
                ) : (
                  <div className="text-center text-secondary opacity-50">
                    <Video size={48} className="mb-2" />
                    <p className="small mb-0">Default YouTube Video Active</p>
                  </div>
                )}
                {activeVideo && (
                  <button 
                    className="btn btn-outline-danger btn-sm mt-3 px-3 py-1 fw-bold rounded-3" 
                    onClick={handleClearVideo}
                  >
                    Reset to Default
                  </button>
                )}
              </div>
            </div>

            {/* Right: Upload and Inputs */}
            <div className="col-md-8">
              <div className="glass-card p-4 border border-secondary border-dashed rounded-4 h-100">
                <div className="mb-4">
                  <h5 className="fw-bold mb-2">Pasted Link (YouTube Showcase)</h5>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control bg-dark text-white border-secondary py-2 px-3" 
                      placeholder="e.g. https://www.youtube.com/watch?v=5m3O5PzO4c4" 
                      value={videoInput}
                      onChange={(e) => setVideoInput(e.target.value)}
                    />
                    <button 
                      className="btn btn-warning text-dark fw-bold px-4" 
                      onClick={handleSaveVideoUrl}
                    >
                      Save Link
                    </button>
                  </div>
                  <small className="text-secondary mt-1 d-block">Supports short links (youtu.be), regular watch links, and embed codes.</small>
                </div>

                <hr className="border-secondary border-opacity-25 my-4" />

                <div>
                  <h5 className="fw-bold mb-2">OR Upload Direct Video File</h5>
                  <p className="text-secondary small mb-3">Upload an MP4 or WebM file directly (Max 35MB). Transparent/looping animations or full cinematic videos are supported.</p>
                  
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <label className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2.5 fw-bold rounded-3 cursor-pointer">
                      <Upload size={18} /> 
                      {uploadingVideo ? 'Uploading video...' : 'Select & Upload MP4'}
                      <input 
                        type="file" 
                        className="d-none" 
                        accept="video/mp4,video/webm" 
                        onChange={handleVideoUpload} 
                        disabled={uploadingVideo}
                      />
                    </label>

                    {uploadingVideo && (
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details Customization */}
      <div className="card bg-dark text-white border-secondary mb-5 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3 d-flex align-items-center justify-content-between">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <Mail className="text-info" size={22} />
            Contact & Footer Customization
          </h4>
          <span className="badge bg-info text-dark px-3 py-2 small fw-bold">Site Info</span>
        </div>
        <div className="card-body p-4">
          <p className="text-secondary small mb-4">
            Manage the contact details, emails, phone numbers, and office addresses that display in the <strong>Contact Us</strong> sections on both the contact page and the footer globally.
          </p>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Working Hours</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  value={contactDetails.hours}
                  onChange={(e) => setContactDetails({ ...contactDetails, hours: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Main/General Phone</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  value={contactDetails.phoneMain}
                  onChange={(e) => setContactDetails({ ...contactDetails, phoneMain: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Sales Phone</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  value={contactDetails.phoneSales}
                  onChange={(e) => setContactDetails({ ...contactDetails, phoneSales: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Service Phone</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  value={contactDetails.phoneService}
                  onChange={(e) => setContactDetails({ ...contactDetails, phoneService: e.target.value })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Primary Email Address</label>
                <input 
                  type="email" 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  value={contactDetails.email1}
                  onChange={(e) => setContactDetails({ ...contactDetails, email1: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Secondary Email Address</label>
                <input 
                  type="email" 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  value={contactDetails.email2}
                  onChange={(e) => setContactDetails({ ...contactDetails, email2: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-secondary small fw-bold text-uppercase">Office Address</label>
                <textarea 
                  className="form-control bg-dark text-white border-secondary py-2.5 px-3" 
                  rows="4"
                  value={contactDetails.address}
                  onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-end">
            <button 
              className="btn btn-info text-dark fw-bold px-5 py-2.5" 
              onClick={handleSaveContactDetails}
            >
              Save Contact Details
            </button>
          </div>
        </div>
      </div>



      {successMsg && (
        <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success rounded-3 mb-4 py-2.5 px-3 small animate-fade-in">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger rounded-3 mb-4 py-2.5 px-3 small animate-fade-in">
          {errorMsg}
        </div>
      )}

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
                <div className="p-3 rounded-circle me-3 text-white" style={{ backgroundColor: '#28a745' }}>
                  <PhoneCall size={24} />
                </div>
                <h4 className="card-title mb-0">Callback Requests</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                View, track, and manage callback requests submitted by users via the floating request form.
              </p>
              <Link to="/admin/callbacks" className="btn btn-success w-100 text-dark fw-bold" style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}>View Callback Requests</Link>
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

        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary h-100 shadow-sm hover-shadow-lg" style={{ transition: 'all 0.3s' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary p-3 rounded-circle me-3" style={{ backgroundColor: '#f8c02d' }}>
                  <Users size={24} className="text-dark" />
                </div>
                <h4 className="card-title mb-0">Clients Management</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                Upload and manage scrolling brand logos and customer graphics showcased in the Our Clients slider.
              </p>
              <Link to="/admin/clients" className="btn btn-warning w-100 text-dark fw-bold">Manage Client Logos</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary h-100 shadow-sm hover-shadow-lg" style={{ transition: 'all 0.3s' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="p-3 rounded-circle me-3" style={{ backgroundColor: '#ff8c00', color: 'white' }}>
                  <Award size={24} />
                </div>
                <h4 className="card-title mb-0">About Page Stats</h4>
              </div>
              <p className="card-text text-secondary mb-4">
                Update the four running counter metrics (Awards, Riders, Uptime, Lifts) displayed on the About page.
              </p>
              <Link to="/admin/about-stats" className="btn btn-warning w-100 text-dark fw-bold" style={{ backgroundColor: '#ff8c00', borderColor: '#ff8c00', color: 'white' }}>Manage About Stats</Link>
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
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .7; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
