const { cloudinary } = require("../config/cloudinary");
const Gallery = require("../model/Gallery.Model");

// Create Gallery
const createGallery = async (req, res) => {
  try {
    const { name, content, galleryImages } = req.body;

    if (!name || !content) {
      return res.status(400).json({ message: "Name and content are required" });
    }

    let images = [];
    if (Array.isArray(galleryImages)) {
      images = galleryImages;
    } else if (typeof galleryImages === "string" && galleryImages.trim()) {
      images = [galleryImages];
    }

    const newGallery = new Gallery({
      name,
      content,
      galleryImages: images,
    });
    await newGallery.save();

    res.status(201).json({
      message: "Gallery created successfully",
      gallery: newGallery,
      data: newGallery
    });
  } catch (error) {
    console.error("Error creating gallery:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all galleries
const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ updatedAt: -1 });
    res.status(200).json(galleries || []);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get gallery by ID
const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid gallery ID format" });
    }

    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update gallery
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid gallery ID format" });
    }

    const { name, content, galleryImages } = req.body;
    const existing = await Gallery.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    let images = existing.galleryImages;
    if (galleryImages) {
      if (Array.isArray(galleryImages)) {
        images = galleryImages;
      } else if (typeof galleryImages === "string" && galleryImages.trim()) {
        images = [galleryImages];
      }
    }

    const updated = await Gallery.findByIdAndUpdate(
      id,
      {
        name: name !== undefined ? name : existing.name,
        content: content !== undefined ? content : existing.content,
        galleryImages: images
      },
      { new: true }
    );

    res.status(200).json({
      message: "Gallery updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating gallery:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete gallery by ID
const deleteGallery = async (req, res) => {
  try {
    const id = req.params.id || req.body.id || req.query.id;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid or missing gallery ID" });
    }

    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({
      message: "Gallery deleted successfully",
      data: deleted
    });
  } catch (error) {
    console.error("Error deleting gallery:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery
};