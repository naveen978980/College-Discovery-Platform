const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveCollege,
    getSavedColleges,
    deleteSavedCollege,
} = require("../controllers/savedCollegeController");

const router = express.Router();
console.log("authMiddleware:", typeof authMiddleware);
console.log("saveCollege:", typeof saveCollege);

router.post("/", authMiddleware, saveCollege);
router.get("/", authMiddleware, getSavedColleges);
router.delete("/:id", authMiddleware, deleteSavedCollege);
module.exports = router;