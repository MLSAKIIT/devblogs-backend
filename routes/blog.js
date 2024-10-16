import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.js';

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:id",getBlog) // to get a specific blog with id
router.post("/create",createBlog)
router.put("/update/:id",updateBlog)
router.delete("/delete/:id",deleteBlog)

export default router;