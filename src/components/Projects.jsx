import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const Projects = () => {
  const projectList = [
    {
      id: 1,
      image: project1,
      title: 'SkyGrid Modernization',
      desc: 'Complete overhaul of vertical mobility for the SkyGrid high-rise complex, featuring high-speed glass elevators.'
    },
    {
      id: 2,
      image: project2,
      title: 'AeroVista Installation',
      desc: 'Smart-connected elevator installation for the AeroVista corporate headquarters with IoT monitoring.'
    },
    {
      id: 3,
      image: project3,
      title: 'InfraScan Safety Program',
      desc: 'State-wide safety and maintenance modernization for government infrastructure and public sectors.'
    }
  ];

  return (
    <section className="projects-section bg-dark py-4 position-relative">
      <div className="container py-2">
        
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5 pb-4">
          <div className="col-lg-8" data-aos="fade-up">
            <h6 className="text-primary text-uppercase tracking-widest fw-bold mb-3 small">OUR PROJECTS</h6>
            <h2 className="display-4 fw-800 text-white mb-0">
               Captivating and <span className="text-primary">Cinematic</span> Lift Projects
            </h2>
          </div>
        </div>

        {/* Project Grid */}
        <div className="row g-4">
          {projectList.map((project, index) => (
            <div className="col-lg-4 col-md-6" key={project.id} data-aos="fade-up" data-aos-delay={index * 150}>
              <div className="project-card-wrapper shadow-2xl">
                
                {/* Front: Image & Title */}
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-overlay">
                  <h4 className="project-title">{project.title}</h4>
                </div>

                {/* Back/Hover: Description & Button (Function image card hover) */}
                <div className="project-details-content">
                  <p className="text-white opacity-80 mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  <button className="btn-premium py-2 px-4 shadow-none" style={{ borderRadius: '0', fontSize: '0.85rem' }}>
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
