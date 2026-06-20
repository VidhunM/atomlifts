import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Escalator from './pages/Escalator';
import MovingWalkways from './pages/MovingWalkways';
import HomeLifts from './pages/HomeLifts';
import PassengerLifts from './pages/PassengerLifts';
import HospitalLifts from './pages/HospitalLifts';
import PremiumLifts from './pages/PremiumLifts';
import GoodsLifts from './pages/GoodsLifts';
import ExpressLifts from './pages/ExpressLifts';
import VehicleLifts from './pages/VehicleLifts';
import CommercialLifts from './pages/CommercialLifts';
import ResidentialLiftsHub from './pages/ResidentialLiftsHub';
import IndustrialHub from './pages/IndustrialHub';
import ParkingHub from './pages/ParkingHub';
import LiftsHub from './pages/LiftsHub';
import EscalatorsHub from './pages/EscalatorsHub';
import IndustrialLifts from './pages/IndustrialLifts';
import ParkingSolutions from './pages/ParkingSolutions';
import Careers from './pages/Careers';
import JobDetails from './pages/JobDetails';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import InquiryModal from './components/InquiryModal';
import { Outlet } from 'react-router-dom';
import OverseasBranch from './pages/OverseasBranch';

// SEO Pages
import HomeLiftChennai from './pages/HomeLiftChennai';
import PassengerLiftManufacturer from './pages/PassengerLiftManufacturer';
import ElevatorAMC from './pages/ElevatorAMC';
import LiftModernization from './pages/LiftModernization';
import HospitalLiftInstallation from './pages/HospitalLiftInstallation';

// Admin Pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlogs from './pages/AdminBlogs';
import AdminJobs from './pages/AdminJobs';
import AdminInquiries from './pages/AdminInquiries';
import AdminCallbacks from './pages/AdminCallbacks';
import AdminApplications from './pages/AdminApplications';
import AdminLogin from './pages/AdminLogin';
import AdminTestimonialsStats from './pages/AdminTestimonialsStats';
import AdminClients from './pages/AdminClients';
import AdminBranches from './pages/AdminBranches';
import AdminAboutStats from './pages/AdminAboutStats';
import AdminSocialLinks from './pages/AdminSocialLinks';

const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
    <InquiryModal />
  </>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          {/* Admin Login (Standalone) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="branches" element={<AdminBranches />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="callbacks" element={<AdminCallbacks />} />
            <Route path="testimonials-stats" element={<AdminTestimonialsStats />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="about-stats" element={<AdminAboutStats />} />
            <Route path="social-links" element={<AdminSocialLinks />} />
          </Route>

          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/details/:id" element={<JobDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/escalators" element={<EscalatorsHub />} />
            <Route path="/escalators/standard" element={<Escalator />} />
            <Route path="/escalators/moving-walkways" element={<MovingWalkways />} />
            <Route path="/lifts" element={<LiftsHub />} />
            <Route path="/lifts/residential" element={<ResidentialLiftsHub />} />
            <Route path="/lifts/residential/home" element={<HomeLifts />} />
            <Route path="/lifts/residential/passenger" element={<PassengerLifts />} />
            <Route path="/lifts/commercial" element={<CommercialLifts />} />
            <Route path="/lifts/commercial/hospital" element={<HospitalLifts />} />
            <Route path="/lifts/commercial/premium" element={<PremiumLifts />} />
            <Route path="/lifts/commercial/goods" element={<GoodsLifts />} />
            <Route path="/lifts/commercial/express" element={<ExpressLifts />} />
            <Route path="/lifts/commercial/vehicle" element={<VehicleLifts />} />
            <Route path="/lifts/industrial" element={<IndustrialHub />} />
            <Route path="/lifts/industrial/material" element={<IndustrialLifts />} />
            <Route path="/lifts/parking" element={<ParkingHub />} />
            <Route path="/lifts/parking/car" element={<ParkingSolutions />} />
            <Route path="/overseas/:country" element={<OverseasBranch />} />
            
            {/* SEO Landing Pages */}
            <Route path="/solutions/home-lift-chennai" element={<HomeLiftChennai />} />
            <Route path="/solutions/passenger-lift-manufacturer" element={<PassengerLiftManufacturer />} />
            <Route path="/solutions/elevator-amc-services" element={<ElevatorAMC />} />
            <Route path="/solutions/lift-modernization" element={<LiftModernization />} />
            <Route path="/solutions/hospital-lift-installation" element={<HospitalLiftInstallation />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
