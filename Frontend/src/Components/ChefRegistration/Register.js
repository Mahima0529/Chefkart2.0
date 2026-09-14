import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { FaUserTie, FaMapMarkerAlt, FaUtensils, FaClock, FaCheckCircle, FaCamera } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "3",
    city: "Delhi NCR",
    state: "Delhi",
    area: "",
    Address: "",
    pincode: "",
    veg: true,
    nonVeg: false,
    aboutCook: "",
    cuisines: "North Indian, Homestyle Meals",
    languages: "Hindi, English",
    timings: "Morning (7AM - 11AM), Evening (5PM - 9PM)",
    housesServed: "50",
    profilepic: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilepic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Parse cuisines into array format
      const cuisineList = formData.cuisines
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => ({ cuisine: c, rating: 4.8 }));

      // Parse languages into array format
      const languageList = formData.languages
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

      const defaultAvatar =
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80";

      const defaultCookImg =
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80";

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experience: String(formData.experience),
        city: formData.city || "Delhi NCR",
        state: formData.state || "Delhi",
        area: formData.area || formData.city || "Central",
        Address: formData.Address || `${formData.city}, India`,
        country: "India",
        pincode: formData.pincode || "110001",
        veg: formData.veg,
        nonVeg: formData.nonVeg,
        aboutCook:
          formData.aboutCook ||
          `${formData.name} is an experienced cook specializing in healthy, hygienic home meals.`,
        cuisineRatings: cuisineList.length > 0 ? cuisineList : [{ cuisine: "North Indian", rating: 4.8 }],
        language: languageList.length > 0 ? languageList : ["Hindi"],
        availability: [{ start: "07:00 AM", end: "09:00 PM" }],
        housesServed: Number(formData.housesServed) || 50,
        starRating: 4.8,
        totalRatings: 12,
        verified: false,
        profilepic: formData.profilepic || defaultAvatar,
        default_cook_image: defaultCookImg
      };

      await api.post("/chef/create", payload);
      setSuccess(true);
    } catch (err) {
      console.error("Chef registration error:", err);
      setErrorMessage(
        err.response?.data?.message || "Registration failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 via-white to-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Chef Registration</span>
        </div>

        {success ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-orange-100 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              <FaCheckCircle />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Registration Successful!</h1>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-base">
              Welcome to ChefKart, <span className="font-semibold text-gray-900">{formData.name}</span>! Your profile has been submitted. Our onboarding team will verify your credentials shortly so you can start receiving customer bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/chef-search")}
                className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg transition"
              >
                Browse All Cooks
              </button>
              <Link
                to="/"
                className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-6 sm:px-10 py-8 text-white">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                Join our 4500+ Cooks Network
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                👨‍🍳 Register as a ChefKart Cook
              </h1>
              <p className="text-orange-100 mt-2 text-sm sm:text-base">
                Earn respect, grow your income, and bring authentic homemade flavors to happy households.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mx-6 sm:mx-10 mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {/* Section 1: Basic Info */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                  <FaUserTie className="text-orange-500" /> 1. Personal & Contact Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. ramesh.cook@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Experience (Years) *
                    </label>
                    <input
                      type="number"
                      name="experience"
                      min="0"
                      max="40"
                      required
                      placeholder="e.g. 5"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Location */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                  <FaMapMarkerAlt className="text-orange-500" /> 2. Location & Service Area
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Gurugram"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Area / Locality *
                    </label>
                    <input
                      type="text"
                      name="area"
                      required
                      placeholder="e.g. Sector 57"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="e.g. 122003"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Complete Address *
                  </label>
                  <input
                    type="text"
                    name="Address"
                    required
                    placeholder="e.g. House No. 42, Block B, Sushant Lok III"
                    value={formData.Address}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Section 3: Culinary Profile */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                  <FaUtensils className="text-orange-500" /> 3. Cooking Specialties & Preferences
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Cuisines Known (Comma Separated) *
                    </label>
                    <input
                      type="text"
                      name="cuisines"
                      required
                      placeholder="e.g. North Indian, South Indian, Chinese, Italian"
                      value={formData.cuisines}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Languages Spoken
                    </label>
                    <input
                      type="text"
                      name="languages"
                      placeholder="e.g. Hindi, English, Punjabi"
                      value={formData.languages}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Food Prepared:
                  </span>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="veg"
                      checked={formData.veg}
                      onChange={handleChange}
                      className="checkbox checkbox-warning checkbox-sm"
                    />
                    Vegetarian
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="nonVeg"
                      checked={formData.nonVeg}
                      onChange={handleChange}
                      className="checkbox checkbox-warning checkbox-sm"
                    />
                    Non-Vegetarian
                  </label>
                </div>
              </div>

              {/* Section 4: Timings & Bio */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                  <FaClock className="text-orange-500" /> 4. Working Hours & Bio
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Available Time Slots
                    </label>
                    <input
                      type="text"
                      name="timings"
                      placeholder="e.g. Morning (7AM - 11AM), Evening (5PM - 9PM)"
                      value={formData.timings}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Approx. Households Served
                    </label>
                    <input
                      type="number"
                      name="housesServed"
                      placeholder="e.g. 50"
                      value={formData.housesServed}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    About Cook / Biography
                  </label>
                  <textarea
                    name="aboutCook"
                    rows="3"
                    placeholder="Describe your cooking journey, specialties, cleanliness standards..."
                    value={formData.aboutCook}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  ></textarea>
                </div>
              </div>

              {/* Section 5: Photo Upload */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b">
                  <FaCamera className="text-orange-500" /> 5. Profile Picture (Optional)
                </h2>
                <div className="flex items-center gap-4">
                  {formData.profilepic ? (
                    <img
                      src={formData.profilepic}
                      alt="Preview"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-300 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-orange-50 border-2 border-dashed border-orange-200 flex items-center justify-center text-orange-400 text-2xl">
                      <FaUserTie />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file-input file-input-bordered file-input-warning file-input-sm w-full max-w-xs"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG or WEBP. If skipped, a standard chef avatar is assigned.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg disabled:opacity-50"
                >
                  {loading ? "Registering Your Profile..." : "Submit Chef Application"}
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  By submitting, you agree to ChefKart's Partner Terms of Service and Code of Conduct.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;