import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', department: '', location: '', type: '', 
    experience: '', description: '', requirements: '', isActive: true
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs/all');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title, department: job.department, location: job.location, type: job.type,
      experience: job.experience, description: job.description, 
      requirements: job.requirements ? job.requirements.join('\n') : '', 
      isActive: job.isActive
    });
    setEditingId(job._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' });
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqArray = formData.requirements.split('\n').filter(r => r.trim() !== '');
    const payload = {
      ...formData,
      requirements: reqArray
    };

    try {
      const url = editingId ? `http://localhost:5000/api/jobs/${editingId}` : 'http://localhost:5000/api/jobs';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        fetchJobs();
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', department: '', location: '', type: '', experience: '', description: '', requirements: '', isActive: true });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const toggleStatus = async (job) => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !job.isActive })
      });
      fetchJobs();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-jobs text-white">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h2 className="mb-0">Manage Jobs</h2>
        {!isFormOpen && (
          <button className="btn btn-success d-flex align-items-center justify-content-center gap-2 px-4" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} /> Add New Job
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="card bg-dark border-secondary mb-5 shadow">
          <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0">{editingId ? 'Edit Job' : 'Create New Job'}</h4>
            <button className="btn btn-sm btn-outline-secondary" onClick={resetForm}><X size={18} /></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-secondary">Job Title</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Department</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="department" value={formData.department} onChange={handleInputChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-secondary">Location</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="location" value={formData.location} onChange={handleInputChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-secondary">Employment Type</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="type" value={formData.type} onChange={handleInputChange} placeholder="e.g. Full-time" required />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-secondary">Experience</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="experience" value={formData.experience} onChange={handleInputChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Description</label>
                  <textarea className="form-control bg-dark text-white border-secondary" name="description" rows="3" value={formData.description} onChange={handleInputChange} required></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Requirements (One per line)</label>
                  <textarea className="form-control bg-dark text-white border-secondary" name="requirements" rows="4" value={formData.requirements} onChange={handleInputChange} placeholder="Requirement 1&#10;Requirement 2"></textarea>
                </div>
                <div className="col-12">
                  <div className="form-check form-switch mt-2">
                    <input className="form-check-input" type="checkbox" role="switch" id="isActive" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
                    <label className="form-check-label text-secondary" htmlFor="isActive">Job is Active</label>
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex flex-column flex-md-row justify-content-md-end gap-2">
                <button type="button" className="btn btn-secondary px-4" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-success px-4">{editingId ? 'Update Job' : 'Save Job'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-success"></div></div>
      ) : (
        <div className="table-responsive bg-dark rounded border border-secondary shadow-sm">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th className="d-none d-md-table-cell">Location</th>
                <th className="d-none d-lg-table-cell">Type</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id} className="align-middle">
                  <td>
                    <div className="fw-bold">{job.title}</div>
                    <small className="text-secondary">{job.department}</small>
                  </td>
                  <td className="d-none d-md-table-cell">{job.location}</td>
                  <td className="d-none d-lg-table-cell">{job.type}</td>
                  <td>
                    <button 
                      className={`badge border-0 ${job.isActive ? 'bg-success' : 'bg-secondary'}`}
                      onClick={() => toggleStatus(job)}
                      title="Click to toggle status"
                    >
                      {job.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(job)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(job._id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr><td colSpan="5" className="text-center py-4 text-secondary">No jobs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
