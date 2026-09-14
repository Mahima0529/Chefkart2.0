const { cloudinary } = require("../config/cloudinary");
const Testimonial = require("../model/Testimonial.Model");

// Create a testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, content, profileimage } = req.body;

    if (!name || !content) {
      return res.status(400).json({ message: "Name and content are required" });
    }

    const newTestimonial = new Testimonial({
      name,
      content,
      profileimage: profileimage || "",
    });
    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial is successfully created",
      data: newTestimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all testimonials
const getAllTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ updatedAt: -1 });
    res.status(200).json({
      message: "Testimonials fetched successfully",
      data: testimonials || []
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get single testimonial by ID
const getTestimonialByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid testimonial ID format" });
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({
      message: "Testimonial fetched successfully",
      data: testimonial
    });
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid testimonial ID format" });
    }

    const { name, content, profileimage } = req.body;
    const existing = await Testimonial.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    let imageUrl = existing.profileimage;
    if (profileimage && profileimage.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(profileimage, {
        folder: "testimonials",
      });
      imageUrl = result.secure_url;
    } else if (profileimage && (profileimage.startsWith("http://") || profileimage.startsWith("https://"))) {
      imageUrl = profileimage;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      {
        name: name !== undefined ? name : existing.name,
        content: content !== undefined ? content : existing.content,
        profileimage: imageUrl
      },
      { new: true }
    );

    res.status(200).json({
      message: "Testimonial updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete testimonial by ID
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid testimonial ID format" });
    }

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial deleted successfully",
      data: deleted
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteTestomonial = deleteTestimonial;

module.exports = {
  createTestimonial,
  getAllTestimonial,
  getTestimonialByID,
  updateTestimonial,
  deleteTestimonial,
  deleteTestomonial
};