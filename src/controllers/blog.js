import Blogs from '../models/Blogs.js';
import User from '../models/User.js'
import { CustomError } from '../utils/customError.js';

const getBlogs = async (req, res, next) => {
  try {
    
    const blogs = await Blogs.find().populate('user','username');
    if(!blogs){
      throw new CustomError("something went wrong fetching the blogs")
    }
    return   res.status(200).json({blogs:blogs})
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    
    const blog = await Blogs.findById({_id:id})
    if(!blog){
      throw new CustomError("Blog not found",404);
    }
    return res.status(200).json({blog:blog})

  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { title, content, user } = req.body;
    
    if (!title || !content || !user){
      throw new CustomError("All fields are required",400)
    }
    const ExistingUser = await User.findById(user)
    if (!ExistingUser){
      throw new CustomError("user doesnt exist",404)
    }

    const blog = await Blogs.create({
      title,
      content,
      user
    })

    if (!blog){
      throw new CustomError("Something went wrong");
    }
    const populatedBlog = await Blogs.findById(blog._id).populate('user', 'username');
    return res.status(201).json({blog:populatedBlog})
    
  } catch (error) {
    next(error)
  }
};

const updateBlog = async (req, res, next) => {

  const {id}  = req.params;
  const { title , content } = req.body;

  try {

    const blog = await Blogs.findById(id)
    if (!blog){
      throw new CustomError("blog not found with specified id",404)
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(
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
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {

  const { id } = req.params;

  try {
    
    const blog = await Blogs.findById(id)
    if(!blog){
      throw new CustomError("blog with the id not found",404)
    }
    const DeletedBlog = await Blogs.findByIdAndDelete(id)
    
    return res.status(200).json({message:"blog deleted sucessfully",DeletedBlog})

  } catch (error) {
    next(error);
  }
};

export{
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
}
