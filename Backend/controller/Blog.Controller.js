const { cloudinary } = require("../config/cloudinary");
const Blog = require("../model/Blog.Model");

//create a new blog post with the provided data

const createBlog = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    /// validation process
    if (!title || !content || !category || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    // check   if the blog is already exists
    const existingData=await Blog.findOne({title})

    if(existingData){
      return res.status(400).json({message:"This blog already exists"})
    }

    
    const newBlog = new Blog({
      title,
      content,
      category,
      image,
    });
    await newBlog.save();

    res.status(201).json({
      message: "Blog is successfully created",
      
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all blog posts
const getallBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.status(200).json(blogs || []);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//getting a single blog
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    const { title, content, category, image } = req.body;
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imageUrl = existingBlog.image;
    if (image && image.startsWith("data:")) {
      const result = await cloudinary.uploader.upload(image, { folder: "blogs" });
      imageUrl = result.secure_url;
    } else if (image && (image.startsWith("http://") || image.startsWith("https://"))) {
      imageUrl = image;
    }

    const updateBlogs = await Blog.findByIdAndUpdate(
      id,
      {
        title: title !== undefined ? title : existingBlog.title,
        content: content !== undefined ? content : existingBlog.content,
        category: category !== undefined ? category : existingBlog.category,
        image: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Blog is updated successfully",
      updateBlogs,
      data: updateBlogs
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// delete a blog post by id

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
 

    // Validate if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    // Check if the blog exists before deletion
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Blog successfully deleted",
      deletedBlog,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



module.exports={
    createBlog,
    getallBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};