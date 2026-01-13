import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function UserDashboard() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/applications/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setApplications(res.data));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const badge = (status) => {
    const map = {
      APPLIED: "bg-gray-200 text-gray-700",
      REVIEWED: "bg-blue-100 text-blue-700",
      SHORTLISTED: "bg-green-100 text-green-700",
      REJECTED: "bg-red-100 text-red-700"
    };
    return map[status];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="User Dashboard" onLogout={logout} />

      <div className="p-4 max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map(app => (
          <div key={app._id} className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-2">{app.jobTitle}</h2>
            <span className={`px-3 py-1 text-sm rounded-full ${badge(app.status)}`}>
              {app.status}
            </span>
            <p className="text-xs text-gray-400 mt-3">
              Applied on {new Date(app.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
