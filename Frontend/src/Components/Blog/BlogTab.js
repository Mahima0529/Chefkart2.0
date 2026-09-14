import React, { useEffect, useState } from "react";
import api from "../../config/api";

const fallbackBlogs = [
  {
    _id: "blog-1",
    title: "6 things to keep in mind when hiring a cook for home",
    category: "Find a Cook",
    image: "https://thechefkart.com/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fchefkart-strapi-media%2FBlog_ZO_02_c103cf5073.webp&w=1920&q=75",
    content: "Finding a reliable, skilled home cook can transform your daily health and family routine. Consider dietary alignment, background verification, cuisine expertise, hygiene practices, punctuality, and trial sessions before making a long-term commitment.",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "blog-2",
    title: "How ChefKart trains and verifies kitchen professionals",
    category: "Trust & Safety",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    content: "Our cooks go through a rigorous 3-stage onboarding process including government ID checks, address verification, culinary skill assessment, and professional hygiene training under Skill India standards.",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "blog-3",
    title: "Healthy meal planning tips for busy working professionals",
    category: "Healthy Living",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    content: "Balancing career demands with nutritious eating is easier when you plan seasonal vegetables, prep weekly staple marinades, and have an experienced cook preparing fresh meals right at your dinner time.",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "blog-4",
    title: "The ultimate guide to hosting an unforgettable dinner party",
    category: "Party & Events",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
    content: "Hosting friends and family should be relaxing, not stressful. Hiring a dedicated party chef lets you enjoy the company of your guests while live tandoors, multi-course platters, and bar services are seamlessly handled.",
    updatedAt: new Date().toISOString(),
  },
];

const TabSwitch = () => {
  const [data, setData] = useState(fallbackBlogs);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog/getAll");
        const raw = response.data;
        const blogData = Array.isArray(raw) ? raw : raw?.data || [];
        if (blogData.length > 0) {
          setData(blogData);
        }
      } catch (err) {
        console.warn("Using fallback blogs:", err.message);
      }
    };

    fetchBlogs();
  }, []);

  const fetchBlogDetails = async (id) => {
    const local = data.find((b) => b._id === id);
    if (local && local.content && local.content.length > 100) {
      setSelectedBlog(local);
      setModalOpen(true);
      return;
    }

    setModalLoading(true);
    try {
      const response = await api.get(`/blog/get/${id}`);
      setSelectedBlog(response.data?.data || response.data || local);
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch blog details", err);
      if (local) {
        setSelectedBlog(local);
        setModalOpen(true);
      }
    } finally {
      setModalLoading(false);
    }
  };

  const categories = ["All", ...new Set(data.map((item) => item.category).filter(Boolean))];
  const filteredData =
    activeTab === "All" ? data : data.filter((item) => item.category === activeTab);

  return (
    <div className="w-full bg-[#faf9f6] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Tab Buttons */}
        <div className="flex gap-2 sm:gap-3 mb-10 justify-center items-center flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-200 ${
                activeTab === category
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                  : "bg-white text-gray-700 hover:text-orange-600 hover:bg-orange-50/60 border border-gray-200/80 shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredData.map((item) => (
            <div
              key={item._id}
              onClick={() => fetchBlogDetails(item._id)}
              className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100/90 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              <div className="h-52 overflow-hidden bg-gray-100 relative">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"}
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.category || "Culinary"}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-950 leading-snug mb-2.5 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {item.content}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 font-medium">
                  <span>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "Recent"}</span>
                  <span className="text-orange-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read article →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && selectedBlog && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden max-h-[85vh] flex flex-col relative shadow-2xl animate-fade-in border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-black flex items-center justify-center shadow-md transition"
              >
                ✕
              </button>
              {modalLoading ? (
                <div className="p-12 text-center text-orange-500 font-semibold">Loading details...</div>
              ) : (
                <div className="overflow-y-auto p-6 sm:p-8">
                  <img
                    src={selectedBlog.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"}
                    alt={selectedBlog.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80";
                    }}
                    className="w-full h-56 sm:h-72 object-cover rounded-2xl mb-6 shadow-md"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    {selectedBlog.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-3 mb-2 leading-snug">
                    {selectedBlog.title}
                  </h2>
                  <p className="text-xs text-gray-400 mb-6">
                    Published on{" "}
                    {selectedBlog.updatedAt ? new Date(selectedBlog.updatedAt).toLocaleDateString() : "Recent"}
                  </p>
                  <div className="text-gray-700 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>{selectedBlog.content}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSwitch;