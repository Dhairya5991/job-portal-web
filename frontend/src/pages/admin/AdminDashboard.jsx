import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/applications", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setApplications(res.data.data || res.data));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://localhost:5000/api/applications/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  const downloadResume = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/applications/${id}/resume`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.open(res.data.url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Admin Dashboard" onLogout={logout} />

      <div className="p-4 max-w-6xl mx-auto space-y-4">
        {applications.map(app => (
          <div key={app._id} className="bg-white p-5 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="font-semibold">{app.jobTitle}</h2>
              <p className="text-sm text-gray-500">{app.userEmail}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={app.status}
                onChange={e => updateStatus(app._id, e.target.value)}
                className="border rounded-lg p-2"
              >
                <option>APPLIED</option>
                <option>REVIEWED</option>
                <option>SHORTLISTED</option>
                <option>REJECTED</option>
              </select>

              <button
                onClick={() => downloadResume(app._id)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                Resume
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
