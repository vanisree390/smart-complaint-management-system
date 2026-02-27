import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    //e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
  <h2>Login</h2>
  <form onSubmit={handleLogin} autoComplete="off">
    <input
      type="email"
      placeholder="Email"
      value={form.email} // controlled input
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      autoComplete="off"
    />

    <input
      type="password"
      placeholder="Password"
      value={form.password} // controlled input
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      autoComplete="new-password"
    />

    <button type="submit">Login</button>
  </form>
</div>
  );
};

export default Login;