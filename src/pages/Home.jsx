import Hero from '../components/Hero';
import Services from '../components/Services';
import Partners from '../components/Partners';
import AboutEngineering from '../components/AboutEngineering';
import CoreServices from '../components/CoreServices';
import Projects from '../components/Projects';
import VisualPrecision from '../components/VisualPrecision';
import Industries from '../components/Industries';
import TestimonialsStats from '../components/TestimonialsStats';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Partners />
      <AboutEngineering />
      <CoreServices />
      <Projects />
      <VisualPrecision />
      <Industries />
      <TestimonialsStats />
      {/*<ContactForm />*/}
    </>
  );
};

export default Home;
