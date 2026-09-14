import { useState, useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import api from "../../../config/api";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

function ContactList() {
   const [contacts, setContacts] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchContacts();
   }, []);

   const fetchContacts = async () => {
      setLoading(true);
      try {
         const response = await api.get("/contact");
         const raw = response.data;
         const data = Array.isArray(raw) ? raw : raw?.data || [];
         setContacts(data);
      } catch (err) {
         console.error("Failed to fetch contacts", err);
         setContacts([]);
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this contact message?")) return;
      try {
         await api.delete(`/contact/delete/${id}`);
         setContacts((prev) => prev.filter((c) => c._id !== id));
      } catch (err) {
         console.error("Failed to delete contact", err);
         alert("Failed to delete contact inquiry");
      }
   };

   return (
      <div className="p-6 min-h-screen bg-gray-100">
         <TitleCard title="Contact Messages & Inquiries">
            {loading ? (
               <div className="text-center py-8 text-gray-500">Loading inquiries...</div>
            ) : contacts.length === 0 ? (
               <div className="text-center py-8 text-gray-400">No contact messages received yet.</div>
            ) : (
               <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
                     <thead>
                        <tr className="bg-gray-200">
                           <th className="border border-gray-300 p-2">Full Name</th>
                           <th className="border border-gray-300 p-2">Email</th>
                           <th className="border border-gray-300 p-2">Message</th>
                           <th className="border border-gray-300 p-2">Created At</th>
                           <th className="border border-gray-300 p-2 text-center">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {contacts.map((contact) => (
                           <tr key={contact._id} className="hover:bg-gray-100">
                              <td className="border border-gray-300 p-2 font-medium">
                                 {contact.firstName || contact.name} {contact.lastName || ""}
                              </td>
                              <td className="border border-gray-300 p-2">{contact.email}</td>
                              <td className="border border-gray-300 p-2 max-w-xs">{contact.message || "-"}</td>
                              <td className="border border-gray-300 p-2 text-xs text-gray-500">
                                 {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "-"}
                              </td>
                              <td className="border border-gray-300 p-2 text-center">
                                 <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="btn btn-ghost btn-xs text-error"
                                    title="Delete Message"
                                 >
                                    <TrashIcon className="w-4 h-4" />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </TitleCard>
      </div>
   );
}

export default ContactList;
