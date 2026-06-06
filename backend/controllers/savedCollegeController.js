const prisma = require("../lib/prisma");

const saveCollege = async (req, res) => {
  try {
    const { collegeId } = req.body;

    // Check if already saved
    const existing = await prisma.savedCollege.findFirst({
      where: {
        userId: req.user.id,
        collegeId,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "College already saved",
      });
    }

    // Save college
    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: req.user.id,
        collegeId,
      },
    });

    res.status(201).json(savedCollege);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to save college",
    });
  }
};

const getSavedColleges = async (req, res) => {
  try {
    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: req.user.id },
      include: { college: true },
    });

    res.json(savedColleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch saved colleges",
    });
  }
};

const deleteSavedCollege = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.savedCollege.delete({
      where: { id },
    });
    res.json({ message: "Saved college removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        error: "Failed to remove saved college",
    });
  }
};
module.exports = {
  saveCollege,
  getSavedColleges,
  deleteSavedCollege,
};