import { useState } from 'react'
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log("Login response:", response.data);
            // Handle successful login (e.g., store token, redirect)
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            // Handle login error (e.g., show error message)
        }   };
    return (
  <div className="h-[calc(100vh-100px)] bg-gradient-to-t from-blue-500 to-white flex items-center justify-center">
  <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">

    <h2 className="text-4xl font-bold text-center mb-6">
      Welcome Back 👋
    </h2>

    <p className="text-center text-gray-500 mb-6">
      Login to continue
    </p>

      <form onSubmit={handleLogin}>
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
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;