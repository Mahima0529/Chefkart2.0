const { cloudinary } = require("../config/cloudinary");
const Investor = require("../model/Investor.Model");

// Create investor
const createInvestor = async (req, res) => {
  try {
    const { title, subtitle, description, image } = req.body;
 
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const existingData = await Investor.findOne({ title });
    if (existingData) {
      return res.status(400).json({ message: "An investor item with this title already exists" });
    }

    const newInvestor = new Investor({
      title,
      subtitle: subtitle || "",
      description,
      image: image || ""
    });
    await newInvestor.save();

    res.status(201).json({
      message: "Investor created successfully",
      data: newInvestor
    });
  } catch (error) {
    console.error("Error creating investor:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all investors
const getallInvestor = async (req, res) => {
  try {
    const investors = await Investor.find().sort({ updatedAt: -1 });
    res.status(200).json(investors || []);
  } catch (error) {
    console.error("Error fetching investors:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a single investor by ID
const getInvestorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid investor ID format" });
    }

    const investor = await Investor.findById(id);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }
    res.status(200).json(investor);
  } catch (error) {
    console.error("Error fetching investor:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update investor
const updateInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid investor ID format" });
    }

    const { title, subtitle, description, image } = req.body;
    const existing = await Investor.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Investor not found" });
    }

    let imageUrl = existing.image;
    if (image && image.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(image, { folder: "investor" });
      imageUrl = result.secure_url;
    } else if (image && (image.startsWith("http://") || image.startsWith("https://"))) {
      imageUrl = image;
    }

    const updatedInvestor = await Investor.findByIdAndUpdate(
      id,
      {
        title: title !== undefined ? title : existing.title,
        subtitle: subtitle !== undefined ? subtitle : existing.subtitle,
        description: description !== undefined ? description : existing.description,
        image: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Investor updated successfully",
      data: updatedInvestor,
    });
  } catch (error) {
    console.error("Error updating investor:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete investor by ID
const deleteInvestor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid investor ID format" });
    }

    const deleted = await Investor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Investor not found" });
    }

    res.status(200).json({
      message: "Investor successfully deleted",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting investor:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createInvestor,
  getallInvestor,
  getInvestorById,
  updateInvestor,
  deleteInvestor
};