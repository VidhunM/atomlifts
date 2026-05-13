import React from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Mail, LogOut } from 'lucide-react';
import '../index.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Authentication Check
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'Manage Jobs', path: '/admin/jobs', icon: <Briefcase size={20} /> },
    { name: 'Job Applications', path: '/admin/applications', icon: <FileText size={20} /> },
    { name: 'Form Inquiries', path: '/admin/inquiries', icon: <Mail size={20} /> },
  ];

  return (
    <div className="admin-container d-flex" style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', paddingTop: '80px' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar border-end border-secondary" style={{ width: '250px', backgroundColor: '#111', padding: '2rem 1rem' }}>
        <h3 className="text-white mb-4 px-3" style={{ fontWeight: 'bold' }}>Admin Panel</h3>
        <ul className="nav flex-column mb-auto">
          {navItems.map((item) => (
            <li className="nav-item mb-2" key={item.name}>
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded text-white ${
                  location.pathname === item.path ? 'bg-primary' : 'hover-bg-dark'
                }`}
                style={{ transition: 'background-color 0.3s' }}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="border-secondary my-4" />
        <a href="#" onClick={handleLogout} className="nav-link d-flex align-items-center gap-3 px-3 text-danger hover-bg-dark rounded py-2 text-decoration-none">
          <LogOut size={20} />
          Sign Out
        </a>
        <Link to="/" className="nav-link d-flex align-items-center gap-3 px-3 text-secondary hover-bg-dark rounded py-2 mt-2 text-decoration-none">
          &larr; Back to Main Site
        </Link>
      </aside>

      {/* Main Content */}
      <main className="admin-content flex-grow-1 p-5 overflow-auto" style={{ backgroundColor: '#050505' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
