const { cloudinary } = require("../config/cloudinary");
const Join = require("../model/Join.Model");

//create a new blog post with the provided data

const createJoin = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    /// validation process
    if (!title || !content || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    // check   if the blog is already exists
    const existingData=await Join.findOne({title})

    if(existingData){
      return res.status(400).json({message:"This content already exists"})
    }

    
    const newJoin = new Join({
      title,
      content,
      image,
    });
    await newJoin.save();

    res.status(201).json({
      message: "Join  is successfully created",
      
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all join posts
const getallJoins = async (req, res) => {
  try {
    const joins = await Join.find().sort({ updatedAt: -1 });
    res.status(200).json(joins || []);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//getting a single join post
const getJoinById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const joinItem = await Join.findById(id);

    if (!joinItem) {
      return res.status(404).json({ message: "Join item not found" });
    }
    res.status(200).json(joinItem);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// update join post
const updateJoins = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const { title, content, image } = req.body;
    const existingJoin = await Join.findById(id);
    if (!existingJoin) {
      return res.status(404).json({ message: "Join item not found" });
    }

    let imageUrl = existingJoin.image;
    if (image && image.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "join",
      });
      imageUrl = result.secure_url;
    } else if (image && (image.startsWith("http://") || image.startsWith("https://"))) {
      imageUrl = image;
    }

    const updated = await Join.findByIdAndUpdate(
      id,
      {
        title: title !== undefined ? title : existingJoin.title,
        content: content !== undefined ? content : existingJoin.content,
        image: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Join item updated successfully",
      updateBlogs: updated,
      data: updated
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// delete a join post by id
const deleteJoin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const existingJoin = await Join.findById(id);
    if (!existingJoin) {
      return res.status(404).json({ message: "Join item not found" });
    }

    const deleted = await Join.findByIdAndDelete(id);

    res.status(200).json({
      message: "Join item successfully deleted",
      deletedBlog: deleted,
      data: deleted
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



module.exports={
    createJoin,
    getallJoins,
    getJoinById,
    updateJoins,
    deleteJoin
    // getallBlogs,
    // getBlogById,
    // updateBlog,
    // deleteBlog
};