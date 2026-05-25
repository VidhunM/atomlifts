import React, { useState, useEffect } from 'react';
import { Star, Trash2, Edit2, Plus, X, Upload, Image as ImageIcon, MessageSquare, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';

const AdminTestimonialsStats = () => {
  const [activeTab, setActiveTab] = useState('testimonials');
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Testimonials state
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [testimonialData, setTestimonialData] = useState({
    text: '', author: '', location: '', rating: 5
  });

  // Stats state
  const [isStatFormOpen, setIsStatFormOpen] = useState(false);
  const [editingStatId, setEditingStatId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statData, setStatData] = useState({
    label: '', type: 'counter', value: 0, suffix: '', image: '', isIcon: false, displayOrder: 0
  });

  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [testRes, statsRes] = await Promise.all([
        fetch(`${backendUrl}/api/testimonials`),
        fetch(`${backendUrl}/api/stats`)
      ]);
      const testimonialsData = await testRes.json();
      const statsData = await statsRes.json();
      setTestimonials(testimonialsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Testimonial Handlers
  const handleTestimonialChange = (e) => {
    setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value });
  };

  const handleEditTestimonial = (testimonial) => {
    setTestimonialData({
      text: testimonial.text,
      author: testimonial.author,
      location: testimonial.location,
      rating: testimonial.rating || 5
    });
    setEditingTestimonialId(testimonial._id);
    setIsTestimonialFormOpen(true);
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await fetch(`${backendUrl}/api/testimonials/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTestimonialId 
        ? `${backendUrl}/api/testimonials/${editingTestimonialId}`
        : `${backendUrl}/api/testimonials`;
      const method = editingTestimonialId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData)
      });

      if (response.ok) {
        fetchData();
        resetTestimonialForm();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const resetTestimonialForm = () => {
    setTestimonialData({ text: '', author: '', location: '', rating: 5 });
    setEditingTestimonialId(null);
    setIsTestimonialFormOpen(false);
  };

  // Stat Handlers
  const handleStatChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStatData({
      ...statData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEditStat = (stat) => {
    setStatData({
      label: stat.label,
      type: stat.type || 'counter',
      value: stat.value || 0,
      suffix: stat.suffix || '',
      image: stat.image || '',
      isIcon: stat.isIcon || false,
      displayOrder: stat.displayOrder || 0
    });
    setEditingStatId(stat._id);
    setIsStatFormOpen(true);
  };

  const handleDeleteStat = async (id) => {
    if (!window.confirm('Are you sure you want to delete this statistic?')) return;
    try {
      await fetch(`${backendUrl}/api/stats/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting statistic:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploading(true);

    try {
      const response = await fetch(`${backendUrl}/api/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await response.text();
      setStatData({ ...statData, image: `${backendUrl}${data}` });
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload failed');
      setUploading(false);
    }
  };

  const handleStatSubmit = async (e) => {
    e.preventDefault();
    // Prepare payload depending on type
    const payload = {
      label: statData.label,
      type: statData.type,
      displayOrder: parseInt(statData.displayOrder, 10) || 0,
      isIcon: statData.type === 'icon'
    };

    if (statData.type === 'counter') {
      payload.value = parseInt(statData.value, 10) || 0;
      payload.suffix = statData.suffix;
      payload.image = '';
    } else if (statData.type === 'image') {
      payload.image = statData.image;
      payload.value = undefined;
      payload.suffix = '';
    } else if (statData.type === 'icon') {
      payload.value = undefined;
      payload.suffix = '';
      payload.image = '';
    }

    try {
      const url = editingStatId 
        ? `${backendUrl}/api/stats/${editingStatId}`
        : `${backendUrl}/api/stats`;
      const method = editingStatId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fetchData();
        resetStatForm();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving statistic:', error);
    }
  };

  const resetStatForm = () => {
    setStatData({ label: '', type: 'counter', value: 0, suffix: '', image: '', isIcon: false, displayOrder: 0 });
    setEditingStatId(null);
    setIsStatFormOpen(false);
  };

  return (
    <div className="admin-testimonials-stats text-white p-3 p-md-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-white mb-1 fs-3 fs-md-2">Manage Testimonials & Stats</h2>
          <p className="text-secondary small mb-0">Customize and manage client reviews and key performance stats dynamically</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="tabs-container mb-4 overflow-x-auto">
        <div className="d-flex gap-2 gap-md-3 bg-dark-lighter p-1 p-md-2 rounded-3 border border-secondary border-opacity-25" style={{ width: 'fit-content', minWidth: '100%' }}>
          <button 
            className={`btn d-flex align-items-center justify-content-center gap-2 px-3 px-md-4 py-2 rounded-2 fw-bold transition-all flex-grow-1 flex-md-grow-0 ${activeTab === 'testimonials' ? 'btn-primary' : 'btn-link text-white text-decoration-none'}`}
            onClick={() => { setActiveTab('testimonials'); resetTestimonialForm(); resetStatForm(); }}
          >
            <MessageSquare size={18} /> <span className="d-none d-sm-inline">Testimonials</span><span className="d-inline d-sm-none">Reviews</span>
          </button>
          <button 
            className={`btn d-flex align-items-center justify-content-center gap-2 px-3 px-md-4 py-2 rounded-2 fw-bold transition-all flex-grow-1 flex-md-grow-0 ${activeTab === 'stats' ? 'btn-primary' : 'btn-link text-white text-decoration-none'}`}
            onClick={() => { setActiveTab('stats'); resetTestimonialForm(); resetStatForm(); }}
          >
            <BarChart3 size={18} /> <span className="d-none d-sm-inline">Statistics Counters</span><span className="d-inline d-sm-none">Stats</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="mt-3 text-secondary">Loading data...</p>
        </div>
      ) : (
        <>
          {/* ==================== TESTIMONIALS TAB ==================== */}
          {activeTab === 'testimonials' && (
            <div>
              {/* Form & Actions */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                <h4 className="mb-0 fw-bold fs-5 fs-md-4">Testimonial Quotes ({testimonials.length})</h4>
                {!isTestimonialFormOpen && (
                  <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2 fw-bold" onClick={() => setIsTestimonialFormOpen(true)}>
                    <Plus size={18} /> Add New
                  </button>
                )}
              </div>

              {isTestimonialFormOpen && (
                <div className="card bg-dark border-secondary mb-5 shadow-lg animate-fade-in glass-card">
                  <div className="card-header bg-dark-lighter border-secondary d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 fw-bold fs-6 fs-md-5">{editingTestimonialId ? 'Edit Testimonial' : 'Create Testimonial'}</h5>
                    <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={resetTestimonialForm}><X size={18} /></button>
                  </div>
                  <div className="card-body p-3 p-md-4">
                    <form onSubmit={handleTestimonialSubmit}>
                      <div className="row g-3 g-md-4">
                        <div className="col-md-6">
                          <label className="form-label text-secondary small fw-bold text-uppercase">Author Name</label>
                          <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="author" value={testimonialData.author} onChange={handleTestimonialChange} required placeholder="e.g. Richard V." />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-secondary small fw-bold text-uppercase">Location</label>
                          <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="location" value={testimonialData.location} onChange={handleTestimonialChange} required placeholder="e.g. Mumbai, India" />
                        </div>
                        <div className="col-md-12">
                          <label className="form-label text-secondary small fw-bold text-uppercase">Testimonial Quote</label>
                          <textarea className="form-control bg-dark-lighter text-white border-secondary" name="text" rows="4" value={testimonialData.text} onChange={handleTestimonialChange} required placeholder="Enter the customer review or quote here..."></textarea>
                        </div>
                      </div>
                      <div className="mt-4 mt-md-5 d-flex flex-column-reverse flex-sm-row justify-content-end gap-2 gap-md-3">
                        <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={resetTestimonialForm}>Cancel</button>
                        <button type="submit" className="btn btn-primary px-5 py-2 fw-bold">
                          {editingTestimonialId ? 'Update Testimonial' : 'Save Testimonial'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Grid representation */}
              <div className="row g-3 g-md-4">
                {testimonials.map((t) => (
                  <div className="col-12 col-md-6 col-lg-4" key={t._id}>
                    <div className="card bg-dark border-secondary border-opacity-50 h-100 p-3 p-md-4 shadow-sm hover-shadow-lg glass-card d-flex flex-column justify-content-between" style={{ transition: 'all 0.3s' }}>
                      <div>
                        <div className="d-flex justify-content-start gap-1 mb-3 text-warning">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <p className="italic text-white-50 small fs-md-6 mb-4">"{t.text}"</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25 mt-auto">
                        <div className="overflow-hidden me-2">
                          <h6 className="text-primary fw-bold mb-0 text-truncate">{t.author}</h6>
                          <small className="text-secondary text-truncate d-block">{t.location}</small>
                        </div>
                        <div className="d-flex gap-1 gap-md-2 flex-shrink-0">
                          <button className="btn btn-sm btn-icon-edit" onClick={() => handleEditTestimonial(t)}>
                            <Edit2 size={14} />
                          </button>
                          <button className="btn btn-sm btn-icon-delete" onClick={() => handleDeleteTestimonial(t._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                  <div className="col-12 text-center py-5 text-secondary">
                    <MessageSquare size={48} className="opacity-10 mb-3" />
                    <p>No testimonials stored in MongoDB. The public page is using mock defaults.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== STATS TAB ==================== */}
          {activeTab === 'stats' && (
            <div>
              {/* Form & Actions */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                <h4 className="mb-0 fw-bold fs-5 fs-md-4">Statistics Counters ({stats.length})</h4>
                {!isStatFormOpen && (
                  <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2 fw-bold" onClick={() => setIsStatFormOpen(true)}>
                    <Plus size={18} /> Add New
                  </button>
                )}
              </div>

              {isStatFormOpen && (
                <div className="card bg-dark border-secondary mb-5 shadow-lg animate-fade-in glass-card">
                  <div className="card-header bg-dark-lighter border-secondary d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 fw-bold fs-6 fs-md-5">{editingStatId ? 'Edit Statistic' : 'Create Statistic'}</h5>
                    <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={resetStatForm}><X size={18} /></button>
                  </div>
                  <div className="card-body p-3 p-md-4">
                    <form onSubmit={handleStatSubmit}>
                      <div className="row g-3 g-md-4">
                        <div className="col-md-6">
                          <label className="form-label text-secondary small fw-bold text-uppercase">Stat Label</label>
                          <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="label" value={statData.label} onChange={handleStatChange} required placeholder="e.g. Project" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-secondary small fw-bold text-uppercase">Type</label>
                          <select className="form-select bg-dark-lighter text-white border-secondary py-2" name="type" value={statData.type} onChange={handleStatChange}>
                            <option value="counter">Numeric Counter (e.g. 500+)</option>
                            <option value="image">Custom PNG/SVG Strength Image</option>
                            <option value="icon">Standard R&D System Icon</option>
                          </select>
                        </div>

                        {statData.type === 'counter' && (
                          <>
                            <div className="col-md-6">
                              <label className="form-label text-secondary small fw-bold text-uppercase">Numeric Value</label>
                              <input type="number" className="form-control bg-dark-lighter text-white border-secondary py-2" name="value" value={statData.value} onChange={handleStatChange} required />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label text-secondary small fw-bold text-uppercase">Suffix</label>
                              <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="suffix" value={statData.suffix} onChange={handleStatChange} placeholder="e.g. +" />
                            </div>
                          </>
                        )}

                        {statData.type === 'image' && (
                          <div className="col-12">
                            <label className="form-label text-secondary small fw-bold text-uppercase">Custom Strength Image</label>
                            <div className="upload-container glass-card p-3 border border-secondary border-dashed rounded d-flex flex-column flex-sm-row align-items-center gap-3 gap-md-4 bg-dark-lighter">
                              <div className="image-preview-box bg-dark rounded overflow-hidden d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '80px', height: '80px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                {statData.image ? (
                                  <img src={statData.image} alt="Preview" className="w-100 h-100 object-fit-contain p-2" style={{ filter: 'brightness(0) saturate(100%) invert(80%) sepia(61%) saturate(1131%) hue-rotate(345deg) brightness(101%) contrast(96%)' }} />
                                ) : (
                                  <ImageIcon size={28} className="text-secondary opacity-50" />
                                )}
                              </div>
                              <div className="flex-grow-1 text-center text-sm-start">
                                <div className="d-flex flex-column flex-sm-row align-items-center gap-2 mb-2">
                                  <label className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 cursor-pointer">
                                    <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload Image'}
                                    <input type="file" className="d-none" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                                  </label>
                                  {statData.image && <span className="text-success small"><ImageIcon size={12} /> Image Ready</span>}
                                </div>
                                <p className="text-secondary small mb-0">PNG/SVG recommended. Sourced to strength.png style.</p>
                              </div>
                            </div>
                            <input type="hidden" name="image" value={statData.image} required />
                          </div>
                        )}

                        <div className="col-md-6">
                          <label className="form-label text-secondary small fw-bold text-uppercase">Display Order (Sorting)</label>
                          <input type="number" className="form-control bg-dark-lighter text-white border-secondary py-2" name="displayOrder" value={statData.displayOrder} onChange={handleStatChange} placeholder="e.g. 0" />
                        </div>
                      </div>
                      <div className="mt-4 mt-md-5 d-flex flex-column-reverse flex-sm-row justify-content-end gap-2 gap-md-3">
                        <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={resetStatForm}>Cancel</button>
                        <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" disabled={uploading}>
                          {editingStatId ? 'Update Statistic' : 'Save Statistic'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Grid representation */}
              <div className="row g-3 g-md-4">
                {stats.map((s, index) => (
                  <div className="col-6 col-md-4 col-lg-3" key={s._id}>
                    <div className="card bg-dark border-secondary border-opacity-50 h-100 p-3 p-md-4 shadow-sm hover-shadow-lg glass-card text-center d-flex flex-column justify-content-between" style={{ transition: 'all 0.3s' }}>
                      <div className="stat-number-new fs-2 fs-md-1 fw-800 text-primary mb-2 mb-md-3">
                        {s.type === 'image' ? (
                          <div className="py-1 py-md-2 d-flex justify-content-center align-items-center">
                            <img 
                              src={s.image} 
                              alt={s.label} 
                              style={{ 
                                height: '40px', 
                                width: 'auto', 
                                objectFit: 'contain',
                                filter: 'brightness(0) saturate(100%) invert(80%) sepia(61%) saturate(1131%) hue-rotate(345deg) brightness(101%) contrast(96%)'
                              }} 
                            />
                          </div>
                        ) : s.type === 'icon' ? (
                          <div className="text-primary py-1 py-md-2 d-flex justify-content-center align-items-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m15 11-1-1q-1-1-2-1t-2 1l-1 1" />
                              <path d="M15 11c1 0 2 .5 3 1.5s1 2.5 1 3.5-1 2-2 3-2 1-3 1h-4c-1 0-2-.5-3-1.5S6 16.5 6 15.5s1-2 2-3 2-1 3-1" />
                              <path d="M12 9V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
                              <path d="M10 21v-3" />
                              <path d="M14 21v-3" />
                            </svg>
                          </div>
                        ) : (
                          <span className="fs-3 fs-md-1">{s.value}{s.suffix}</span>
                        )}
                      </div>
                      <div>
                        <h6 className="text-uppercase tracking-wider extra-small fw-bold text-white-50 mb-3 mb-md-4 text-truncate">{s.label}</h6>
                        <div className="d-flex justify-content-between align-items-center pt-2 pt-md-3 border-top border-secondary border-opacity-25 mt-2">
                          <small className="text-secondary extra-small">Ord: {s.displayOrder}</small>
                          <div className="d-flex gap-1 gap-md-2">
                            <button className="btn btn-sm btn-icon-edit" onClick={() => handleEditStat(s)}>
                              <Edit2 size={12} />
                            </button>
                            <button className="btn btn-sm btn-icon-delete" onClick={() => handleDeleteStat(s._id)}>
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {stats.length === 0 && (
                  <div className="col-12 text-center py-5 text-secondary">
                    <BarChart3 size={48} className="opacity-10 mb-3" />
                    <p>No custom statistics stored in MongoDB. The public page is using mock defaults.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.05); }
        .glass-card { background: rgba(25, 25, 30, 0.65); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .cursor-pointer { cursor: pointer; }
        .btn-icon-edit { color: #3b82f6; background: rgba(59, 130, 246, 0.1); border: none; padding: 6px; border-radius: 6px; transition: 0.3s; }
        .btn-icon-edit:hover { background: #3b82f6; color: white; }
        .btn-icon-delete { color: #ef4444; background: rgba(239, 68, 68, 0.1); border: none; padding: 6px; border-radius: 6px; transition: 0.3s; }
        .btn-icon-delete:hover { background: #ef4444; color: white; }
        .border-dashed { border-style: dashed !important; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .extra-small { font-size: 0.7rem; }
        .tabs-container::-webkit-scrollbar { display: none; }
        .tabs-container { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AdminTestimonialsStats;
