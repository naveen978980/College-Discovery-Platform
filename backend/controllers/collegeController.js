const prisma = require("../lib/prisma");

const getAllColleges = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const colleges = await prisma.college.findMany({
      skip: offset,
      take: limit,
    });
    res.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);

    res.status(500).json({
      error: "Failed to fetch colleges",
    });
  }
};
const createCollege = async (req, res) => {
  try { 
    const{name,location,fees,rating,description}=req.body;
    const college = await prisma.college.create({
      data: {
        name,
        location,
        fees,
        rating,
        description,
      },
    });
    res.status(201).json(college);
  } catch (error) {
    console.error("Error creating college:", error);
    res.status(500).json({
      error: "Failed to create college",
    });
  }
};
const getCollegeById = async (req, res) => {
  try{
    const { id } = req.params;
    const college = await prisma.college.findUnique({
      where: { id:id },
    });
    if(!college){
      return res.status(404).json({ error: "College not found" });
    }
    res.json(college);
  } catch (error) {
    console.error("Error fetching college:", error);
    res.status(500).json({
      error: "Failed to fetch college",
    });
  }
};
const updateCollege = async (req,res) => {
  try{
    const{id}=req.params;
    const updateCollege = await prisma.college.update({
      where : {
        id,
      },
      data: req.body,
    });
    res.json(updateCollege);
  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({
      error: "Failed to update college",
    });
  }
}
const deleteCollege = async (req,res) => {
  try{
    const{id}=req.params;
    const deleteCollege = await prisma.college.delete({
      where : {
        id,
      },
    });
    res.json({message:"College deleted successfully"});
  } catch (error) {
    console.error("Error deleting college:", error);
    res.status(500).json({
      error: "Failed to delete college",
    });
  }
}
const searchColleges = async (req, res) => {
  try {
    const { search } = req.query;
    const colleges = await prisma.college.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
    res.json(colleges);
  } catch (error) {
    console.error("Error searching colleges:", error);
    res.status(500).json({
      error: "Failed to search colleges",
    });
  }
};

module.exports = {
  getAllColleges,
  createCollege,
  getCollegeById,
  updateCollege,
  deleteCollege,
  searchColleges,
};