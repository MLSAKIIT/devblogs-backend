const express = require("express");

const { loginHandler, registerHandler } = require("../controllers/auth");

const router = express.Router();

router.post("/login", (req, res) => {
  loginHandler(req, res);
});

router.post("/register", (req, res) => {
  registerHandler(req, res);
});

module.exports = router;
