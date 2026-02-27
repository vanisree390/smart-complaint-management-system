import React from "react";

const ComplaintCard = ({ complaint, isAdmin, onStatusChange }) => {

  const getStatusClass = () => {
    if (complaint.status === "Seen") return "status-seen";
    if (complaint.status === "Dept Working") return "status-working";
    if (complaint.status === "Finished") return "status-finished";
  };

  const getProgressWidth = () => {
    if (complaint.status === "Seen") return "33%";
    if (complaint.status === "Dept Working") return "66%";
    if (complaint.status === "Finished") return "100%";
  };

  return (
    <div className="complaint-card">
      <div className="card-header">
        <h3>{complaint.title}</h3>
        <span className={`status-badge ${getStatusClass()}`}>
          {complaint.status}
        </span>
      </div>

      <p className="description">{complaint.description}</p>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: getProgressWidth() }}
        ></div>
      </div>

      <div className="card-footer">
        <small>
          Submitted by: {complaint.user?.name}
        </small>

        {isAdmin && (
          <select
            value={complaint.status}
            onChange={(e) =>
              onStatusChange(complaint._id, e.target.value)
            }
          >
            <option value="Seen">Seen</option>
            <option value="Dept Working">Dept Working</option>
            <option value="Finished">Finished</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;