import Hero from '../components/Hero';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <div className="section-divider py-5 bg-dark"></div>
      <ContactForm />
    </>
  );
};

export default Home;
