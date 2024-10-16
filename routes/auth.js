const express = require("express");

const { loginHandler, registerHandler } = require("../controllers/auth");

const router = express.Router();

router.post("/login", loginHandler);

router.post("/register", registerHandler);

module.exports = router;
