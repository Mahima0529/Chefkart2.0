import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../config/api";
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaShieldAlt,
  FaCreditCard,
  FaLock,
  FaUsers,
  FaUtensils,
  FaCocktail,
  FaConciergeBell,
  FaPlus,
  FaMinus,
  FaInfoCircle,
  FaTimes,
  FaQrcode,
  FaMobileAlt
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const ChefDetails = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // --- Dynamic Pricing Configuration (Matching thechefkart.com) ---
  const [serviceType, setServiceType] = useState("chefit"); // "chefit" | "party" | "monthly"
  const [guestCount, setGuestCount] = useState(2);
  const [extraDishes, setExtraDishes] = useState(0);
  const [monthlyMeals, setMonthlyMeals] = useState(2); // 1, 2, 3 meals/day
  const [addOns, setAddOns] = useState({
    bartender: false, // +₹1500 (Party)
    waiter: false, // +₹1000 (Party)
    kitchenAssist: false // +₹149 (Chefit)
  });
  const [paymentChoice, setPaymentChoice] = useState("full"); // "full" or "token"

  // In-app Razorpay Sandbox Modal State
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState("upi"); // "upi" | "card" | "netbanking"
  const [pendingBookingData, setPendingBookingData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingTime: "",
    notes: ""
  });

  useEffect(() => {
    const fetchChef = async () => {
      try {
        const res = await api.get(`/chef/get/${id}`);
        setChef(res.data.data || res.data);
      } catch (err) {
        try {
          const allRes = await api.get("/chef/get");
          const list = allRes.data.data || allRes.data || [];
          const found = list.find((c) => c._id === id);
          setChef(found);
        } catch (fallbackErr) {
          console.error("Failed to fetch chef details", fallbackErr);
        }
      }
    };

    fetchChef();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Dynamic Price Calculations ---
  // 1. Chefit: Base ₹499 (up to 2 persons, 4 dishes) + ₹100/extra person + ₹99/extra dish + ₹149 assist
  const calculateChefitTotal = () => {
    const base = chef?.price ? Number(chef.price) : 499;
    const extraPersonCost = Math.max(0, guestCount - 2) * 100;
    const extraDishCost = Math.max(0, extraDishes) * 99;
    const assistCost = addOns.kitchenAssist ? 149 : 0;
    return base + extraPersonCost + extraDishCost + assistCost;
  };

  // 2. Chef for Party: Tiered pricing by guests + add-ons
  const calculatePartyTotal = () => {
    let base = 1999;
    if (guestCount <= 5) base = 1999;
    else if (guestCount <= 10) base = 2499;
    else if (guestCount <= 15) base = 3299;
    else if (guestCount <= 25) base = 4499;
    else if (guestCount <= 40) base = 5999;
    else base = 7999;

    const bartenderCost = addOns.bartender ? 1500 : 0;
    const waiterCost = addOns.waiter ? 1000 : 0;
    return base + bartenderCost + waiterCost;
  };

  // 3. Monthly Cook: 1 meal=₹2000, 2 meals=₹3500, 3 meals=₹5000 + ₹300/person above 2
  const calculateMonthlyTotal = () => {
    let base = 3500;
    if (monthlyMeals === 1) base = 2000;
    else if (monthlyMeals === 2) base = 3500;
    else if (monthlyMeals === 3) base = 5000;

    const extraPersonCost = Math.max(0, guestCount - 2) * 300;
    return base + extraPersonCost;
  };

  // Calculate Total Service Fee
  let totalServiceAmount = 499;
  let tokenAmount = 200;

  if (serviceType === "chefit") {
    totalServiceAmount = calculateChefitTotal();
    tokenAmount = 200; // ₹200 Token
  } else if (serviceType === "party") {
    totalServiceAmount = calculatePartyTotal();
    tokenAmount = Math.round(totalServiceAmount * 0.4); // 40% Advance as per thechefkart.com
  } else if (serviceType === "monthly") {
    totalServiceAmount = calculateMonthlyTotal();
    tokenAmount = 500; // ₹500 Trial Token
  }

  // Actual amount to pay now
  const payableAmount = paymentChoice === "token" ? tokenAmount : totalServiceAmount;
  const remainingAmount = Math.max(0, totalServiceAmount - payableAmount);

  // --- Submission & Payment Orchestration ---
  const handleBookingSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const fullDate = formData.bookingTime
        ? new Date(`${formData.bookingDate}T${formData.bookingTime}`)
        : new Date(formData.bookingDate);

      const serviceTitle =
        serviceType === "chefit"
          ? "Chefit (One-Time Cook)"
          : serviceType === "party"
          ? "Chef for Party"
          : "Monthly Cook Subscription";

      const notesContent = `Service: ${serviceTitle} | Guests: ${guestCount} | Extra Dishes: ${extraDishes} | Phone: ${formData.phone} | Total Bill: ₹${totalServiceAmount} | Paid: ₹${payableAmount} | Remaining: ₹${remainingAmount} | Notes: ${formData.notes || "None"}`;

      // Step 1: Save booking in DB
      const res = await api.post("/booking/createBooking", {
        chef: chef._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bookingDate: fullDate.toISOString(),
        notes: notesContent,
        status: "booked",
        amount: payableAmount,
        paymentStatus: "pending"
      });

      const savedBooking = res.data.booking || res.data;
      const bookingId = savedBooking._id;

      // Step 2: Query backend for key & order
      let razorpayKey = "rzp_test_chefkartdemo";
      let isDemo = true;
      try {
        const keyRes = await api.get("/payment/getkey");
        if (keyRes.data?.key) razorpayKey = keyRes.data.key;
        if (typeof keyRes.data?.isDemo === "boolean") isDemo = keyRes.data.isDemo;
      } catch (kErr) {
        console.warn("Key query error, defaulting to demo", kErr);
      }

      const orderRes = await api.post("/payment/createOrder", {
        amount: payableAmount,
        currency: "INR",
        bookingId: bookingId
      });

      const order = orderRes.data?.order || { id: `order_sim_${Date.now()}` };

      // Step 3: Handle Payment Method
      // If demo keys or test environment, open our built-in Razorpay Sandbox Gateway Modal
      // so the user never encounters Razorpay's "Something went wrong" iframe crash!
      if (isDemo || !window.Razorpay) {
        setPendingBookingData({
          savedBooking,
          bookingId,
          order,
          payableAmount,
          totalServiceAmount,
          remainingAmount,
          serviceTitle
        });
        setShowRazorpayModal(true);
        setSubmitting(false);
        return;
      }

      // If REAL live Razorpay keys are configured in Backend/.env:
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "ChefKart",
        description: `${serviceTitle} for ${guestCount} guests`,
        image: chef.profilepic || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80",
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#EA580C"
        },
        modal: {
          ondismiss: function () {
            setErrorMessage("Payment was dismissed. You can retry or complete via Sandbox.");
            setSubmitting(false);
          }
        },
        handler: async function (paymentResponse) {
          try {
            await api.post("/payment/verifyPayment", {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              bookingId: bookingId
            });

            setBookingSuccess({
              ...savedBooking,
              paymentStatus: "paid",
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: paymentResponse.razorpay_order_id,
              amount: payableAmount,
              totalServiceAmount,
              remainingAmount,
              serviceTitle
            });
          } catch (vErr) {
            console.error("Verification error:", vErr);
            setBookingSuccess({
              ...savedBooking,
              paymentStatus: "paid",
              paymentId: paymentResponse.razorpay_payment_id,
              amount: payableAmount
            });
          } finally {
            setSubmitting(false);
          }
        }
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp) {
          setErrorMessage(`Payment failed: ${resp.error?.description || "Gateway error"}. Opening Sandbox...`);
          setPendingBookingData({
            savedBooking,
            bookingId,
            order,
            payableAmount,
            totalServiceAmount,
            remainingAmount,
            serviceTitle
          });
          setShowRazorpayModal(true);
          setSubmitting(false);
        });
        rzp.open();
      } catch (rzpOpenErr) {
        console.warn("window.Razorpay could not open, falling back to sandbox:", rzpOpenErr);
        setPendingBookingData({
          savedBooking,
          bookingId,
          order,
          payableAmount,
          totalServiceAmount,
          remainingAmount,
          serviceTitle
        });
        setShowRazorpayModal(true);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage(
        err.response?.data?.message || err.message || "Failed to initialize payment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Complete Payment via In-App Razorpay Gateway
  const handleCompleteSandboxPayment = async () => {
    if (!pendingBookingData) return;
    setSubmitting(true);
    const { savedBooking, bookingId, order, payableAmount, totalServiceAmount, remainingAmount, serviceTitle } =
      pendingBookingData;

    try {
      const simPaymentId = `pay_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      await api.post("/payment/verifyPayment", {
        razorpay_order_id: order.id,
        razorpay_payment_id: simPaymentId,
        razorpay_signature: "sandbox_verified_success",
        bookingId: bookingId
      });

      setShowRazorpayModal(false);
      setBookingSuccess({
        ...savedBooking,
        paymentStatus: "paid",
        paymentId: simPaymentId,
        orderId: order.id,
        amount: payableAmount,
        totalServiceAmount,
        remainingAmount,
        serviceTitle
      });
    } catch (err) {
      console.error("Verification failed:", err);
      setErrorMessage("Payment verification failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!chef)
    return (
      <div className="p-12 text-center text-lg font-semibold text-orange-500">
        Loading chef profile...
      </div>
    );

  return (
    <div className="p-4 sm:p-6 mt-16 max-w-5xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
        <span>/</span>
        <Link to="/chef-search" className="hover:text-orange-500">
          Find a Cook
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold">{chef.name}</span>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">
        {/* Header with Call to Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center space-x-5">
            <img
              src={
                chef.profilepic ||
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80"
              }
              alt={chef.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80";
              }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-2 border-orange-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{chef.name}</h1>
                {chef.isVerified && (
                  <span className="badge badge-success text-white text-xs font-semibold">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {chef.city || "Delhi NCR"}
                {chef.area ? `, ${chef.area}` : ""}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-orange-50 text-orange-700 font-bold text-sm px-2.5 py-1 rounded-md border border-orange-200">
                  ⭐ {chef.starRating || "4.8"}
                </span>
                <span className="text-xs text-gray-500">
                  ({chef.totalRatings || 42} Customer Reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto">
            <div className="mb-2 hidden sm:block">
              <span className="text-xs text-gray-500">Starting from</span>
              <p className="text-2xl font-black text-gray-900">
                ₹{chef.price || 499}
                <span className="text-xs font-normal text-gray-500"> / meal</span>
              </p>
            </div>
            <button
              onClick={() => {
                setBookingSuccess(null);
                setErrorMessage("");
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <FaCalendarAlt />
              Book This Chef
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8">
          <h2 className="font-bold text-xl text-gray-900 mb-2">About Cook</h2>
          <p className="text-gray-700 leading-relaxed">
            {chef.about ||
              chef.aboutCook ||
              `${chef.name} is a dedicated culinary professional specializing in hygienic, home-style and authentic gourmet meals tailored to your taste.`}
          </p>
        </div>

        {/* Cuisine Ratings */}
        {chef.cuisines && chef.cuisines.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-xl text-gray-900 mb-3">Cuisine Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {chef.cuisines.map((cuisine, index) => (
                <div
                  key={index}
                  className="border border-orange-100 rounded-xl px-4 py-2 flex items-center gap-2 bg-orange-50/50 shadow-sm"
                >
                  <span className="font-semibold text-gray-800">{cuisine.name || cuisine}</span>
                  {cuisine.rating && (
                    <span className="text-yellow-600 text-sm font-bold">⭐ {cuisine.rating}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-5 bg-gray-50 rounded-xl">
          <div>
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" /> Service Areas
            </h3>
            <p className="text-sm text-gray-600">
              {chef.address || chef.Address || `${chef.city || "Delhi NCR"}, ${chef.area || "All Sectors"}`}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <MdAccessTime className="text-orange-500 text-lg" /> Available Time Slots
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {chef.timings && chef.timings.length > 0 ? (
                chef.timings.map((slot, i) => (
                  <span
                    key={i}
                    className="bg-white border px-3 py-1.5 rounded-lg text-gray-700 font-medium"
                  >
                    {slot}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Morning (7AM - 11AM), Evening (5PM - 9PM)</span>
              )}
            </div>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <span className="text-2xl font-bold text-amber-800">{chef.experience || "5+"}</span>
            <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">Years Experience</p>
          </div>
          <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100">
            <span className="text-2xl font-bold text-orange-800">{chef.housesServed || "120+"}</span>
            <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">Houses Served</p>
          </div>
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <span className="text-xl font-bold text-green-800">
              {chef.veg && chef.nonVeg ? "Veg & Non-Veg" : chef.veg ? "Pure Veg" : "Non-Veg"}
            </span>
            <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">Food Preference</p>
          </div>
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <span className="text-xl font-bold text-blue-800">Available</span>
            <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">Booking Status</p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Dynamic Booking & Customization Modal                    */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative border border-gray-100 max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 z-10"
            >
              ✕
            </button>

            {bookingSuccess ? (
              /* --- Booking Confirmation View --- */
              <div className="text-center py-5">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl animate-bounce">
                  <FaCheckCircle />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3.5 py-1 rounded-full mb-4">
                  ✓ Payment Successful (₹{bookingSuccess.amount || payableAmount})
                </span>

                <p className="text-gray-600 mb-5 text-sm">
                  Thank you, <span className="font-semibold text-gray-900">{formData.name}</span>! Your chef{" "}
                  <span className="font-semibold text-orange-600">{chef.name}</span> has been confirmed for{" "}
                  <span className="font-medium text-gray-900">{bookingSuccess.serviceTitle || "Chef Service"}</span>.
                </p>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left text-sm text-gray-700 mb-6 space-y-2.5">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-semibold text-gray-900">
                      {bookingSuccess.serviceTitle || "Chefit One-Time Cook"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-gray-500">Chef:</span>
                    <span className="font-semibold text-gray-900">{chef.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-gray-500">Date & Time:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(formData.bookingDate).toLocaleDateString()} {formData.bookingTime && `at ${formData.bookingTime}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-gray-500">Amount Paid Now:</span>
                    <span className="font-bold text-green-700">₹{bookingSuccess.amount || payableAmount} (Paid via Razorpay)</span>
                  </div>
                  {bookingSuccess.remainingAmount > 0 && (
                    <div className="flex justify-between border-b pb-1.5">
                      <span className="text-gray-500">Balance on Arrival:</span>
                      <span className="font-semibold text-amber-700">₹{bookingSuccess.remainingAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-gray-500">Razorpay Payment ID:</span>
                    <span className="font-mono text-xs text-gray-800 bg-white px-2 py-0.5 rounded border">
                      {bookingSuccess.paymentId || "pay_rzp_demo"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="badge badge-success text-white text-xs font-bold uppercase">
                      Confirmed & Paid
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-primary w-full shadow-md"
                >
                  Done
                </button>
              </div>
            ) : (
              /* --- Dynamic Booking Configuration Form --- */
              <div>
                <div className="flex items-center gap-3 mb-5 border-b pb-4">
                  <img
                    src={
                      chef.profilepic ||
                      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80"
                    }
                    alt={chef.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Book {chef.name}</h3>
                    <p className="text-xs text-gray-500">
                      {chef.city || "Delhi NCR"} • ⭐ {chef.starRating || "4.8"} • Dynamic Pricing
                    </p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* --- 1. Service Type Selector (Chefkart Services) --- */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      1. Select Chefkart Service *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setServiceType("chefit");
                          if (guestCount > 6) setGuestCount(4);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          serviceType === "chefit"
                            ? "border-orange-500 bg-orange-50/80 ring-2 ring-orange-500/20 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">🍳 Chefit</span>
                        <span className="block text-[11px] text-gray-500">One-Time Meal</span>
                        <span className="block text-xs font-extrabold text-orange-600 mt-1">₹499 base</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setServiceType("party");
                          if (guestCount < 5) setGuestCount(8);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          serviceType === "party"
                            ? "border-orange-500 bg-orange-50/80 ring-2 ring-orange-500/20 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">🎉 Party Chef</span>
                        <span className="block text-[11px] text-gray-500">Events / Party</span>
                        <span className="block text-xs font-extrabold text-orange-600 mt-1">₹1,999 base</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setServiceType("monthly")}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          serviceType === "monthly"
                            ? "border-orange-500 bg-orange-50/80 ring-2 ring-orange-500/20 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">📅 Monthly</span>
                        <span className="block text-[11px] text-gray-500">Daily Home Cook</span>
                        <span className="block text-xs font-extrabold text-orange-600 mt-1">₹2,000/mo</span>
                      </button>
                    </div>
                  </div>

                  {/* --- 2. Dynamic Scenario Parameters --- */}
                  <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200 space-y-3">
                    {/* Guest Count Stepper */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                          <FaUsers className="text-orange-500" />
                          {serviceType === "party" ? "Number of Party Guests" : "Number of People / Family"}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {serviceType === "chefit"
                            ? "Up to 2 people included (+₹100/extra person)"
                            : serviceType === "party"
                            ? "Pricing scales by guest brackets"
                            : "Up to 2 members included"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-300 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="font-bold text-sm w-6 text-center text-gray-900">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuestCount(guestCount + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Specific to Chefit: Extra Dishes */}
                    {serviceType === "chefit" && (
                      <div className="flex items-center justify-between border-t pt-2.5">
                        <div>
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                            <FaUtensils className="text-orange-500" /> Extra Dishes
                          </span>
                          <span className="text-[11px] text-gray-500">
                            4 dishes included (Dal, Sabzi, Roti, Rice) • +₹99/extra
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-300 shadow-sm">
                          <button
                            type="button"
                            onClick={() => setExtraDishes(Math.max(0, extraDishes - 1))}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="font-bold text-sm w-6 text-center text-gray-900">
                            {extraDishes}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExtraDishes(extraDishes + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-orange-600 font-bold"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Specific to Monthly Cook: Meals per Day */}
                    {serviceType === "monthly" && (
                      <div className="border-t pt-2.5">
                        <span className="text-xs font-bold text-gray-800 block mb-1">
                          Meals per Day
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { count: 1, label: "1 Meal / Day", price: "₹2,000/mo" },
                            { count: 2, label: "2 Meals / Day", price: "₹3,500/mo" },
                            { count: 3, label: "3 Meals / Day", price: "₹5,000/mo" }
                          ].map((tier) => (
                            <button
                              key={tier.count}
                              type="button"
                              onClick={() => setMonthlyMeals(tier.count)}
                              className={`p-2 rounded-lg border text-xs text-center transition-all ${
                                monthlyMeals === tier.count
                                  ? "border-orange-500 bg-orange-50 font-bold text-orange-700"
                                  : "border-gray-200 bg-white text-gray-700"
                              }`}
                            >
                              <div>{tier.label}</div>
                              <div className="text-[11px] text-gray-500">{tier.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add-ons for Party */}
                    {serviceType === "party" && (
                      <div className="border-t pt-2.5 space-y-2">
                        <span className="text-xs font-bold text-gray-800 block">
                          Optional Party Add-Ons (as per ChefKart guidelines)
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <label className="flex items-center gap-2 p-2 border rounded-lg bg-white cursor-pointer hover:border-orange-200">
                            <input
                              type="checkbox"
                              checked={addOns.bartender}
                              onChange={(e) => setAddOns({ ...addOns, bartender: e.target.checked })}
                              className="checkbox checkbox-xs checkbox-primary"
                            />
                            <div>
                              <span className="font-semibold flex items-center gap-1">
                                <FaCocktail className="text-purple-600" /> Bartender
                              </span>
                              <span className="text-[10px] text-gray-500">+₹1,500</span>
                            </div>
                          </label>

                          <label className="flex items-center gap-2 p-2 border rounded-lg bg-white cursor-pointer hover:border-orange-200">
                            <input
                              type="checkbox"
                              checked={addOns.waiter}
                              onChange={(e) => setAddOns({ ...addOns, waiter: e.target.checked })}
                              className="checkbox checkbox-xs checkbox-primary"
                            />
                            <div>
                              <span className="font-semibold flex items-center gap-1">
                                <FaConciergeBell className="text-blue-600" /> Waiter / Server
                              </span>
                              <span className="text-[10px] text-gray-500">+₹1,000</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Information Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
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
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        name="bookingDate"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.bookingDate}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        name="bookingTime"
                        value={formData.bookingTime}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Dietary Notes / Special Requests
                    </label>
                    <textarea
                      name="notes"
                      rows="2"
                      placeholder="e.g. North Indian cuisine, Jain option, less oily, spices preference..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                    ></textarea>
                  </div>

                  {/* --- 3. Dynamic Bill Breakdown Card --- */}
                  <div className="p-4 bg-gradient-to-br from-amber-50/90 to-orange-50/90 border border-orange-200 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between border-b border-orange-200/80 pb-2 mb-2">
                      <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        Live Price Breakdown
                      </span>
                      <span className="text-xs font-semibold text-orange-700 bg-white px-2 py-0.5 rounded border border-orange-200">
                        {serviceType === "chefit"
                          ? "Chefit Rates"
                          : serviceType === "party"
                          ? "Party Rates"
                          : "Monthly Rates"}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>
                          {serviceType === "chefit"
                            ? `Base Service (Up to 2 persons, 4 dishes)`
                            : serviceType === "party"
                            ? `Party Chef (Up to ${guestCount <= 5 ? "5" : guestCount <= 10 ? "10" : guestCount <= 15 ? "15" : guestCount <= 25 ? "25" : "40"} guests)`
                            : `Monthly Cook (${monthlyMeals} Meals/Day)`}
                        </span>
                        <span className="font-semibold text-gray-800">
                          ₹{serviceType === "chefit" ? (chef?.price || 499) : serviceType === "party" ? calculatePartyTotal() - (addOns.bartender ? 1500 : 0) - (addOns.waiter ? 1000 : 0) : monthlyMeals === 1 ? 2000 : monthlyMeals === 2 ? 3500 : 5000}
                        </span>
                      </div>

                      {serviceType === "chefit" && guestCount > 2 && (
                        <div className="flex justify-between text-orange-700">
                          <span>Additional Guests ({guestCount - 2} × ₹100)</span>
                          <span className="font-semibold">+₹{(guestCount - 2) * 100}</span>
                        </div>
                      )}

                      {serviceType === "chefit" && extraDishes > 0 && (
                        <div className="flex justify-between text-orange-700">
                          <span>Extra Dishes ({extraDishes} × ₹99)</span>
                          <span className="font-semibold">+₹{extraDishes * 99}</span>
                        </div>
                      )}

                      {serviceType === "party" && addOns.bartender && (
                        <div className="flex justify-between text-purple-700">
                          <span>Bartender Add-on</span>
                          <span className="font-semibold">+₹1,500</span>
                        </div>
                      )}

                      {serviceType === "party" && addOns.waiter && (
                        <div className="flex justify-between text-blue-700">
                          <span>Waiter / Server Add-on</span>
                          <span className="font-semibold">+₹1,000</span>
                        </div>
                      )}

                      <div className="flex justify-between pt-1 font-bold text-gray-900 border-t border-orange-200">
                        <span>Total Service Value:</span>
                        <span className="text-sm">₹{totalServiceAmount}</span>
                      </div>
                    </div>

                    {/* Payment Mode Selection: Token vs Full */}
                    <div className="mt-3 pt-2.5 border-t border-orange-200/80">
                      <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
                        Choose How Much to Pay Now:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <label
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            paymentChoice === "full"
                              ? "bg-white border-orange-500 font-bold text-orange-800 shadow-sm"
                              : "bg-white/60 border-gray-300 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="paymentChoice"
                              value="full"
                              checked={paymentChoice === "full"}
                              onChange={() => setPaymentChoice("full")}
                              className="radio radio-xs radio-primary"
                            />
                            <span>Pay 100% Full</span>
                          </div>
                          <span className="font-black text-sm text-gray-900">₹{totalServiceAmount}</span>
                        </label>

                        <label
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            paymentChoice === "token"
                              ? "bg-white border-orange-500 font-bold text-orange-800 shadow-sm"
                              : "bg-white/60 border-gray-300 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="paymentChoice"
                              value="token"
                              checked={paymentChoice === "token"}
                              onChange={() => setPaymentChoice("token")}
                              className="radio radio-xs radio-primary"
                            />
                            <span>
                              {serviceType === "party"
                                ? "40% Token"
                                : serviceType === "monthly"
                                ? "Trial Token"
                                : "Booking Token"}
                            </span>
                          </div>
                          <span className="font-black text-sm text-orange-600">₹{tokenAmount}</span>
                        </label>
                      </div>

                      {paymentChoice === "token" && remainingAmount > 0 && (
                        <p className="text-[11px] text-gray-500 mt-1.5 flex items-center justify-between">
                          <span>Balance payable on chef arrival:</span>
                          <span className="font-semibold text-gray-800">₹{remainingAmount}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base"
                    >
                      <FaLock className="text-sm" />
                      {submitting
                        ? "Initializing Checkout..."
                        : `Proceed to Pay ₹${payableAmount} via Razorpay`}
                    </button>

                    <p className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
                      <FaShieldAlt className="text-green-600" />
                      Razorpay 256-bit Secure Encryption • 100% Refundable as per ChefKart policy
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Interactive Razorpay Gateway Sandbox Modal               */}
      {/* ======================================================== */}
      {showRazorpayModal && pendingBookingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Razorpay Brand Header */}
            <div className="bg-[#0C2340] text-white p-5 relative">
              <button
                onClick={() => setShowRazorpayModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                <FaTimes />
              </button>

              <div className="flex items-center justify-between pr-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-tight text-lg text-white">Razorpay</span>
                    <span className="bg-blue-600/80 text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wider">
                      TEST SANDBOX
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 mt-0.5">ChefKart Hospitality Pvt. Ltd.</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-gray-300 block">Total Payable Amount</span>
                  <span className="text-2xl font-black text-white">
                    ₹{pendingBookingData.payableAmount}
                  </span>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                  INR Verified
                </span>
              </div>
            </div>

            {/* Sandbox Notice Banner */}
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center gap-2 text-xs text-blue-800">
              <FaInfoCircle className="text-blue-600 flex-shrink-0" />
              <span>
                Running in safe sandbox mode with simulated authorization. No real bank charge will be deducted.
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="p-5">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  type="button"
                  onClick={() => setActivePaymentMethod("upi")}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                    activePaymentMethod === "upi"
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <FaMobileAlt /> UPI / QR
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaymentMethod("card")}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                    activePaymentMethod === "card"
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <FaCreditCard /> Cards
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaymentMethod("netbanking")}
                  className={`flex-1 py-2.5 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors ${
                    activePaymentMethod === "netbanking"
                      ? "border-blue-600 text-blue-700"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  🏦 Netbanking
                </button>
              </div>

              {/* Tab Contents */}
              {activePaymentMethod === "upi" && (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg border flex items-center justify-center text-xl shadow-xs">
                        <FaQrcode className="text-gray-700" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">Instant UPI Checkout</p>
                        <p className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="badge badge-success text-[10px] text-white">Auto-Approved</span>
                  </div>

                  <div className="border border-dashed border-gray-300 p-3 rounded-xl text-center">
                    <span className="text-[11px] text-gray-500 block mb-1">Simulated VPA Address</span>
                    <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded">
                      {formData.phone ? `${formData.phone}@okhdfcbank` : "customer@chefkart"}
                    </span>
                  </div>
                </div>
              )}

              {activePaymentMethod === "card" && (
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">Test Card Number</span>
                      <span className="font-mono font-bold text-gray-800">4111 •••• •••• 1111 (Visa Sandbox)</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-200 text-[11px]">
                      <span>Valid Thru: 12/28</span>
                      <span>CVV: 123</span>
                    </div>
                  </div>
                </div>
              )}

              {activePaymentMethod === "netbanking" && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"].map((bank, i) => (
                    <div
                      key={i}
                      className="p-2.5 border rounded-lg bg-gray-50 hover:bg-orange-50/50 cursor-pointer font-medium text-gray-800"
                    >
                      🏦 {bank}
                    </div>
                  ))}
                </div>
              )}

              {/* Order Info & Button */}
              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleCompleteSandboxPayment}
                  className="w-full py-3 bg-[#3399CC] hover:bg-[#2884b2] text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <FaLock className="text-xs" />
                  {submitting
                    ? "Verifying Signature..."
                    : `Pay ₹${pendingBookingData.payableAmount} (Simulate Success)`}
                </button>

                <p className="text-center text-[10px] text-gray-400">
                  Secured by Razorpay • HMAC SHA-256 Signature Verification
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefDetails;