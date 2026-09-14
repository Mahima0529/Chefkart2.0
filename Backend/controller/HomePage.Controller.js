const { cloudinary } = require("../config/cloudinary");
const Home = require("../model/HomeImage.Model");

//create a new blog post with the provided data

const createKitchen = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    /// validation process
    if (!title || !content || !category || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    // check   if the blog is already exists
    const existingData=await Home.findOne({title})

    if(existingData){
      return res.status(400).json({message:"This blog already exists"})
    }

    
    const newHome = new Home({
      title,
      content,
      category,
      image,
    });
    await newHome.save();

    res.status(201).json({
      message: "Home Page is successfully created",
      
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all home images
const getallHomeImage = async (req, res) => {
  try {
    const homes = await Home.find().sort({ updatedAt: -1 });
    res.status(200).json(homes || []);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//getting a single home post
const getHomeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const homeItem = await Home.findById(id);

    if (!homeItem) {
      return res.status(404).json({ message: "Home post not found" });
    }
    res.status(200).json(homeItem);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// update home post
const updateHomePage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { title, content, category, image } = req.body;
    const existingHome = await Home.findById(id);
    if (!existingHome) {
      return res.status(404).json({ message: "Home post not found" });
    }

    let imageUrl = existingHome.image;
    if (image && image.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "home",
      });
      imageUrl = result.secure_url;
    } else if (image && (image.startsWith("http://") || image.startsWith("https://"))) {
      imageUrl = image;
    }

    const updatedhome = await Home.findByIdAndUpdate(
      id,
      {
        title: title !== undefined ? title : existingHome.title,
        content: content !== undefined ? content : existingHome.content,
        category: category !== undefined ? category : existingHome.category,
        image: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Home page is successfully updated",
      updatedhome,
      data: updatedhome
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// delete a home post by id
const deletehomePage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const existingHome = await Home.findById(id);
    if (!existingHome) {
      return res.status(404).json({ message: "Home post not found" });
    }

    const deletedHome = await Home.findByIdAndDelete(id);

    res.status(200).json({
      message: "Home post successfully deleted",
      deletedHome,
      data: deletedHome
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



module.exports={
    createKitchen,
    getallHomeImage,
    getHomeById,
    updateHomePage,
    deletehomePage
};