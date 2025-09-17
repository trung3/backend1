require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const contactsRouter = require("./app/routes/contact.route");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/contacts", contactsRouter);

// 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// error handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
