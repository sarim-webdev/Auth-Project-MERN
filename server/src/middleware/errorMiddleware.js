const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    status: false,
    message: err.message,
  });
};

export { errorMiddleware };
