
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Hom from "./Components/home/Hom";
// import About from "./Components/About/About";
// import Contact from "./Components/Contact/Contact";
// import ServiceNotice from "./Components/Header/Header";
// import Footer from "./Components/Footer/Footer";
// import Navbar from "./Components/Header/Navbar";
// import ChefConnection from "./Components/ChefConection/ChefConnection";
// import OneTime from "./Components/OneTimeCook/OneTime";
// import Chef from "./Components/Chefforparty/Chef";
// import Testi from "./Components/Testimonial/Testi";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Carousel4 from "./Components/Career/Career";
// import Blog from "./Components/Blog/Blog";



// const App = () => {
//   return (
//     <div className="w-full min-w-0 overflow-x-hidden">
//       <ServiceNotice />
//       <Navbar />

//       <main className="w-full min-w-0">
//         <Routes>
//           <Route path="/" element={<Hom />} />
//           {/* <Route path="/" element={<Hom />} /> */}
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/join-chefkart" element={<ChefConnection />} />
//           <Route path="/one-time-cook" element={<OneTime/>} />
//           <Route path="/chef-for-party" element={<Chef />} />
//           <Route path="/testimonial" element={<Testi/>} />
//           <Route path= "/career" element={<Carousel4/>} />
//           <Route path="/blog" element={<Blog/>} /> 
          
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default App;





import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import NotificationBanner from "./Components/Header/Head";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Header/Navbar";
import ChefDirectory from "./Components/ChefSearch";
import ChefDetails from "./Components/ChefDetailsPage";
import Register from "./Components/ChefRegistration/Register";
import ChefFormFormik from "./Components/ChefRegistration/Register";

// Lazy Loading Components
const Hom = lazy(() => import("./Components/home/Hom"));
const About = lazy(() => import("./Components/About/About"));
const Contact = lazy(() => import("./Components/Contact/Contact"));
const ChefConnection = lazy(() => import("./Components/ChefConection/ChefConnection"));
const Month = lazy(() => import("./Components/CookForAmonth/Month"));
const OneTime = lazy(() => import("./Components/OneTimeCook/OneTime"));
const Chef = lazy(() => import("./Components/Chefforparty/Chef"));
const Testi = lazy(() => import("./Components/Testimonial/Testi"));
const Career = lazy(() => import("./Components/Career/Career"));
const Blog = lazy(() => import("./Components/Blog/Blog"));
const Investor = lazy(() => import("./Components/Investor/Invest"));

const App = () => {
  const routes = [
    { path: "/", element: <Hom /> },
    { path: "about", element: <About /> },
    { path: "blog", element: <Blog /> },
    { path: "contact", element: <Contact /> },
    { path: "join-chefkart", element: <ChefConnection /> },
    { path: "cook-for-month", element: <Month /> },
    { path: "one-time-cook", element: <OneTime /> },
    { path: "chef-for-party", element: <Chef /> },
    { path: "testimonial", element: <Testi /> },
    { path: "career", element: <Career /> },
    { path: "investor-relation", element: <Investor />}, 
    {  path:"chef-search", element:<ChefDirectory/>},
    { path:"chef/:id", element:<ChefDetails/>},
    {path:'/register',element:<ChefFormFormik/>}
    
  
  ];

  return (
    <div>
      <NotificationBanner />
      <Navbar />
      {/* Suspense Component to Handle Loading */}
      <Suspense fallback={<div className="text-center text-xl p-10">Loading...</div>}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;