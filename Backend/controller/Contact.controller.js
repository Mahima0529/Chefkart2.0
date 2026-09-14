
const Contact = require("../model/Contact.Models");

// Create contact message
const createContact = async (req, res) => {
  try {
    const { name, firstName, fullname, phone, email, city, area, message } = req.body;
    const finalName = name || firstName || fullname;

    if (!finalName || !phone || !email) {
      return res.status(400).json({ message: "Name, phone, and email are required" });
    }

    const newContact = new Contact({
      name: finalName,
      phone,
      email,
      city: city || "Not specified",
      area: area || "",
      message: message || ""
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact message successfully received",
      data: newContact
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all contacts
const getallContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ updatedAt: -1 });
    res.status(200).json(contacts || []);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid contact ID format" });
    }

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
      data: deleted
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createContact,
  getallContact,
  deleteContact
};