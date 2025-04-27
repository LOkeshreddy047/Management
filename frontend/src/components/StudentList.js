import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://management-q91z.onrender.com/students"
      );
      const sortedStudents = response.data.sort((a, b) => {
        if (a.studentId < b.studentId) return -1;
        if (a.studentId > b.studentId) return 1;
        return 0;
      });
      setStudents(sortedStudents);
      setLoading(false);
    } catch (error) {
      alert("Error fetching students");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://management-q91z.onrender.com/students/${id}`);
        alert("Student deleted successfully");
        fetchStudents();
      } catch (error) {
        alert("Error deleting student");
      }
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>{calculateAge(student.dob)}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>
                  <button
                    onClick={() => navigate(`/edit-student/${student._id}`)}
                  >
                    Edit
                  </button>{" "}
                  <button onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
