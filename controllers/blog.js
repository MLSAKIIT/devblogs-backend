import Blogs from '../models/Blogs.js';
import User from '../models/User.js'

const getBlogs = async (req, res) => {
  try {
    
    const blogs = await Blogs.find().populate('user','username');
    if(!blogs){
      res.status(500).json({message:"something went wrong fetching the blogs"})
    }
    return   res.status(200).json({blogs:blogs})
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    
    const blog = await Blogs.findById({_id:id})
    if(!blog){
      res.status(404).json({message:"Blog not found"})
    }
    return res.status(200).json({blog:blog})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, user } = req.body;
    
    if (!title || !content || !user){
      res.status(400).json({error:"All fields are required"})
    }
    const ExistingUser = await User.findById(user)
    if (!ExistingUser){
      res.status(404).json({message:"user doesnt exist"})
    }

    const blog = await Blogs.create({
      title,
      content,
      user
    })

    if (!blog){
      res.status(500).json({message:"something went wrong"})
    }
    const populatedBlog = await Blogs.findById(blog._id).populate('user', 'username');
    return res.status(201).json({blog:populatedBlog})
    
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }
};

const updateBlog = async (req, res) => {

  const {id}  = req.params;
  const { title , content } = req.body;

  try {

    blog = await Blogs.findById(id)
    if (!blog){
      res.status(404).json({message:"blog not found with specified id"})
    }

    updatedBlog = await Blogs.findByIdAndUpdate(
      id,
      {
        $set:{
          title,
          content
        },
      },
      { new: true}
    );
    

    return res.status(200).json({updatedBlog})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {

  const { id } = req.params;

  try {
    
    const blog = await Blogs.findById(id)
    if(!blog){
      res.status(404).json({message:"blog with the id not found"})
    }
    const DeletedBlog = await Blogs.findByIdAndDelete(id)
    
    return res.status(200).json({message:"blog deleted sucessfully",DeletedBlog})

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export{
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
}
