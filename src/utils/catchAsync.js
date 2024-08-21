const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).reject((err) => {
      next(err);
    });
  };
};
export { catchAsync };
