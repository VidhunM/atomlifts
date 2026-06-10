import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Globe, Phone, Mail, MapPin, Building } from 'lucide-react';
import { API_BASE_URL } from '../config';

const defaultBranchData = {
  maldives: {
    name: 'Maldives',
    partner: 'Atomlifts Maldives Pvt Ltd',
    address: 'H. Coral Reef, 3rd Floor, Boduthakurufaanu Magu, Malé, Maldives',
    phone: '+960 3302020',
    email: 'maldives@atomlifts.com'
  },
  oman: {
    name: 'Oman',
    partner: 'Airmech Oman LLC',
    address: 'P.O. Box 2033, Ruwi 112, Rusay, Industrial Estate, Road No. 4A, Sultanate of Oman',
    phone: '+968 24447060',
    email: 'oman@atomlifts.com'
  },
  'saudi-arabia': {
    name: 'Saudi Arabia',
    partner: 'Al-Qahtani Lift Systems',
    address: 'King Abdulaziz Road, Al Yasmin District, P.O. Box 90432, Riyadh 11613, Kingdom of Saudi Arabia',
    phone: '+966 11 405 8899',
    email: 'ksa@atomlifts.com'
  },
  srilanka: {
    name: 'Sri Lanka',
    partner: 'Lanka Mobility Solutions Pvt Ltd',
    address: 'No. 450, Galle Road, Colombo 03, Sri Lanka',
    phone: '+94 11 257 5800',
    email: 'srilanka@atomlifts.com'
  },
  uae: {
    name: 'UAE',
    partner: 'Atomlifts Gulf LLC',
    address: 'Office 1204, Aspect Tower, Business Bay, P.O. Box 45012, Dubai, United Arab Emirates',
    phone: '+971 4 456 7890',
    email: 'uae@atomlifts.com'
  }
};

const AdminBranches = () => {
  const [branches, setBranches] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingKey, setEditingKey] = useState(null); // null means adding a new one
  const [formData, setFormData] = useState({
    name: '',
    partner: '',
    phone: '',
    email: '',
    address: ''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const backendUrl = API_BASE_URL;

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/overseasBranches`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          try {
            const parsed = JSON.parse(data.value);
            setBranches(parsed);
          } catch (e) {
            console.error('Error parsing branches settings:', e);
            setBranches(defaultBranchData);
          }
        } else {
          setBranches(defaultBranchData);
        }
      } else {
        setBranches(defaultBranchData);
      }
    } catch (error) {
      console.error('Error fetching overseas branch settings:', error);
      setBranches(defaultBranchData);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (key, branch) => {
    setEditingKey(key);
    setFormData({
      name: branch.name,
      partner: branch.partner,
      phone: branch.phone,
      email: branch.email,
      address: branch.address
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (key) => {
    if (!window.confirm(`Are you sure you want to delete the branch: ${branches[key].name}?`)) return;
    
    setSuccessMsg('');
    setErrorMsg('');

    const updatedBranches = { ...branches };
    delete updatedBranches[key];

    try {
      const response = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'overseasBranches', value: JSON.stringify(updatedBranches) })
      });

      if (response.ok) {
        setBranches(updatedBranches);
        setSuccessMsg('Branch deleted successfully!');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to update branch list on database.');
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
      setErrorMsg('An error occurred during deletion.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const updatedBranches = { ...branches };
    const key = editingKey || formData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    if (!key) {
      setErrorMsg('Invalid Country Name.');
      return;
    }

    updatedBranches[key] = {
      name: formData.name,
      partner: formData.partner,
      phone: formData.phone,
      email: formData.email,
      address: formData.address
    };

    try {
      const response = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'overseasBranches', value: JSON.stringify(updatedBranches) })
      });

      if (response.ok) {
        setBranches(updatedBranches);
        setSuccessMsg(editingKey ? 'Branch details updated successfully!' : 'New branch added successfully!');
        setTimeout(() => setSuccessMsg(''), 5000);
        resetForm();
      } else {
        setErrorMsg('Failed to save branch changes to database.');
      }
    } catch (error) {
      console.error('Error saving branch details:', error);
      setErrorMsg('An error occurred while saving.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', partner: '', phone: '', email: '', address: '' });
    setEditingKey(null);
    setIsFormOpen(false);
  };

  return (
    <div className="admin-branches text-white p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-white mb-1">Manage Overseas Branches</h2>
          <p className="text-secondary small mb-0">Create, edit, and delete international partner offices of AtomLifts</p>
        </div>
        {!isFormOpen && (
          <button className="btn btn-info text-dark d-flex align-items-center justify-content-center gap-2 px-4 py-2.5 fw-bold" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} /> Add New Branch
          </button>
        )}
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

      {isFormOpen && (
        <div className="card bg-dark border-secondary mb-5 shadow-lg animate-fade-in">
          <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0 fw-bold">{editingKey ? `Edit Branch: ${branches[editingKey]?.name}` : 'Add New Branch Office'}</h4>
            <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={resetForm}><X size={18} /></button>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Country/Location Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark-lighter text-white border-secondary py-2.5" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Oman"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Partner/Company Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark-lighter text-white border-secondary py-2.5" 
                    name="partner" 
                    value={formData.partner} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. Airmech Oman LLC"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Contact Phone</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark-lighter text-white border-secondary py-2.5" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. +968 24447060"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Contact Email</label>
                  <input 
                    type="email" 
                    className="form-control bg-dark-lighter text-white border-secondary py-2.5" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="e.g. oman@atomlifts.com"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Office Address</label>
                  <textarea 
                    className="form-control bg-dark-lighter text-white border-secondary" 
                    name="address" 
                    rows="3" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Enter full office/commercial address..."
                  ></textarea>
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-end gap-3">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-info text-dark px-5 fw-bold">
                  {editingKey ? 'Update Branch' : 'Add Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }}></div>
          <p className="mt-3 text-secondary">Loading branches...</p>
        </div>
      ) : (
        <div className="row g-4">
          {Object.keys(branches).map((key) => {
            const branch = branches[key];
            return (
              <div key={key} className="col-12 col-md-6 col-lg-4">
                <div className="card bg-dark border-secondary h-100 shadow-sm hover-shadow-lg rounded-4 overflow-hidden position-relative branch-card" style={{ transition: 'all 0.3s' }}>
                  <div className="card-header bg-dark-lighter border-secondary py-3 d-flex align-items-center justify-content-between">
                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2 text-info">
                      <Globe size={18} />
                      {branch.name}
                    </h5>
                    <span className="badge bg-secondary px-2.5 py-1.5 small" style={{ fontSize: '0.65rem' }}>/{key}</span>
                  </div>
                  
                  <div className="card-body p-4 d-flex flex-column gap-3">
                    <div className="d-flex align-items-start gap-2.5">
                      <Building size={16} className="text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-secondary small fw-bold text-uppercase d-block" style={{ fontSize: '0.65rem' }}>Partner</span>
                        <span className="fw-bold text-white small">{branch.partner}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-2.5">
                      <Phone size={16} className="text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-secondary small fw-bold text-uppercase d-block" style={{ fontSize: '0.65rem' }}>Phone</span>
                        <span className="text-white small">{branch.phone}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-2.5">
                      <Mail size={16} className="text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-secondary small fw-bold text-uppercase d-block" style={{ fontSize: '0.65rem' }}>Email</span>
                        <span className="text-white small">{branch.email}</span>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-2.5 mb-2">
                      <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-secondary small fw-bold text-uppercase d-block" style={{ fontSize: '0.65rem' }}>Address</span>
                        <span className="text-white-50 small" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>{branch.address}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-auto pt-3 border-top border-secondary border-opacity-20">
                      <button className="btn btn-sm btn-icon-edit" onClick={() => handleEdit(key, branch)}>
                        <Edit2 size={15} />
                      </button>
                      <button className="btn btn-sm btn-icon-delete" onClick={() => handleDelete(key)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {Object.keys(branches).length === 0 && (
            <div className="col-12 text-center py-5 text-secondary">
              <div className="py-4">
                <Globe size={48} className="opacity-10 mb-3" />
                <p>No overseas branches defined. Click "Add New Branch" to create one!</p>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.05); }
        .btn-icon-edit { color: #3b82f6; background: rgba(59, 130, 246, 0.1); border: none; padding: 8px 12px; border-radius: 8px; transition: 0.3s; }
        .btn-icon-edit:hover { background: #3b82f6; color: white; }
        .btn-icon-delete { color: #ef4444; background: rgba(239, 68, 68, 0.1); border: none; padding: 8px 12px; border-radius: 8px; transition: 0.3s; }
        .btn-icon-delete:hover { background: #ef4444; color: white; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .branch-card:hover {
          transform: translateY(-5px);
          border-color: #0dcaf0 !important;
          box-shadow: 0 12px 24px rgba(13, 202, 240, 0.15) !important;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AdminBranches;
