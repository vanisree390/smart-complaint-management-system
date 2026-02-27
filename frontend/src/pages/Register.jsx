import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    //e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered Successfully");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container">
  <h2>Register</h2>
  <form onSubmit={handleRegister} autoComplete="off">
    <input
      type="text"
      placeholder="Name"
      value={form.name} // controlled input
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      autoComplete="off"
    />

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

    <button type="submit">Register</button>
  </form>
</div>
  );
};

export default Register;