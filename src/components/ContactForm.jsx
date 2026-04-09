import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactForm = () => {
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
              <form className="row g-4 bg-white bg-opacity-5 p-4 p-md-5 rounded-4" onSubmit={(e) => e.preventDefault()}>
                <div className="col-md-6">
                  <label className="form-label text-white small opacity-75">Full Name</label>
                  <input type="text" className="form-control bg-transparent border-white border-opacity-10 text-white p-3" placeholder="John Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white small opacity-75">Work Email</label>
                  <input type="email" className="form-control bg-transparent border-white border-opacity-10 text-white p-3" placeholder="john@company.com" />
                </div>
                <div className="col-12">
                  <label className="form-label text-white small opacity-75">Project Type</label>
                  <select className="form-select bg-transparent border-white border-opacity-10 text-white p-3">
                    <option className="bg-dark">Residential Lift</option>
                    <option className="bg-dark">Commercial Building</option>
                    <option className="bg-dark">Freight Elevator</option>
                    <option className="bg-dark">Maintenance Query</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label text-white small opacity-75">Message</label>
                  <textarea className="form-control bg-transparent border-white border-opacity-10 text-white p-3" rows="4" placeholder="Tell us about your project..."></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn-premium w-100 d-flex align-items-center justify-content-center gap-2 py-3">
                    Send Message <Send size={20} />
                  </button>
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
