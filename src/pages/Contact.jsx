import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="contact-page pt-5">
      <div className="container mt-5 pt-5 text-center" data-aos="fade-down">
         <h6 className="text-primary text-uppercase fw-bold mb-3">Get In Touch</h6>
         <h1 className="display-4 fw-bold text-white mb-5">We'd Love to Hear <span className="text-gradient">From You</span></h1>
      </div>
      <ContactForm />
      
      <section className="map-section pb-0">
        <div className="container-fluid p-0">
          <div className="glass-card mx-auto" style={{ height: '400px', width: '90%', marginBottom: '-100px', position: 'relative', zIndex: 10, borderRadius: '30px 30px 0 0' }}>
            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ borderRadius: '30px 30px 0 0' }}>
               <div className="text-center">
                  <h4 className="text-white mb-3">Visit Our Global Hub</h4>
                  <p className="text-white-50">123 Innovation Drive, Tech City, CA 94025</p>
                  <button className="btn-outline-premium mt-3">Open in Maps</button>
               </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: '200px' }} className="bg-dark-lighter"></div>
    </div>
  );
};

export default Contact;
