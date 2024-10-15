const express = require("express");
const { verifyTokenHandler } = require("../controllers/auth");

const router = express.Router();

router.post("/verify", verifyTokenHandler);

module.exports = router;
