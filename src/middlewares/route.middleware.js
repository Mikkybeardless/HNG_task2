export const generateMiddleware = (schema, message) => {
  return (req, res, next) => {
    if (schema) {
      const result = schema.validate(req.body);
      console.log("Validation Result", result);
      if (result.error) {
        return res.status(400).json({ message, errors: result.error });
      }
    }

    next();
  };
};
