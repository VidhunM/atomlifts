import partnersImg from '../assets/partners.png';

const Partners = () => {
  // We duplicate the list to create a seamless loop
  const logos = [partnersImg, partnersImg, partnersImg, partnersImg];

  return (
    <section className="partner-slider">
      <div className="container-fluid px-0">
        <div className="partner-track">
          {logos.map((logo, index) => (
            <div className="partner-logo" key={index}>
              <img src={logo} alt={`Partner ${index}`} />
            </div>
          ))}
          {/* Repeat for seamless loop */}
          {logos.map((logo, index) => (
            <div className="partner-logo" key={`repeat-${index}`}>
              <img src={logo} alt={`Partner Repeat ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
