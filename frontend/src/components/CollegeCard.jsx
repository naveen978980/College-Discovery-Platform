function CollegeCard({ college , handleSave}){
    console.log("handleSave =", handleSave);
  return (
     <div className="bg-white rounded-lg shadow-md p-5 m-4">
      <h2 className="text-gray-800 text-xl font-bold">{college.name}</h2>
      <p>LOCATION :{college.location}</p>
      <p>FEES :{college.fees}</p>
      <p>RATING :{college.rating}</p>
      <button
  onClick={() => {
    console.log("handleSave:", handleSave);
    if (handleSave) {
      handleSave(college.id);
    } else {
      alert("handleSave is undefined");
    }
  }}
  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
   Save College
</button>
    </div>
  );
}

export default CollegeCard;