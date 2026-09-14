import React, { useState, useEffect } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
const ChefDirectory = () => {
  //handle the api calls and data fetching for the chef directory
  //useState to manage the state of chefs and search filters
  const [chefs, setChefs] = useState([]);

  //search  filter of chef
  const [search, setSearch] = useState("");
  //useNavigate is used to navigate to different routes
   const navigate = useNavigate();

  const [filters, setFilters] = useState({
    city: "",
    area: "",
    locality: "",
  });

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await api.get("/chef/get");
        if (response.data && response.data.data) {

          setChefs(response.data.data);
        } else if (Array.isArray(response.data)) {
          setChefs(response.data);
        }
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);
// filter the chefs based on the search input and selected filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  
  const filteredChefs = chefs.filter((chef) => {
    const matchesGlobalSearch =
      chef.name.toLowerCase().includes(search.toLowerCase()) ||
      chef.phone.includes(search);
    const matchesCity =
      filters.city === "" ||
      chef.city?.toLowerCase().includes(filters.city.toLowerCase());
    const matchesArea =
      filters.area === "" ||
      chef.area?.toLowerCase().includes(filters.area.toLowerCase());
    const matchesLocality =
      filters.locality === "" ||
      chef.Address?.toLowerCase().includes(filters.locality.toLowerCase());

    return matchesGlobalSearch && matchesCity && matchesArea && matchesLocality;
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-16">
      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Global Search..."
          className="p-2 border rounded shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="Search by City"
          className="p-2 border rounded shadow-sm"
          value={filters.city}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="area"
          placeholder="Search by Area"
          className="p-2 border rounded shadow-sm"
          value={filters.area}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="locality"
          placeholder="Search by Locality"
          className="p-2 border rounded shadow-sm"
          value={filters.locality}
          onChange={handleFilterChange}
        />
      </div>

      {/* Chefs List */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Trending Verified Cooks</h1>
        <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          {filteredChefs.length} {filteredChefs.length === 1 ? 'Cook Available' : 'Cooks Available'}
        </span>
      </div>

      {filteredChefs.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200 mt-4">
          <p className="text-xl font-bold text-gray-700">No cooks found matching your filters</p>
          <p className="text-gray-500 mt-2">Try clearing your search terms or selecting a different locality.</p>
          <button
            onClick={() => { setSearch(''); setFilters({ city: '', area: '', locality: '' }); }}
            className="mt-4 px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChefs.map((chef, index) => (
            <div
              key={chef._id || index}
              onClick={() => navigate(`/chef/${chef._id}`)}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start space-x-4">
                  <img
                    src={chef.profilepic || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80"}
                    alt={chef.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80";
                    }}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-100 shadow-sm flex-shrink-0 group-hover:scale-105 transition duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{chef.name}</h3>
                      {chef.verified && (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {chef.city || "Delhi NCR"}{chef.area ? `, ${chef.area}` : ""}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold mt-1">
                      ⭐ {chef.starRating || "4.8"}
                      <span className="text-gray-400 font-normal">({chef.totalRatings || 42} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1.5">
                  {chef.cuisines && (
                    <p className="line-clamp-1">
                      <span className="font-semibold text-gray-700">Cuisines: </span>
                      {Array.isArray(chef.cuisines) ? chef.cuisines.join(', ') : chef.cuisines}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold text-gray-700">Experience: </span>
                    {chef.experience || "5+ Years"}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Starts at</span>
                  <p className="text-base font-bold text-orange-600">₹{chef.price || 499}<span className="text-xs text-gray-400 font-normal">/meal</span></p>
                </div>
                <span className="px-3.5 py-1.5 bg-orange-50 text-orange-600 font-bold text-xs rounded-lg group-hover:bg-orange-500 group-hover:text-white transition">
                  Book Chef →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefDirectory;