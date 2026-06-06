const express = require("express");
console.log("College Routes Loaded");
const {
    getAllColleges,
    createCollege,
    getCollegeById,
    updateCollege,
    deleteCollege,
    searchColleges,

} = require("../controllers/collegeController");

const router = express.Router();

router.get("/", getAllColleges);
router.post("/", createCollege);
router.get("/search", searchColleges);
router.get("/:id", getCollegeById);
router.put("/:id", updateCollege);
router.delete("/:id", deleteCollege);
router.get("/search", searchColleges);

module.exports = router;