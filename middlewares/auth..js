const jwt = require("jsonwebtoken");
export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) 
         return  res.status(401).json({ message: "You are not authenticated" });
    const token = req.headers.authorization.split(" ")[1];
    if (!token)  
        return  res.status(401).json({ message: "You are not authenticated" });

    const decode =  jwt.verify(token, process.env.JWT);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error)
    res.status(402).json({ error: error.message })
  }
};