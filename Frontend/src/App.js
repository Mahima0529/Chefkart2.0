// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Home from './Components/Home/Home'
// import About from './Components/About/About'
// import Contact from './Components/Contact/Contact'
// import ServiceNotice from './Components/Header/Header'
// import Footer from './Components/Footer/Footer'
// import Navbar from './Components/Header/Navbar'
// import ChefConnection from './Components/ChefConection/ChefConnection'

// import OneTime from './Components/OneTimeCook/OneTime'
// import Chef from './Components/Chefforparty/Chef'

// //import Month from './Components/CookForAmonth/Month'
// //import ContactLower from './Components/Contact/ContactLower'

// const App = () => {
//   return (
//     <div>
//       <ServiceNotice />

//       <Navbar />
//       {/* <Contact/> */}
//       {/* <ContactLower/> */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/join-chefkart" element={ <ChefConnection/>  }/>
//         {/* <Route path='/cook-for-month' element= { <Month/> }/> */}
//         <Route path='one-time-cook' element={ <OneTime/> }/>
//         <Route path='chef-for-party' element={ <Chef/> }/>
        
//       </Routes>

//       <Footer />
//     </div>
//   );
// };

// export default App



import React from "react";
import { Route, Routes } from "react-router-dom";
import Hom from "./Components/home/Hom";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import ServiceNotice from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Header/Navbar";
import ChefConnection from "./Components/ChefConection/ChefConnection";
import OneTime from "./Components/OneTimeCook/OneTime";
import Chef from "./Components/Chefforparty/Chef";
import Testi from "./Components/Testimonial/Testi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel4 from "./Components/Career/Career";
import Blog from "./Components/Blog/Blog";



const App = () => {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <ServiceNotice />
      <Navbar />

      <main className="w-full min-w-0">
        <Routes>
          <Route path="/" element={<Hom />} />
          {/* <Route path="/" element={<Hom />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-chefkart" element={<ChefConnection />} />
          <Route path="/one-time-cook" element={<OneTime/>} />
          <Route path="/chef-for-party" element={<Chef />} />
          <Route path="/testimonial" element={<Testi/>} />
          <Route path= "/career" element={<Carousel4/>} />
          <Route path="/blog" element={<Blog/>} /> 
          
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;