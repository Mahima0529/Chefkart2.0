import React, { useState } from "react";
import ContactLower from "./ContactLower";
import { Link } from "react-router-dom";
import api from "../../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Delhi",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please enter your name, email, and phone number.");
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    try {
      await api.post("/contact/createContact", {
        firstName: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: formData.message,
      });

      setStatusMessage({
        type: "success",
        text: "Thank you! Your message has been sent to the Chefkart team.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "Delhi",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to submit message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen">
      <section className="text-gray-900 bg-white body-font relative">
        <div className="container px-5 py-12 mx-auto flex lg:flex-nowrap flex-wrap">
          {/* Left Section: Map and Address */}
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-6 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="ChefKart Location Map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?q=ChefKart%20Sector%2057%20Gurugram%20Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed"
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md w-full">
              <div className="lg:w-1/2 px-6 mb-4">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">
                  B-179, Sector 57, near Rail Vihar, Block B, Sushant Lok III,
                  Sector 57, Gurugram, Haryana 122003
                </p>
              </div>
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <Link to="#" className="text-indigo-500 leading-relaxed">
                  karanchefkart@email.com
                </Link>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed">+9189369369</p>
              </div>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full mt-8 lg:mt-0 px-4 md:px-6">
            <h2 className="text-gray-900 text-3xl md:text-4xl text-center font-medium title-font mb-4">
              Contact Us
            </h2>
            <p className="leading-relaxed text-gray-700 text-center mb-6 text-lg">
              Fill out the form & get in touch
            </p>

            {statusMessage && (
              <div
                className={`mb-4 p-3 rounded text-sm text-center ${
                  statusMessage.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Noida">Noida</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Jaipur">Jaipur</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please write your message in detail"
                  className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg w-full transition ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <ContactLower />
    </div>
  );
};

export default Contact;