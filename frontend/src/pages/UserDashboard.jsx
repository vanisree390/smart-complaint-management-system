import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch User Complaints
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints/my", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log("Failed to fetch complaints");
        return;
      }

      const data = await res.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchComplaints();
    }
  }, []);

  // Submit New Complaint
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        console.log("Complaint submission failed");
        return;
      }

      setTitle("");
      setDescription("");
      fetchComplaints();
    } catch (error) {
      console.log("Error submitting complaint:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Dashboard</h2>

      <form onSubmit={submit} style={{ marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ marginRight: "10px" }}
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={{ marginRight: "10px" }}
        />

        <button type="submit">Submit</button>
      </form>

      {complaints.length === 0 && <p>No complaints yet.</p>}

      {complaints.map((c) => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
            background:
              c.status === "Seen"
                ? "#f8d7da"
                : c.status === "Working"
                ? "#fff3cd"
                : "#d4edda",
          }}
        >
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <b>Status: {c.status}</b>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;