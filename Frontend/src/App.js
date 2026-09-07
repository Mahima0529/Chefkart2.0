import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import ServiceNotice from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Header/Navbar'
//import ContactLower from './Components/Contact/ContactLower'

const App = () => {
  return (
    <div>
      <ServiceNotice />

      <Navbar />
      {/* <Contact/> */}
      {/* <ContactLower/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App