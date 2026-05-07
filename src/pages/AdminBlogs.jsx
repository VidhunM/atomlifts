import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', category: '', 
    authorName: '', authorRole: '', readTime: '', imageUrl: '', slug: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
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

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title, excerpt: blog.excerpt, content: blog.content, category: blog.category,
      authorName: blog.author?.name || '', authorRole: blog.author?.role || '',
      readTime: blog.readTime || '', imageUrl: blog.imageUrl, slug: blog.slug
    });
    setEditingId(blog._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title, excerpt: formData.excerpt, content: formData.content,
      category: formData.category, readTime: formData.readTime, imageUrl: formData.imageUrl, slug: formData.slug,
      author: { name: formData.authorName, role: formData.authorRole }
    };

    try {
      const url = editingId ? `http://localhost:5000/api/blogs/${editingId}` : 'http://localhost:5000/api/blogs';
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
    setFormData({ title: '', excerpt: '', content: '', category: '', authorName: '', authorRole: '', readTime: '', imageUrl: '', slug: '' });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="admin-blogs text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Blogs</h2>
        {!isFormOpen && (
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} /> Add New Blog
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="card bg-dark border-secondary mb-5 shadow">
          <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0">{editingId ? 'Edit Blog' : 'Create New Blog'}</h4>
            <button className="btn btn-sm btn-outline-secondary" onClick={resetForm}><X size={18} /></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-secondary">Title</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Slug</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="slug" value={formData.slug} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Category</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="category" value={formData.category} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Read Time</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="readTime" value={formData.readTime} onChange={handleInputChange} placeholder="e.g. 5 min read" />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Author Name</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="authorName" value={formData.authorName} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Author Role</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="authorRole" value={formData.authorRole} onChange={handleInputChange} />
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Image URL</label>
                  <input type="text" className="form-control bg-dark text-white border-secondary" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Excerpt</label>
                  <textarea className="form-control bg-dark text-white border-secondary" name="excerpt" rows="2" value={formData.excerpt} onChange={handleInputChange} required></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Content (HTML allowed)</label>
                  <textarea className="form-control bg-dark text-white border-secondary" name="content" rows="6" value={formData.content} onChange={handleInputChange} required></textarea>
                </div>
              </div>
              <div className="mt-4 text-end">
                <button type="button" className="btn btn-secondary me-2" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update Blog' : 'Save Blog'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
      ) : (
        <div className="table-responsive bg-dark rounded border border-secondary shadow-sm">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id} className="align-middle">
                  <td>
                    <div className="fw-bold">{blog.title}</div>
                    <small className="text-secondary">{blog.slug}</small>
                  </td>
                  <td><span className="badge bg-secondary">{blog.category}</span></td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(blog)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog._id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr><td colSpan="4" className="text-center py-4 text-secondary">No blogs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
