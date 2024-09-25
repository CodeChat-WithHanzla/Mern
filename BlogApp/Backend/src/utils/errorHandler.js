export const errorHandler = (err, _, res, __) => {
  const statusCode = err.statusCode || 500;
  const response = {
    status: "error",
    success: err.success,
    statusCode,
    message: err.message || "Internal Server Error",
  };
  res.status(statusCode).json(response);
};
