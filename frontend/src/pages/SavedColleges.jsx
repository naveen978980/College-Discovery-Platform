import React, { useEffect, useState } from "react";
import api from "../services/api";

function SavedColleges() {
  const [savedColleges, setSavedColleges] = useState([]);

  useEffect(() => {
    fetchSavedColleges();
  }, []);

  const fetchSavedColleges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await api.get("/saved-colleges", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedColleges(response.data);
    } catch (error) {
      console.error("Error fetching saved colleges:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
        await api.delete(`/saved-colleges/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setSavedColleges(savedColleges.filter((item) => item.id !== id));
        alert("Saved college removed");
    } catch (error) {
        console.error("Error deleting saved college:", error);
    }
  };
  return (
  <div className="h-[calc(100vh-100px)] p-6 bg-gradient-to-t from-blue-500 to-white">

    {savedColleges.length === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-9xl mb-4">
          🎓
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          No Saved Colleges
        </h2>

        <p className="text-gray-500 mt-3 text-lg">
          Start exploring and save your favorite colleges.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          🔍 Explore Colleges
        </button>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedColleges.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-bold">
              {item.college.name}
            </h3>

            <p className="text-gray-600 mt-2">
              📍 {item.college.location}
            </p>

            <p className="mt-2">
              💰 Fees: ₹{item.college.fees}
            </p>

            <p className="mt-2">
              ⭐ Rating: {item.college.rating}
            </p>

            <button
              onClick={() => handleDelete(item.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
export default SavedColleges;