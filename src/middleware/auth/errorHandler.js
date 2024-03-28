module.exports = (error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((val) => val.message);
    return res.status(400).json({ error: message.join(", ") });
  }

  if (error instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }

  return res.status(500).json({ error: "Something went wrong" });
};
