import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);  // New state for error handling

  // Fetch all complaints from the backend for admin
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Handle non-OK response (like unauthorized or server errors)
      if (!res.ok) {
        throw new Error("Failed to fetch complaints.");
      }

      const data = await res.json();
      setComplaints(data);  // Update complaints state
    } catch (err) {
      setError(err.message);  // Set error message
      console.error(err);      // Log error for debugging
    }
  };

  // Fetch complaints once the component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update status of a complaint
  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status })
      });

      fetchComplaints(); // Re-fetch complaints after status update
    } catch (err) {
      setError(err.message); // Set error message if update fails
      console.error(err);     // Log error for debugging
    }
  };

  return (
    <>
      <h2>Admin Dashboard</h2>

      {/* Show error message if something goes wrong */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* If complaints exist, map through them */}
      {complaints.length > 0 ? (
        complaints.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid",
              margin: "10px",
              padding: "10px"
            }}
          >
            <h4>{c.title}</h4>
            <p>{c.description}</p>

            <b>Status: {c.status}</b>
            <br /><br />

            {/* Buttons to update status */}
            <button onClick={() => updateStatus(c._id, "Seen")}>
              Mark Seen
            </button>
            <button onClick={() => updateStatus(c._id, "Working")}>
              Mark Working
            </button>
            <button onClick={() => updateStatus(c._id, "Completed")}>
              Mark Completed
            </button>
          </div>
        ))
      ) : (
        <p>No complaints found.</p>  // If no complaints available
      )}
    </>
  );
};

export default AdminDashboard;