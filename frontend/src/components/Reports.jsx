import { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      {reports.map((report, i) => (
        <div key={i} className="bg-gray-800 text-white p-4 mb-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">{report.name}</h3>
          <p>Credit Score: {report.creditScore}</p>
          <p>Mobile: {report.mobilePhone}</p>
        </div>
      ))}
    </div>
  );
};

export default Reports;
