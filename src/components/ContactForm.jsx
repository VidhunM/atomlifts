import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { API_BASE_URL } from '../config';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Lift',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'contact' })
      });
      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', phone: '', projectType: 'Residential Lift', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error sending message. Please check your connection.' });
    }
  };

  return (
    <section className="contact-section position-relative overflow-hidden">
      <div className="container">
        <div className="glass-card p-4 p-md-5 overflow-hidden">
          <div className="row g-5">
            <div className="col-lg-8 mx-auto" data-aos="fade-up">
              <div className="text-center mb-5">
                <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">CONTACT US</h6>
                <h2 className="display-5 fw-bold text-white mb-0">Get In <span className="text-primary">Touch</span></h2>
              </div>
              <form className="row g-4 bg-white bg-opacity-5 p-4 p-md-5 rounded-4" onSubmit={handleSubmit}>
                <div className="col-md-4">
                  <label className="form-label text-white small opacity-75">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control bg-transparent border-white border-opacity-10 text-white p-3" 
                    placeholder="John Doe" 
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-white small opacity-75">Work Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control bg-transparent border-white border-opacity-10 text-white p-3" 
                    placeholder="john@company.com" 
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-white small opacity-75">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control bg-transparent border-white border-opacity-10 text-white p-3" 
                    placeholder="+91 12345 67890" 
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-white small opacity-75">Project Type</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="form-select bg-transparent border-white border-opacity-10 text-white p-3"
                  >
                    <option className="bg-dark">Residential Lift</option>
                    <option className="bg-dark">Commercial Building</option>
                    <option className="bg-dark">Freight Elevator</option>
                    <option className="bg-dark">Maintenance Query</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label text-white small opacity-75">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control bg-transparent border-white border-opacity-10 text-white p-3" 
                    rows="4" 
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn-premium w-100 d-flex align-items-center justify-content-center gap-2 py-3" disabled={status.type === 'loading'}>
                    {status.type === 'loading' ? 'Sending...' : 'Send Message'} <Send size={20} />
                  </button>
                  {status.message && (
                    <div className={`mt-3 text-center small ${status.type === 'success' ? 'text-success' : 'text-danger'}`}>
                      {status.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .form-control:focus, .form-select:focus {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: var(--primary);
          color: white;
          box-shadow: none;
        }
        .form-control::placeholder {
           color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
