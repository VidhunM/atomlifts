import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Mail, LogOut, Menu, X, MessageSquare, Users, Globe, Award, PhoneCall, Link2 } from 'lucide-react';
import '../index.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Branches', path: '/admin/branches', icon: <Globe size={20} /> },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
    { name: 'Manage Jobs', path: '/admin/jobs', icon: <Briefcase size={20} /> },
    { name: 'Job Applications', path: '/admin/applications', icon: <FileText size={20} /> },
    { name: 'Form Inquiries', path: '/admin/inquiries', icon: <Mail size={20} /> },
    { name: 'Callback Requests', path: '/admin/callbacks', icon: <PhoneCall size={20} /> },
    { name: 'Testimonials & Stats', path: '/admin/testimonials-stats', icon: <MessageSquare size={20} /> },
    { name: 'Manage Clients', path: '/admin/clients', icon: <Users size={20} /> },
    { name: 'About Stats', path: '/admin/about-stats', icon: <Award size={20} /> },
    { name: 'Icon Redirect Links', path: '/admin/social-links', icon: <Link2 size={20} /> },
  ];

  return (
    <div className="admin-container">
      {/* Mobile Toggle Button */}
      <button 
        className="admin-mobile-toggle d-lg-none" 
        onClick={toggleSidebar}
        aria-label="Toggle Navigation"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="admin-sidebar-overlay d-lg-none" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h3 className="text-white mb-0" style={{ fontWeight: 'bold' }}>Admin Panel</h3>
          <button className="btn d-lg-none text-white p-0" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        
        <ul className="nav flex-column mb-auto mt-4">
          {navItems.map((item) => (
            <li className="nav-item mb-2" key={item.name}>
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center gap-3 py-3 px-3 rounded text-white ${
                  location.pathname === item.path ? 'bg-primary' : 'hover-bg-dark'
                }`}
                onClick={closeSidebar}
                style={{ transition: 'background-color 0.3s' }}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="admin-sidebar-footer">
          <hr className="border-secondary my-4" />
          <a href="#" onClick={handleLogout} className="nav-link d-flex align-items-center gap-3 px-3 text-danger hover-bg-dark rounded py-2 text-decoration-none">
            <LogOut size={20} />
            Sign Out
          </a>
          <Link to="/" className="nav-link d-flex align-items-center gap-3 px-3 text-secondary hover-bg-dark rounded py-2 mt-2 text-decoration-none">
            &larr; Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
