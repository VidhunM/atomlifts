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
import { Outlet } from 'react-router-dom';
import OverseasBranch from './pages/OverseasBranch';

// Admin Pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlogs from './pages/AdminBlogs';
import AdminJobs from './pages/AdminJobs';
import AdminInquiries from './pages/AdminInquiries';
import AdminApplications from './pages/AdminApplications';
import AdminLogin from './pages/AdminLogin';
import AdminTestimonialsStats from './pages/AdminTestimonialsStats';
import AdminClients from './pages/AdminClients';

const MainLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <a href="https://wa.me/919600087456" className="whatsapp-float shadow-2xl" target="_blank" rel="noopener noreferrer">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.559 4.191 1.62 6.046L0 24l6.105-1.602a11.83 11.83 0 005.94 1.603h.005c6.634 0 12.032-5.396 12.035-12.03a11.85 11.85 0 00-3.529-8.412z" /></svg>
      <div className="whatsapp-badge">1</div>
    </a>
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
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="testimonials-stats" element={<AdminTestimonialsStats />} />
            <Route path="clients" element={<AdminClients />} />
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
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
