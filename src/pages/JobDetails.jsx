import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ChevronLeft, Send, CheckCircle2, AlertCircle, Upload, FileText } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null,
    consent: false
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Job not found');
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch job details:', err);
        setJob(null);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      setMessage({ type: 'error', text: 'Please agree to the terms and conditions.' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    const data = new FormData();
    data.append('jobId', id);
    data.append('jobTitle', job.title);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('coverLetter', formData.coverLetter);
    data.append('resume', formData.resume);

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Application submitted successfully! We will get back to you soon.' });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          coverLetter: '',
          resume: null,
          consent: false
        });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to submit application. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-vh-100 bg-dark d-flex flex-column align-items-center justify-content-center text-white">
        <AlertCircle size={64} className="text-warning mb-4" />
        <h2 className="fw-900">Job Not Found</h2>
        <button onClick={() => navigate('/careers')} className="btn btn-premium mt-4">
          <ChevronLeft size={18} className="me-2" /> Back to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="job-details-page bg-dark min-vh-100 pb-5 pt-5">
      <div className="container pt-5">
        <button onClick={() => navigate('/careers')} className="back-link mb-4">
          <ChevronLeft size={18} /> Back to Open Positions
        </button>

        <div className="row g-4 justify-content-center">
          {/* Job Info Column */}
          <div className="col-12">
            <div className="job-info-card glass-card-dark p-4 p-lg-5 mb-4" data-aos="fade-up">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h1 className="display-5 fw-900 text-white mb-2">{job.title}</h1>
                  <div className="d-flex flex-wrap gap-3">
                    <span className="badge-glow-warning d-flex align-items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="badge-glow-warning d-flex align-items-center gap-1">
                      <Briefcase size={14} /> {job.type}
                    </span>
                    <span className="badge-glow-warning d-flex align-items-center gap-1">
                      <Clock size={14} /> {job.experience}
                    </span>
                  </div>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4 className="text-warning fw-800 mb-3 text-uppercase small tracking-widest">Description</h4>
                <p className="text-light-50 fs-5 lh-base mb-5" style={{ opacity: 0.9 }}>
                  {job.description}
                </p>

                {job.requirements && job.requirements.length > 0 && (
                  <>
                    <h4 className="text-warning fw-800 mb-3 text-uppercase small tracking-widest">Requirements</h4>
                    <ul className="requirements-list list-unstyled">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-light-50 mb-3 d-flex gap-3 align-items-start">
                          <CheckCircle2 size={18} className="text-warning mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Form Column - Now Full Width & Elaborate */}
          <div className="col-12">
            <div className="application-card glass-card-dark p-4 p-lg-5 rounded-4 shadow-2xl border-warning-subtle" data-aos="fade-up">
              <div className="d-flex align-items-center gap-3 mb-4 border-bottom border-secondary pb-3">
                <div className="icon-box-warning"><Briefcase size={24} /></div>
                <h2 className="text-white fw-900 mb-0 h3">Application Form</h2>
              </div>
              
              {message.text && (
                <div className={`alert ${message.type === 'success' ? 'alert-success bg-success text-white border-0' : 'alert-danger bg-danger text-white border-0'} rounded-3 mb-5 d-flex align-items-center gap-2 shadow-lg`}>
                  {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="application-form">
                <div className="row g-4">
                  <div className="col-md-6 mb-2">
                    <label className="form-label text-white-50 fw-bold small mb-2 text-uppercase tracking-wider">Full Name <span className="text-warning">*</span></label>
                    <input 
                      type="text" 
                      name="fullName"
                      className="form-control premium-input py-3" 
                      placeholder="e.g. John Doe"
                      required 
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <label className="form-label text-white-50 fw-bold small mb-2 text-uppercase tracking-wider">Email Address <span className="text-warning">*</span></label>
                    <input 
                      type="email" 
                      name="email"
                      className="form-control premium-input py-3" 
                      placeholder="e.g. john@example.com"
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <label className="form-label text-white-50 fw-bold small mb-2 text-uppercase tracking-wider">Phone Number <span className="text-warning">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-control premium-input py-3" 
                      placeholder="e.g. +91 98765 43210"
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <label className="form-label text-white-50 fw-bold small mb-2 text-uppercase tracking-wider">LinkedIn Profile (Optional)</label>
                    <input 
                      type="url" 
                      name="linkedin"
                      className="form-control premium-input py-3" 
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin || ''}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label text-white-50 fw-bold small mb-2 text-uppercase tracking-wider">Cover Letter <span className="text-warning">*</span></label>
                    <textarea 
                      name="coverLetter"
                      className="form-control premium-input" 
                      rows="6" 
                      placeholder="Explain why you're the perfect fit for this role..."
                      required
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label text-white-50 fw-bold small mb-2 text-uppercase tracking-wider">Upload CV/Resume <span className="text-warning">*</span></label>
                    <div className="file-upload-box p-4 text-center rounded-3 border-dashed-warning">
                      <input 
                        type="file" 
                        name="resume"
                        id="resume-upload" 
                        key={formData.resume ? 'file-present' : 'file-empty'}
                        className="d-none" 
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={handleInputChange}
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <div className="mb-3 text-warning"><Upload size={40} /></div>
                        <h5 className="text-white mb-1">{formData.resume ? formData.resume.name : 'Click to Upload Resume'}</h5>
                        <p className="text-white-50 small mb-0">PDF, DOC, DOCX (Max 5MB)</p>
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mb-4 mt-4">
                    <div className="form-check custom-checkbox py-2">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="consent"
                        id="consent-check" 
                        required 
                        checked={formData.consent}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label text-white-50 small" htmlFor="consent-check">
                        I hereby declare that the information provided is true and I agree to the processing of my personal data. <span className="text-warning">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="col-12 text-center text-md-start">
                    <button 
                      type="submit" 
                      className="btn btn-premium px-5 py-3 d-flex align-items-center justify-content-center gap-3 w-100 w-md-auto"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Application <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .job-details-page { background: #050505; color: white; }
        
        .back-link {
          background: none; border: none; color: #f8c02d; font-weight: 700;
          display: flex; align-items: center; gap: 8px; transition: 0.3s;
          padding: 0; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;
        }
        .back-link:hover { color: white; transform: translateX(-5px); }

        .badge-glow-warning {
          background: rgba(248,192,45,0.1);
          border: 1px solid rgba(248,192,45,0.3);
          color: #f8c02d; padding: 6px 14px; border-radius: 50px;
          font-size: 0.85rem; font-weight: 700;
        }

        .premium-input {
          background: #151515 !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: white !important; padding: 14px 18px; border-radius: 8px;
          transition: 0.3s;
        }
        .premium-input:focus {
          border-color: #f8c02d !important;
          background: #1a1a1a !important;
          box-shadow: 0 0 15px rgba(248,192,45,0.1) !important;
        }

        .btn-premium {
          background: #f8c02d; color: #000; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1px; border: none;
          transition: 0.3s; padding: 15px 40px; border-radius: 8px;
        }
        .btn-premium:hover:not(:disabled) {
          background: white; transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(248,192,45,0.2);
        }
        .btn-premium:disabled { opacity: 0.7; }

        .custom-checkbox .form-check-input {
          background-color: transparent; border: 1px solid rgba(255,255,255,0.3);
          cursor: pointer;
        }
        .custom-checkbox .form-check-input:checked {
          background-color: #f8c02d; border-color: #f8c02d;
        }

        .glass-card-dark {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .border-warning-subtle { border-color: rgba(248,192,45,0.2) !important; }

        .icon-box-warning {
          width: 50px; height: 50px;
          background: rgba(248,192,45,0.1);
          color: #f8c02d; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(248,192,45,0.3);
        }

        .file-upload-box {
          border: 2px dashed rgba(248,192,45,0.3);
          background: rgba(248,192,45,0.02);
          transition: 0.3s;
        }
        .file-upload-box:hover {
          background: rgba(248,192,45,0.08);
          border-color: #f8c02d;
        }
      `}</style>
    </div>
  );
};

export default JobDetails;
