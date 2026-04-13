
const Partners = () => {
  const logos = [
    { name: 'OTIS', font: '900' },
    { name: 'Schindler', font: '800', italic: true },
    { name: 'KONE', font: '900' },
    { name: 'ThyssenKrupp', font: '800' },
    { name: 'MITSUBISHI', font: '900' },
    { name: 'FUJITEC', font: '900' }
  ];

  return (
    <section className="partner-slider bg-dark py-4">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center logo-scroll-container">
          {/* First set */}
          {logos.map((logo, idx) => (
            <div className="partner-logo-item" key={`logo-1-${idx}`}>
               <span style={{ 
                 color: '#ffffff', 
                 fontWeight: logo.font, 
                 fontSize: '1.1rem', 
                 letterSpacing: '0.15em',
                 fontStyle: logo.italic ? 'italic' : 'normal',
                 opacity: 0.5
               }}>
                 {logo.name}
               </span>
            </div>
          ))}
          {/* Repeat set */}
          {logos.map((logo, idx) => (
            <div className="partner-logo-item" key={`logo-2-${idx}`}>
               <span style={{ 
                 color: '#ffffff', 
                 fontWeight: logo.font, 
                 fontSize: '1.1rem', 
                 letterSpacing: '0.15em',
                 fontStyle: logo.italic ? 'italic' : 'normal',
                 opacity: 0.5
               }}>
                 {logo.name}
               </span>
            </div>
          ))}
          {/* Triplicate set */}
          {logos.map((logo, idx) => (
            <div className="partner-logo-item" key={`logo-3-${idx}`}>
               <span style={{ 
                 color: '#ffffff', 
                 fontWeight: logo.font, 
                 fontSize: '1.1rem', 
                 letterSpacing: '0.15em',
                 fontStyle: logo.italic ? 'italic' : 'normal',
                 opacity: 0.5
               }}>
                 {logo.name}
               </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
