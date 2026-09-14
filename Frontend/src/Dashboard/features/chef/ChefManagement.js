import React, { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import api from "../../../config/api";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";

function ChefManagement() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    city: "Gurugram",
    state: "Haryana",
    experience: "3 years",
    Address: "Sector 45",
    profilepic: "",
    verified: true,
    aboutCook: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/chef/get");
      const data = res.data?.data || res.data || [];
      setChefs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch chef data", err);
      showNotification(err.response?.data?.message || "Failed to fetch chefs", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: "", type: "" }), 4000);
  };

  const handleOpenCreate = () => {
    setEditId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (chef) => {
    setEditId(chef._id);
    setFormData({
      name: chef.name || "",
      email: chef.email || "",
      phone: chef.phone || "",
      city: chef.city || "Gurugram",
      state: chef.state || "Haryana",
      experience: chef.experience || "",
      Address: chef.Address || "",
      profilepic: chef.profilepic || "",
      verified: chef.verified !== undefined ? chef.verified : true,
      aboutCook: chef.aboutCook || "",
    });
    setShowModal(true);
  };

  const handleToggleVerified = async (chef) => {
    try {
      const updatedVerified = !chef.verified;
      await api.put(`/chef/updateChef/${chef._id}`, { verified: updatedVerified });
      setChefs((prev) =>
        prev.map((c) => (c._id === chef._id ? { ...c, verified: updatedVerified } : c))
      );
      showNotification(`Chef ${chef.name} verification set to ${updatedVerified ? "Verified" : "Unverified"}`);
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete Chef "${name}"?`)) return;
    try {
      await api.delete(`/chef/deleteChef/${id}`);
      setChefs((prev) => prev.filter((c) => c._id !== id));
      showNotification("Chef removed successfully");
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to delete chef", "error");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.experience) {
      alert("Please provide name, email, phone, and experience.");
      return;
    }

    setSubmitting(true);
    try {
      if (editId) {
        await api.put(`/chef/updateChef/${editId}`, formData);
        showNotification("Chef profile updated successfully!");
      } else {
        await api.post("/chef/createChef", formData);
        showNotification("New Chef added successfully!");
      }
      setShowModal(false);
      fetchChefs();
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save chef", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter & Search
  const filteredChefs = chefs.filter((c) => {
    const matchesCity = cityFilter === "all" || (c.city || "").toLowerCase() === cityFilter.toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.phone || "").toLowerCase().includes(q) ||
      (c.city || "").toLowerCase().includes(q);
    return matchesCity && matchesSearch;
  });

  const uniqueCities = Array.from(new Set(chefs.map((c) => c.city).filter(Boolean)));

  // Pagination
  const totalPages = Math.ceil(filteredChefs.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChefs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      {feedback.message && (
        <div
          className={`alert mb-4 shadow-lg ${
            feedback.type === "error" ? "alert-error text-white" : "alert-success text-white"
          }`}
        >
          <span>{feedback.message}</span>
        </div>
      )}

      <TitleCard
        title="Chef Partner Management"
        topMargin="mt-2"
        TopSideButtons={
          <button
            onClick={handleOpenCreate}
            className="btn btn-primary btn-sm normal-case flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" /> Add New Chef
          </button>
        }
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, email, phone, city..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="input input-bordered input-sm w-full sm:w-72"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">City:</span>
            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="select select-bordered select-sm"
            >
              <option value="all">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-2 text-gray-500">Loading verified chefs...</p>
          </div>
        ) : filteredChefs.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-lg border border-dashed border-gray-300">
            <p className="text-lg font-medium text-gray-600">No chefs found</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm || cityFilter !== "all"
                ? "Try clearing your filters."
                : 'Click "Add New Chef" to onboard your first partner.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full text-sm">
              <thead>
                <tr className="bg-base-200 text-base-content">
                  <th>Chef</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((chef) => (
                  <tr key={chef._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            chef.profilepic ||
                            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150"
                          }
                          alt={chef.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80";
                          }}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-bold">{chef.name}</p>
                          <p className="text-xs text-gray-500">{chef.Address || "Address provided"}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="font-medium">{chef.email}</p>
                      <p className="text-xs text-gray-500">{chef.phone}</p>
                    </td>
                    <td>
                      <p className="font-medium">{chef.city || "Gurugram"}</p>
                      <p className="text-xs text-gray-500">{chef.state || "Haryana"}</p>
                    </td>
                    <td>{chef.experience}</td>
                    <td>
                      <button
                        onClick={() => handleToggleVerified(chef)}
                        title="Click to toggle verified status"
                        className={`badge badge-sm font-semibold cursor-pointer ${
                          chef.verified ? "badge-success text-white" : "badge-ghost text-gray-500"
                        }`}
                      >
                        {chef.verified ? "Verified ✓" : "Unverified"}
                      </button>
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(chef)}
                          title="Edit Chef"
                          className="btn btn-ghost btn-xs text-info hover:bg-blue-50"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(chef._id, chef.name)}
                          title="Delete Chef"
                          className="btn btn-ghost btn-xs text-error hover:bg-red-50"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              Prev
            </button>
            <span className="text-sm px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>
        )}
      </TitleCard>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4 text-primary">
              {editId ? "Edit Chef Profile" : "Onboard New Chef Partner"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Chef Name *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email *</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full input-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Phone Number *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Experience *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Years"
                    className="input input-bordered w-full input-sm"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">City</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">State</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Profile Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="input input-bordered w-full input-sm"
                  value={formData.profilepic}
                  onChange={(e) => setFormData({ ...formData, profilepic: e.target.value })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">About Cook / Bio</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full text-sm"
                  placeholder="Cuisines, specialties, background..."
                  value={formData.aboutCook}
                  onChange={(e) => setFormData({ ...formData, aboutCook: e.target.value })}
                  rows="2"
                ></textarea>
              </div>

              <div className="form-control">
                <label className="cursor-pointer label justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text font-medium">Verified Chef Partner</span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost btn-sm"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary btn-sm ${submitting ? "loading" : ""}`}
                  disabled={submitting}
                >
                  {editId ? "Update Chef" : "Create Chef"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChefManagement;
