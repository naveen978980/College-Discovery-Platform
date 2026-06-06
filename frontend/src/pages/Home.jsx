import React, { useEffect, useState } from "react";
import api from "../services/api";
import CollegeCard from "../components/CollegeCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");

    useEffect(() => {  
    fetchColleges();
  }, []);
const fetchColleges = async () => {
    try {
      const response = await api.get("/colleges");
    console.log("API Response:", response.data);
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }   
};
const searchColleges = async (search) => {
  try {
    const response = await api.get(`/colleges/search?search=${search}`);
    setColleges(response.data);
  } catch (error) {
    console.error("Error searching colleges:", error);
  }
};
const handleSave = async (collegeId) => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await api.post(
      "/saved-colleges",
      {
        collegeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("College Saved!");
  }catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    "Something went wrong"
  );
}
}
console.log("Home handleSave:", handleSave);
console.log("Colleges State:", colleges);

return (
  <div className="h-[calc(100vh-100px)] p-6 bg-gradient-to-t from-blue-500 to-white">
    <h1 className="text-4xl font-bold text-center mb-6">
       College Discovery
    </h1>

    <div className="flex justify-center mb-6">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => searchColleges(search)}
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {colleges.map((college) => (
        <CollegeCard
          key={college.id}
          college={college}
          handleSave={handleSave}
        />
      ))}
    </div>
  </div>
);
}
export default Home;
