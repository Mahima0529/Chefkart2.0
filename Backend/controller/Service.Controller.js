const Service = require("../model/Services.Model");

// Create Service
const createServices = async (req, res) => {
  try {
    const { servicename, description, image } = req.body;

    if (!servicename || !description) {
      return res.status(400).json({ message: "Service name and description are required" });
    }

    const existingServices = await Service.findOne({ servicename });
    if (existingServices) {
      return res.status(400).json({ message: "Service with this name already exists" });
    }

    const newService = new Service({
      servicename,
      description,
      image: image || ""
    });
    await newService.save();

    res.status(201).json({
      message: "Service created successfully",
      service: newService,
      data: newService
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ updatedAt: -1 });
    res.status(200).json(services || []);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get single service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid service ID format" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update service
const updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid service ID format" });
    }

    const { servicename, description, image } = req.body;
    const existing = await Service.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Service not found" });
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      {
        servicename: servicename !== undefined ? servicename : existing.servicename,
        description: description !== undefined ? description : existing.description,
        image: image !== undefined ? image : existing.image
      },
      { new: true }
    );

    res.status(200).json({
      message: "Service updated successfully",
      data: updated
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete service
const deleteServices = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid service ID format" });
    }

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service successfully deleted",
      data: deleted
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createServices,
  getAllServices,
  getServiceById,
  updateServices,
  deleteServices
};