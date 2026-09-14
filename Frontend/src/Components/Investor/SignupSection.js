import React, { useState } from 'react';
import api from '../../config/api';

const SignupSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await api.post('/contact/createContact', {
        name: formData.name,
        email: formData.email,
        city: formData.city,
        message: formData.message,
        subject: 'Investor Inquiry'
      });

      setStatus({ type: 'success', text: 'Thank you! Our Investor Relations team will get back to you shortly.' });
      setFormData({ name: '', email: '', city: '', message: '' });
    } catch (err) {
      console.error('Investor inquiry error:', err);
      setStatus({ type: 'error', text: err.response?.data?.message || 'Failed to submit inquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        {/* Left Content */}
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight">
            Simplifying the <br /> way <span className='text-orange-500 font-bold underline'>India</span> eats.
          </h1>
          <p className="leading-relaxed mt-4 text-gray-600 text-lg">
            Join hands with Chefkart in revolutionizing in-home culinary experiences across the country.
          </p>
        </div>

        {/* Signup Form */}
        <div className="lg:w-2/6 md:w-1/2 bg-white rounded-2xl shadow-xl p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 border border-gray-100">
          <h2 className="text-gray-900 font-bold title-font mb-2 text-2xl">Believe in our mission?</h2>
          <p className="text-sm text-gray-500 mb-6">We'd love to partner and grow together.</p>

          {status && (
            <div
              className={`mb-4 p-3 rounded-xl text-sm ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="leading-7 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Anand Mahindra"
                className="w-full bg-gray-50 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="leading-7 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. anand@fund.com"
                className="w-full bg-gray-50 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="city" className="leading-7 text-xs font-bold text-gray-700 uppercase tracking-wider">
                City / Location
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai / Delhi"
                className="w-full bg-gray-50 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="leading-7 text-xs font-bold text-gray-700 uppercase tracking-wider">
                Message / Partnership Scope
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you're looking to explore..."
                className="w-full bg-gray-50 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm outline-none text-gray-800 py-2 px-3 leading-relaxed transition-colors duration-200"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-orange-500 hover:bg-orange-600 border-0 py-3 px-8 rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;