import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Plus, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const AdminClients = () => {
  const [row1Images, setRow1Images] = useState([null, null, null, null, null, null, null, null]);
  const [row2Images, setRow2Images] = useState([null, null, null, null, null, null, null, null]);
  const [uploadingRow, setUploadingRow] = useState(null); // 'row1' or 'row2'
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const backendUrl = API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchClientLogos();
  }, []);

  const fetchClientLogos = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/clientLogos`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          try {
            const parsed = JSON.parse(data.value);
            if (parsed && typeof parsed === 'object') {
              if (Array.isArray(parsed.row1)) {
                const loaded1 = [null, null, null, null, null, null, null, null];
                for (let i = 0; i < 8; i++) {
                  if (parsed.row1[i]) loaded1[i] = parsed.row1[i];
                }
                setRow1Images(loaded1);
              }
              if (Array.isArray(parsed.row2)) {
                const loaded2 = [null, null, null, null, null, null, null, null];
                for (let i = 0; i < 8; i++) {
                  if (parsed.row2[i]) loaded2[i] = parsed.row2[i];
                }
                setRow2Images(loaded2);
              }
            }
          } catch (e) {
            console.error('Error parsing client logos JSON:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching client logos settings:', error);
    }
  };

  const handleImageUpload = async (rowName, index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploadingRow(rowName);
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
        const updated1 = [...row1Images];
        const updated2 = [...row2Images];

        if (rowName === 'row1') {
          updated1[index] = imagePath;
        } else {
          updated2[index] = imagePath;
        }

        // Save the setting path to settings
        const saveResponse = await fetch(`${backendUrl}/api/settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            key: 'clientLogos',
            value: JSON.stringify({ row1: updated1, row2: updated2 })
          })
        });

        if (saveResponse.ok) {
          if (rowName === 'row1') {
            setRow1Images(updated1);
          } else {
            setRow2Images(updated2);
          }
          setSuccessMsg(`Logo in Row ${rowName === 'row1' ? '1' : '2'} Slot ${index + 1} updated successfully!`);
          setTimeout(() => setSuccessMsg(''), 5000);
        } else {
          setErrorMsg('Failed to save settings to the database.');
        }
      } else {
        setErrorMsg('Failed to upload logo image to the server.');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      setErrorMsg('An error occurred during upload.');
    } finally {
      setUploadingRow(null);
      setUploadingIndex(null);
    }
  };

  const handleRemoveImage = async (rowName, index) => {
    if (!window.confirm(`Are you sure you want to clear Slot ${index + 1} in Row ${rowName === 'row1' ? '1' : '2'}?`)) return;

    setSuccessMsg('');
    setErrorMsg('');
    const updated1 = [...row1Images];
    const updated2 = [...row2Images];

    if (rowName === 'row1') {
      updated1[index] = null;
    } else {
      updated2[index] = null;
    }

    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'clientLogos',
          value: JSON.stringify({ row1: updated1, row2: updated2 })
        })
      });

      if (saveResponse.ok) {
        if (rowName === 'row1') {
          setRow1Images(updated1);
        } else {
          setRow2Images(updated2);
        }
        setSuccessMsg(`Slot ${index + 1} in Row ${rowName === 'row1' ? '1' : '2'} cleared!`);
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to update settings in database.');
      }
    } catch (error) {
      console.error('Error removing logo:', error);
      setErrorMsg('Error resetting slot.');
    }
  };

  return (
    <div className="admin-clients-page text-white">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <Link to="/admin" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 mb-2 w-max" style={{ width: 'max-content' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h2 className="font-bold text-white mb-1">Manage Client Logos</h2>
          <p className="text-secondary small mb-0">Upload or customize the scrolling customer logos displayed on the home page.</p>
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

      {/* Row 1 Customization */}
      <div className="card bg-dark text-white border-secondary mb-4 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3 d-flex align-items-center justify-content-between">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <ImageIcon className="text-primary" size={22} />
            Logo Slider Row 01 (Scrolling Left)
          </h4>
          <span className="badge bg-primary px-3 py-2 small">Top Row</span>
        </div>
        <div className="card-body p-4">
          <p className="text-secondary small mb-4">
            Upload up to <strong>8 client logos</strong> for the top slider. High quality transparent or white background square/rectangular logos are recommended for professional aesthetic.
          </p>

          <div className="row row-cols-2 row-cols-sm-4 row-cols-md-8 g-3">
            {row1Images.map((imgPath, index) => {
              const fullUrl = imgPath ? (imgPath.startsWith('http') ? imgPath : `${backendUrl}${imgPath}`) : null;
              const isUploading = uploadingRow === 'row1' && uploadingIndex === index;

              return (
                <div key={`row1-${index}`} className="col">
                  <div className="card bg-dark-lighter border-secondary rounded-3 overflow-hidden h-100 position-relative shadow-sm transition-all slot-card">
                    <div className="card-header bg-dark text-center py-1.5 border-secondary border-bottom border-opacity-50">
                      <span className="small text-secondary fw-bold" style={{ fontSize: '0.75rem' }}>Slot {index + 1}</span>
                    </div>

                    <div 
                      className="d-flex align-items-center justify-content-center bg-black bg-opacity-20 p-2" 
                      style={{ height: '110px', position: 'relative' }}
                    >
                      {isUploading ? (
                        <div className="text-center">
                          <div className="spinner-border spinner-border-sm text-primary mb-1" role="status"></div>
                          <div className="small text-secondary" style={{ fontSize: '0.75rem' }}>Uploading...</div>
                        </div>
                      ) : fullUrl ? (
                        <>
                          <img src={fullUrl} alt={`Row1 Client ${index + 1}`} className="w-100 h-100 object-fit-contain" />
                          <div className="slot-actions-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center gap-2">
                            <button 
                              className="btn btn-danger btn-sm rounded-circle p-2 shadow-lg"
                              title="Delete Logo"
                              onClick={() => handleRemoveImage('row1', index)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label className="d-flex flex-column align-items-center justify-content-center w-100 h-100 cursor-pointer text-secondary text-opacity-50 hover-text-primary transition-all">
                          <Plus size={24} className="mb-0.5" />
                          <span className="small font-bold" style={{ fontSize: '0.7rem' }}>Add Logo</span>
                          <input 
                            type="file" 
                            className="d-none" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload('row1', index, e)} 
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

      {/* Row 2 Customization */}
      <div className="card bg-dark text-white border-secondary mb-5 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3 d-flex align-items-center justify-content-between">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <ImageIcon className="text-warning" size={22} />
            Logo Slider Row 02 (Scrolling Right)
          </h4>
          <span className="badge bg-warning text-dark px-3 py-2 small fw-bold">Bottom Row</span>
        </div>
        <div className="card-body p-4">
          <p className="text-secondary small mb-4">
            Upload up to <strong>8 client logos</strong> for the bottom slider. Clean spacing and white background logos work best for matching the site's dark mode visual layout.
          </p>

          <div className="row row-cols-2 row-cols-sm-4 row-cols-md-8 g-3">
            {row2Images.map((imgPath, index) => {
              const fullUrl = imgPath ? (imgPath.startsWith('http') ? imgPath : `${backendUrl}${imgPath}`) : null;
              const isUploading = uploadingRow === 'row2' && uploadingIndex === index;

              return (
                <div key={`row2-${index}`} className="col">
                  <div className="card bg-dark-lighter border-secondary rounded-3 overflow-hidden h-100 position-relative shadow-sm transition-all slot-card">
                    <div className="card-header bg-dark text-center py-1.5 border-secondary border-bottom border-opacity-50">
                      <span className="small text-secondary fw-bold" style={{ fontSize: '0.75rem' }}>Slot {index + 1}</span>
                    </div>

                    <div 
                      className="d-flex align-items-center justify-content-center bg-black bg-opacity-20 p-2" 
                      style={{ height: '110px', position: 'relative' }}
                    >
                      {isUploading ? (
                        <div className="text-center">
                          <div className="spinner-border spinner-border-sm text-warning mb-1" role="status"></div>
                          <div className="small text-secondary" style={{ fontSize: '0.75rem' }}>Uploading...</div>
                        </div>
                      ) : fullUrl ? (
                        <>
                          <img src={fullUrl} alt={`Row2 Client ${index + 1}`} className="w-100 h-100 object-fit-contain" />
                          <div className="slot-actions-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center gap-2">
                            <button 
                              className="btn btn-danger btn-sm rounded-circle p-2 shadow-lg"
                              title="Delete Logo"
                              onClick={() => handleRemoveImage('row2', index)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label className="d-flex flex-column align-items-center justify-content-center w-100 h-100 cursor-pointer text-secondary text-opacity-50 hover-text-primary transition-all">
                          <Plus size={24} className="mb-0.5" />
                          <span className="small font-bold" style={{ fontSize: '0.7rem' }}>Add Logo</span>
                          <input 
                            type="file" 
                            className="d-none" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload('row2', index, e)} 
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

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.05); }
        .cursor-pointer { cursor: pointer; }
        .slot-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .slot-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary) !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3) !important;
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
        .w-max {
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default AdminClients;
