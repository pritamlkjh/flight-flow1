import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "pwd") {
      localStorage.setItem("admin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <section className="mx-auto max-w-md">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-glow backdrop-blur-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Admin Access</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-200/80">Sign in to manage deals and monitor inventory.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Login To Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;