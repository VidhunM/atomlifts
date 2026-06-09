
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { API_BASE_URL } from '../config';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', category: '', 
    authorName: '', authorRole: '', readTime: '', imageUrl: '', slug: '',
    publishedDate: new Date().toISOString().split('T')[0]
  });

  const backendUrl = API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/blogs`);
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      // data is something like "/uploads/image-123.jpg"
      setFormData({ ...formData, imageUrl: `${backendUrl}${data}` });
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Upload failed');
      setUploading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title, excerpt: blog.excerpt, content: blog.content, category: blog.category,
      authorName: blog.author?.name || '', authorRole: blog.author?.role || '',
      readTime: blog.readTime || '', imageUrl: blog.imageUrl, slug: blog.slug,
      publishedDate: blog.publishedDate ? new Date(blog.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setEditingId(blog._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await fetch(`${backendUrl}/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textOnly = formData.content ? formData.content.replace(/<[^>]*>/g, '') : '';
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
    const autoReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const payload = {
      title: formData.title, excerpt: formData.excerpt, content: formData.content,
      category: formData.category, readTime: autoReadTime, imageUrl: formData.imageUrl, slug: formData.slug,
      author: { name: formData.authorName, role: formData.authorRole },
      publishedDate: formData.publishedDate
    };

    try {
      const url = editingId ? `${backendUrl}/api/blogs/${editingId}` : `${backendUrl}/api/blogs`;
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        fetchBlogs();
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', category: '', authorName: '', authorRole: '', readTime: '', imageUrl: '', slug: '', publishedDate: new Date().toISOString().split('T')[0] });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="admin-blogs text-white p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
           <h2 className="fw-bold text-white mb-1">Manage Blogs</h2>
           <p className="text-secondary small mb-0">Create and edit blog posts for AtomLifts</p>
        </div>
        {!isFormOpen && (
          <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2 fw-bold" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} /> Add New Blog
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="card bg-dark border-secondary mb-5 shadow-lg animate-fade-in">
          <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0 fw-bold">{editingId ? 'Edit Blog Post' : 'Create New Post'}</h4>
            <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={resetForm}><X size={18} /></button>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Blog Title</label>
                  <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary small fw-bold text-uppercase">URL Slug</label>
                  <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="slug" value={formData.slug} onChange={handleInputChange} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Category</label>
                  <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="category" value={formData.category} onChange={handleInputChange} required />
                </div>

                <div className="col-md-4">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Author Name</label>
                  <input type="text" className="form-control bg-dark-lighter text-white border-secondary py-2" name="authorName" value={formData.authorName} onChange={handleInputChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Publish Date</label>
                  <input type="date" className="form-control bg-dark-lighter text-white border-secondary py-2" name="publishedDate" value={formData.publishedDate} onChange={handleInputChange} required />
                </div>
                
                <div className="col-12">
                   <label className="form-label text-secondary small fw-bold text-uppercase">Featured Image</label>
                   <div className="upload-container glass-card p-3 border border-secondary border-dashed rounded d-flex align-items-center gap-4">
                      <div className="image-preview-box bg-dark-lighter rounded overflow-hidden d-flex align-items-center justify-content-center" style={{ width: '120px', height: '80px', border: '1px solid rgba(255,255,255,0.1)' }}>
                         {formData.imageUrl ? (
                           <img src={formData.imageUrl} alt="Preview" className="w-100 h-100 object-fit-cover" />
                         ) : (
                           <ImageIcon size={32} className="text-secondary opacity-50" />
                         )}
                      </div>
                      <div className="flex-grow-1">
                         <div className="d-flex align-items-center gap-2 mb-2">
                            <label className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 cursor-pointer">
                               <Upload size={14} /> {uploading ? 'Uploading...' : 'Upload Image'}
                               <input type="file" className="d-none" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                            </label>
                            {formData.imageUrl && <span className="text-success small"><ImageIcon size={12} /> Image Ready</span>}
                         </div>
                         <p className="text-secondary small mb-0">Recommended size: 1200x800px. Max size: 5MB.</p>
                      </div>
                   </div>
                   <input type="hidden" name="imageUrl" value={formData.imageUrl} required />
                </div>

                <div className="col-12">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Excerpt (Short Summary)</label>
                  <textarea className="form-control bg-dark-lighter text-white border-secondary" name="excerpt" rows="2" value={formData.excerpt} onChange={handleInputChange} required></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary small fw-bold text-uppercase">Blog Content (Rich Text Editor)</label>
                  <RichTextEditor value={formData.content} onChange={(html) => setFormData(prev => ({ ...prev, content: html }))} />
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-end gap-3">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-primary px-5 fw-bold" disabled={uploading}>
                   {editingId ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
           <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
           <p className="mt-3 text-secondary">Loading blogs...</p>
        </div>
      ) : (
        <div className="table-responsive bg-dark rounded-4 border border-secondary border-opacity-25 shadow-lg overflow-hidden">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr className="bg-dark-lighter">
                <th className="px-4 py-3 border-0">Blog Title</th>
                <th className="px-4 py-3 border-0 d-none d-md-table-cell">Category</th>
                <th className="px-4 py-3 border-0 text-center d-none d-lg-table-cell">Date</th>
                <th className="px-4 py-3 border-0 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id} className="align-middle border-secondary border-opacity-10">
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                       <img src={blog.imageUrl} alt="" className="rounded" style={{ width: '50px', height: '35px', objectFit: 'cover' }} />
                       <div>
                          <div className="fw-bold text-white">{blog.title}</div>
                          <small className="text-secondary">/{blog.slug}</small>
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 d-none d-md-table-cell">
                     <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2">
                        {blog.category}
                     </span>
                  </td>
                  <td className="px-4 py-3 text-center text-secondary small d-none d-lg-table-cell">
                     {new Date(blog.publishedDate || blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-sm btn-icon-edit me-2" onClick={() => handleEdit(blog)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-sm btn-icon-delete" onClick={() => handleDelete(blog._id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr><td colSpan="4" className="text-center py-5 text-secondary">
                   <div className="py-4">
                      <ImageIcon size={48} className="opacity-10 mb-3" />
                      <p>No blog posts found. Start by creating one!</p>
                   </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .bg-dark-lighter { background: rgba(255,255,255,0.05); }
        .border-dashed { border-style: dashed !important; }
        .cursor-pointer { cursor: pointer; }
        .btn-icon-edit { color: #3b82f6; background: rgba(59, 130, 246, 0.1); border: none; padding: 8px; border-radius: 8px; transition: 0.3s; }
        .btn-icon-edit:hover { background: #3b82f6; color: white; }
        .btn-icon-delete { color: #ef4444; background: rgba(239, 68, 68, 0.1); border: none; padding: 8px; border-radius: 8px; transition: 0.3s; }
        .btn-icon-delete:hover { background: #ef4444; color: white; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default AdminBlogs;
