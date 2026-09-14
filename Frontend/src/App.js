import { Route, Routes, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import NotificationBanner from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Header/Navbar";
import ChefDirectory from "./Components/ChefSearch";
import ChefDetails from "./Components/ChefDetailsPage";
import ChefFormFormik from "./Components/ChefRegistration/Register";
import DashboardApp from "./Dashboard/DashboardApp";

// Lazy Loading Public Components
const Hom = lazy(() => import("./Components/home/Hom"));
const About = lazy(() => import("./Components/About/About"));
const Contact = lazy(() => import("./Components/Contact/Contact"));
const ChefConnection = lazy(() => import("./Components/ChefConection/ChefConnection"));
const OneTime = lazy(() => import("./Components/OneTimeCook/OneTime"));
const Chef = lazy(() => import("./Components/Chefforparty/Chef"));
const Testi = lazy(() => import("./Components/Testimonial/Testi"));
const Career = lazy(() => import("./Components/Career/Career"));
const Blog = lazy(() => import("./Components/Blog/Blog"));
const Investor = lazy(() => import("./Components/Investor/Invest"));

// Layout wrapper for all public-facing Chefkart website pages
const PublicLayout = () => {
  return (
    <div className="w-full min-w-0 overflow-x-hidden flex flex-col min-h-screen bg-white text-gray-900">
      <NotificationBanner />
      <Navbar />
      <main className="w-full min-w-0 flex-1 bg-white text-gray-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Suspense fallback={<div className="text-center text-xl p-10 font-semibold text-orange-500">Loading Chefkart...</div>}>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Hom />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-chefkart" element={<ChefConnection />} />
          <Route path="/one-time-cook" element={<OneTime />} />
          <Route path="/chef-for-party" element={<Chef />} />
          <Route path="/testimonial" element={<Testi />} />
          <Route path="/career" element={<Career />} />
          <Route path="/investor-relation" element={<Investor />} />
          <Route path="/chef-search" element={<ChefDirectory />} />
          <Route path="/chef/:id" element={<ChefDetails />} />
          <Route path="/register" element={<ChefFormFormik />} />
        </Route>

        {/* Admin Dashboard: Standalone Admin Layout with Sidebar, Admin Header, and internal routing */}
        <Route path="/dashboard/*" element={<DashboardApp />} />
      </Routes>
    </Suspense>
  );
};

export default App;