import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import axios from "axios";
import api from "../../../config/api";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

function ImageGallery() {
   const [images, setImages] = useState([]);
   const [selectedImage, setSelectedImage] = useState(null);
   const [uploading, setUploading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

   useEffect(() => {
      fetchImages();
   }, []);

   const fetchImages = async () => {
      try {
         const res = await api.get("/foodGall/getall");
         setImages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
         console.error("Failed to fetch images", err);
         setImages([]);
      }
   };

   const handleImageChange = (e) => {
      setSelectedImage(e.target.files[0]);
   };

   const handleUpload = async () => {
      if (!selectedImage) return alert("Please select an image to upload");

      setUploading(true);
      try {
         // 1. Upload the image to Cloudinary
         const formData = new FormData();
         formData.append("file", selectedImage);
         formData.append("upload_preset", "marketdata");
         const cloudinaryRes = await axios.post(
            "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload",
            formData
         );

         const imageUrl = cloudinaryRes.data.secure_url;

         // 2. Send the image URL to backend
         await api.post("/foodGall/create", {
            image: imageUrl,
         });

         setSelectedImage(null);
         fetchImages();
      } catch (err) {
         console.error("Image upload failed", err);
         alert("Upload failed. Please try again.");
      } finally {
         setUploading(false);
      }
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this image?")) return;
      try {
         await api.delete(`/foodGall/delete/${id}`);
         setImages((prev) => prev.filter((img) => img._id !== id));
      } catch (err) {
         console.error("Failed to delete image", err);
         alert("Failed to delete image");
      }
   };

   // Pagination Logic
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);
   const totalPages = Math.ceil(images.length / itemsPerPage) || 1;

   const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Food Gallery Management">
            {/* Upload Section */}
            <div className="mb-6 flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
               <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
               />
               <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`btn btn-primary btn-sm ${uploading ? "loading" : ""}`}
               >
                  {uploading ? "Uploading..." : "Upload New Image"}
               </button>
            </div>

            {/* Image Gallery */}
            {images.length === 0 ? (
               <div className="text-center py-12 text-gray-500">No images uploaded to food gallery yet.</div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentItems.map((img) => (
                     <div key={img._id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 relative group">
                        <img
                           src={img.image}
                           alt="Food Item"
                           className="w-full h-48 object-cover rounded-md"
                        />
                        <div className="flex items-center justify-between mt-2">
                           <p className="text-xs text-gray-500">
                              {img.createdAt ? new Date(img.createdAt).toLocaleDateString() : ""}
                           </p>
                           <button
                              onClick={() => handleDelete(img._id)}
                              className="btn btn-ghost btn-xs text-error hover:bg-red-50"
                              title="Delete image"
                           >
                              <TrashIcon className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
               <div className="mt-6 flex justify-center items-center gap-2">
                  <button
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                     className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                  >
                     Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                     <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 border rounded ${
                           currentPage === i + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100"
                        }`}
                     >
                        {i + 1}
                     </button>
                  ))}
                  <button
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                  >
                     Next
                  </button>
               </div>
            )}
         </TitleCard>
      </div>
   );
}

export default ImageGallery;
