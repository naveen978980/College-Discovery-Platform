import {useState} from 'react';
import api from "../services/api";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", { name, email, password });
            console.log("Registration response:", response.data);
            // Handle successful registration (e.g., redirect to login)
        } catch (error) {
            console.error("Registration error:", error);
            console.log(error.response?.data);
        }   };
    return (
  <div className="h-[calc(100vh-100px)] bg-gradient-to-t from-blue-500 to-white flex items-center justify-center">
  <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

    <h2 className="text-4xl font-bold text-center mb-6">
      Create Account 🚀
    </h2>

    <p className="text-center text-gray-500 mb-6">
      Join College Discovery
    </p>


      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  </div>
);
}

export default Register;