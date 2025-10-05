import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Login failed");

      const role = data?.role || "user";
      const redirect = data?.redirect || (role === "admin" ? "/admin" : "/");
      navigate(redirect, { replace: true });
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white via-pink-50 to-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F86D72]"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />

          <input
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F86D72]"
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm((s) => ({ ...s, password: e.target.value }))
            }
          />

          {err && (
            <p className="bg-[#FDE2E4] text-[#D12B3D] text-center text-sm py-2 rounded-md">
              {err}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-[#F86D72] hover:bg-[#e25b60] transition-all duration-300 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#F86D72] font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
