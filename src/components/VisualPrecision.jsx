import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { API_BASE_URL } from '../config';

const VisualPrecision = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/5m3O5PzO4c4?autoplay=1');
  const [isVideoFile, setIsVideoFile] = useState(false);
  
  const backendUrl = API_BASE_URL;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/settings/visualPrecisionVideo`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.value) {
            const val = data.value;
            // Check if it is a direct uploaded file path
            if (val.includes('/uploads/')) {
              setVideoUrl(val.startsWith('http') ? val : `${backendUrl}${val}`);
              setIsVideoFile(true);
            } else {
              // It's a YouTube URL. Let's convert to embed standard if needed.
              let embedUrl = val;
              if (val.includes('watch?v=')) {
                const vidId = val.split('v=')[1]?.split('&')[0];
                embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
              } else if (val.includes('youtu.be/')) {
                const vidId = val.split('youtu.be/')[1]?.split('?')[0];
                embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1`;
              } else if (!val.includes('embed') && !val.includes('?autoplay=1')) {
                embedUrl = `${val}?autoplay=1`;
              }
              setVideoUrl(embedUrl);
              setIsVideoFile(false);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching visual precision video:', error);
      }
    };
    fetchVideo();
  }, []);

  return (
    <section className="visual-precision-section position-relative">
      <div className="visual-overlay"></div>
      
      {/* Central Play Button */}
      <div className="play-button-wrapper" onClick={() => setShowVideo(true)}>
        <div className="play-btn-circle shadow-2xl">
          <Play size={40} />
        </div>
      </div>

      <div className="container visual-content">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="zoom-in">
            <h1 className="huge-title text-white">
              VISUAL<br />PRECISION
            </h1>
            <p className="text-white-50 fs-5 mt-4 max-width-600 mx-auto">
              Experience the future of vertical mobility through our cinematic engineering showcase.
              Precision in every floor, excellence in every lift.
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal (Appears when play button is clicked) */}
      {showVideo && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, background: 'rgba(0,0,0,0.9)' }}>
          <div className="position-absolute top-0 end-0 p-4 cursor-pointer text-white" onClick={() => setShowVideo(false)}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </div>
          <div className="w-100 px-3 d-flex align-items-center justify-content-center" style={{ maxWidth: '1000px', aspectRatio: '16/9' }}>
            {isVideoFile ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="w-100 h-100 rounded shadow-2xl" 
                style={{ objectFit: 'contain', background: '#000' }}
              />
            ) : (
              <iframe 
                 width="100%" 
                 height="100%" 
                 src={videoUrl} 
                 title="Cinematic Lift Engineering" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
                 className="rounded shadow-2xl"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default VisualPrecision;
