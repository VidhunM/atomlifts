import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, TrendingUp, Gauge, Building2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminAboutStats = () => {
  const [stats, setStats] = useState({
    awards: 250,
    riders: 10,
    uptime: 99.9,
    lifts: 15
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const backendUrl = API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/settings/aboutStats`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.value) {
          try {
            const parsed = JSON.parse(data.value);
            if (parsed) {
              setStats({
                awards: parsed.awards ?? 250,
                riders: parsed.riders ?? 10,
                uptime: parsed.uptime ?? 99.9,
                lifts: parsed.lifts ?? 15
              });
            }
          } catch (e) {
            console.error('Error parsing aboutStats JSON:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching aboutStats setting:', error);
    }
  };

  const handleSaveStats = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const saveResponse = await fetch(`${backendUrl}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'aboutStats', value: JSON.stringify(stats) })
      });

      if (saveResponse.ok) {
        setSuccessMsg('About page statistics updated successfully!');
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg('Failed to save settings to the database.');
      }
    } catch (error) {
      console.error('Error saving aboutStats:', error);
      setErrorMsg('An error occurred while saving.');
    }
  };

  return (
    <div className="admin-stats-page text-white">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <Link to="/admin" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 mb-2 w-max" style={{ width: 'max-content' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h2 className="font-bold text-white mb-1">Manage About page Stats</h2>
          <p className="text-secondary small mb-0">Modify the four key stats shown in the statistics section on the About page.</p>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success rounded-3 mb-4 py-2.5 px-3 small">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger rounded-3 mb-4 py-2.5 px-3 small">
          {errorMsg}
        </div>
      )}

      <div className="card bg-dark text-white border-secondary mb-4 shadow-lg">
        <div className="card-header bg-dark-lighter border-secondary py-3">
          <h4 className="mb-0 fw-bold d-flex align-items-center gap-2">
            <Award className="text-warning" size={22} />
            Edit About page Key Metrics
          </h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSaveStats}>
            <div className="row g-4">
              
              {/* Stat 1: Industry Awards */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <Award size={16} className="text-primary" />
                    Industry Awards (e.g. 250)
                  </label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={stats.awards}
                    onChange={(e) => setStats({ ...stats, awards: Number(e.target.value) })}
                    required
                  />
                  <small className="text-secondary mt-1 d-block">Will display with "+" suffix (e.g. 250+)</small>
                </div>
              </div>

              {/* Stat 2: Daily Riders */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <TrendingUp size={16} className="text-success" />
                    Daily Riders (e.g. 10)
                  </label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={stats.riders}
                    onChange={(e) => setStats({ ...stats, riders: Number(e.target.value) })}
                    required
                  />
                  <small className="text-secondary mt-1 d-block">Will display with "M+" suffix (e.g. 10M+)</small>
                </div>
              </div>

              {/* Stat 3: Uptime Rate */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <Gauge size={16} className="text-warning" />
                    Uptime Rate % (e.g. 99.9)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={stats.uptime}
                    onChange={(e) => setStats({ ...stats, uptime: Number(e.target.value) })}
                    required
                  />
                  <small className="text-secondary mt-1 d-block">Will display with "%" suffix (e.g. 99.9%)</small>
                </div>
              </div>

              {/* Stat 4: Active Lifts */}
              <div className="col-md-6">
                <div className="p-3 bg-dark-lighter rounded-3 border border-secondary border-opacity-20">
                  <label className="form-label text-secondary small fw-bold text-uppercase d-flex align-items-center gap-2 mb-2">
                    <Building2 size={16} className="text-info" />
                    Active Lifts (e.g. 15)
                  </label>
                  <input
                    type="number"
                    className="form-control bg-dark text-white border-secondary py-2.5 px-3"
                    value={stats.lifts}
                    onChange={(e) => setStats({ ...stats, lifts: Number(e.target.value) })}
                    required
                  />
                  <small className="text-secondary mt-1 d-block">Will display with "k+" suffix (e.g. 15k+)</small>
                </div>
              </div>

            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-warning text-dark fw-bold px-5 py-2.5">
                Save Stats Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutStats;
