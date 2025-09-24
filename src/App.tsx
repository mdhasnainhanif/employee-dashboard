import './App.css'
import Card from './components/ProfileCard/ProfileCard'
import employeeProfile from './data/employeeProfile.json'
import attendanceData from './data/attendance.json'
import performanceData from './data/performanceReviews.json'
import Header from './components/Header/Header'
import Table, { type Column } from './components/Table/Table'
import type { AttendanceRecord, Employee } from './types'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import PerformanceReviewSection from './components/PerformanceReview/PerformanceReviewSection'


function App() {
  const [employee, setEmployee] = useState<Employee>(employeeProfile);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const columns: Column<AttendanceRecord>[] = [
    { key: "date", label: "Date" },
    { key: "checkIn", label: "Check-in" },
    { key: "checkOut", label: "Check-out" },
    {
      key: "totalMinutes",
      label: "Total Hours",
      format: (val: number) =>
        val > 0 ? `${Math.floor(val / 60)}h ${val % 60}m` : "-",
    },
    {
      key: "status",
      label: "Status",
      format: (val: "present" | "absent" | "weekend") => (
        <span
          className={`px-2 py-1 rounded text-xs min-w-4xl ${val === "present"
            ? "bg-green-100 text-green-700"
            : val === "absent"
              ? "bg-red-100 text-red-700"
              : "bg-gray-200 text-gray-700"
            }`}
        >
          {val}
        </span>
      ),
    },
  ];


  const filteredData = (attendanceData as AttendanceRecord[]).filter((row) => {
    const matchesSearch =
      row.date.includes(search) ||
      row.status.toLowerCase().includes(search.toLowerCase());

    const isLate =
      row.status === "present" &&   
      row.checkIn !== null &&
      row.checkIn > "09:15";

    const matchesFilter =
      statusFilter === "all"
        ? true
        : statusFilter === "late"
          ? isLate
          : row.status === statusFilter;

    return matchesSearch && matchesFilter;
  });


  const handleUpdate = (updated: Employee) => {
    setEmployee(updated);
    toast.success("Profile updated successfully!");
  };



  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <section className='py-8'>
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <Card employee={employee} onUpdate={handleUpdate} />
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="flex gap-4 mb-4 ms-auto w-max">
                <input
                  type="text"
                  placeholder="Search date or status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 py-2 rounded"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="border px-3 py-2 rounded bg-zinc-800"
                >
                  <option value="all">All</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="weekend">Weekend</option>
                  <option value="late">Late</option>
                </select>
              </div>
              <Table<AttendanceRecord> data={filteredData} columns={columns} />
            </div>
          </div>
          <PerformanceReviewSection reviews={performanceData} />
          </div>
      </section>
    </>
  )
}

export default App
