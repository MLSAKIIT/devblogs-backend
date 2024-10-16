const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:id",getBlog) // to get a specific blog with id
router.post("/create",createBlog)
router.put("/update/:id",updateBlog)
router.delete("/delete/:id",deleteBlog)

module.exports = router ;