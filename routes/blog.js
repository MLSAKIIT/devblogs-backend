import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from ('../controllers/blog.js');

const router = express.Router();

router.get("/", (req, res) => {
  getBlogs(req, res);
});

router.get("/:id", (req, res) => {
  getBlog(req, res);
});

router.post("/", (req, res) => {
  createBlog(req, res);
});

router.put("/:id", (req, res) => {
  updateBlog(req, res);
});

router.delete("/:id", (req, res) => {
  deleteBlog(req, res);
});
