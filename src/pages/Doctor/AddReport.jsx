import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AddReport = () => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [suffering, setSuffering] = useState("");
  const [medicine, setMedicine] = useState("");
  const [date, setDate] = useState("");

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const resetForm = () => {
    setPatientName("");
    setPhone("");
    setSuffering("");
    setMedicine("");
    setDate("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!patientName || !phone || !suffering || !medicine || !date) {
        return toast.error("All fields are required");
      }

      if (!/^\d{10}$/.test(phone)) {
        return toast.error("Phone number must be 10 digits");
      }

      const reportData = {
        patientName,
        phone,
        problems: suffering,
        medicine,
        date,
      };

      console.log("Submitting Report:", reportData);

      const { data } = await axios.post(
        `${backendUrl}/api/reports/add`,  // ✅ Correct endpoint
        reportData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message || "Report added successfully");
        resetForm();
      } else {
        toast.error(data.message || "Failed to add report");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error("AddReport Error:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Report</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-2xl flex flex-col gap-4 text-gray-600">
        
        <div className="flex flex-col gap-1">
          <p>Patient Name</p>
          <input
            onChange={(e) => setPatientName(e.target.value)}
            value={patientName}
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Phone No.</p>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="border rounded px-3 py-2"
            type="tel"
            placeholder="Enter 10-digit phone number"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Date</p>
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="border rounded px-3 py-2"
            type="date"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>Patient is suffering from</p>
          <textarea
            onChange={(e) => setSuffering(e.target.value)}
            value={suffering}
            className="w-full px-3 pt-2 border rounded"
            rows={3}
            placeholder="Describe patient's condition"
            required
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <p>Prescribed Medicine</p>
          <textarea
            onChange={(e) => setMedicine(e.target.value)}
            value={medicine}
            className="w-full px-3 pt-2 border rounded"
            rows={3}
            placeholder="List prescribed medicines"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 px-10 py-3 mt-2 text-white rounded-full self-start font-light hover:scale-105 transition-all"
        >
          Add Report
        </button>
      </div>
    </form>
  );
};

export default AddReport;
