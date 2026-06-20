import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Phone } from 'lucide-react';
import { API_BASE_URL } from '../config';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" /><path d="m10 15 5-3-5-3z" /></svg>
);

const AdminSocialLinks = () => {
  const [links, setLinks] = useState({
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    whatsapp: '919600087456'
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = API_BASE_URL;

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/socialLinks`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          try {
            const parsed = JSON.parse(data.value);
            if (parsed) {
              setLinks(prev => ({
                ...prev,
                ...parsed
              }));
            }
          } catch (e) {
            console.error('Error parsing socialLinks JSON:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching socialLinks setting:', error);
    }
  };

  const handleSaveLinks = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setIsLoading(true);

    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'socialLinks', value: JSON.stringify(links) })
      });

      if (saveResponse.ok) {
        setSuccessMsg('Social Media and Redirect links updated successfully!');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to save settings to the database.');
      }
    } catch (error) {
      console.error('Error saving socialLinks:', error);
      setErrorMsg('An error occurred while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppPreview = () => {
    if (!links.whatsapp) return '';
    const cleanNumber = links.whatsapp.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}?text=Hi, I'm interested in Atom Lifts services. Can you help me with a quote?`;
  };

  return (
    <div className="admin-stats-page text-white">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <Link to="/admin" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 mb-2 w-max" style={{ width: 'max-content' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h2 className="font-bold text-white mb-1">Manage Icon Redirect Links</h2>
          <p className="text-secondary small mb-0">Configure the destination URLs for header/footer social media icons and the floating WhatsApp action button.</p>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success rounded-3 mb-4 py-2.5 px-3 small">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger rounded-3 mb-4 py-2.5 px-3 small">
          {errorMsg}
        </div>
      )}

      <div className="card bg-dark text-white border-secondary mb-4 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <Share2 className="text-warning" size={22} />
            Edit Social & Communication Links
          </h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSaveLinks}>
            <div className="row g-4">
              
              {/* WhatsApp number */}
              <div className="col-md-12">
                <div className="p-4 rounded-3 border border-warning border-opacity-20" style={{ background: 'rgba(25, 135, 84, 0.05)' }}>
                  <label className="form-label text-warning small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <Phone size={18} className="text-success" />
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3 mb-2"
                    value={links.whatsapp}
                    onChange={(e) => setLinks({ ...links, whatsapp: e.target.value })}
                    placeholder="e.g. 919600087456"
                    required
                  />
                  <div className="small text-secondary">
                    Provide the number with country code (no spaces, plus signs, or dashes). 
                    <div className="mt-1">
                      <strong>Generated Redirect Link:</strong> <a href={getWhatsAppPreview()} target="_blank" rel="noopener noreferrer" className="text-success text-decoration-none">{getWhatsAppPreview()}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <FacebookIcon />
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={links.facebook}
                    onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Twitter */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <TwitterIcon />
                    Twitter / X URL
                  </label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={links.twitter}
                    onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <LinkedinIcon />
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={links.linkedin}
                    onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Instagram */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <InstagramIcon />
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={links.instagram}
                    onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* YouTube */}
              <div className="col-md-12">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <YoutubeIcon />
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={links.youtube}
                    onChange={(e) => setLinks({ ...links, youtube: e.target.value })}
                    required
                  />
                </div>
              </div>

            </div>

            <div className="mt-4 text-end">
              <button 
                type="submit" 
                className="btn btn-warning text-dark fw-bold px-5 py-2.5"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Redirect Links'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSocialLinks;
