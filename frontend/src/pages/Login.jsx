import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email, password
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    navigate(res.data.role === "admin" ? "/admin" : "/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Job Portal Login
        </h1>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
}
