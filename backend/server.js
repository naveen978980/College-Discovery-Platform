const express = require("express");
const cors = require("cors");
require("dotenv").config();

const savedCollegeRoutes =require("./routes/savedCollegeRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("College Discovery API Running");
});
app.use("/api/saved-colleges",savedCollegeRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});