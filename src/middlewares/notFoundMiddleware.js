export const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    path: req.path,
    message: "requested resource could not be found",
  });
};
