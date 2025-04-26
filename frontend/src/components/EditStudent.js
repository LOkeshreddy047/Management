import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState({
    rollNumber: "",
    name: "",
    age: "",
    email: "",
    course: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `https://management-q91z.onrender.com/students/${id}`
        );
        setStudent({
          rollNumber: response.data.rollNumber,
          name: response.data.name,
          age: response.data.age,
          email: response.data.email,
          course: response.data.course,
        });
      } catch (error) {
        alert("Error fetching student data");
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !student.rollNumber ||
      !student.name ||
      !student.age ||
      !student.email ||
      !student.course
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (!/^\d{12}$/.test(student.rollNumber)) {
      alert("Roll number must be exactly 12 digits");
      return;
    }
    if (!student.email.endsWith("@cbit.org.in")) {
      alert("Email must be a @cbit.org.in address");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/students/${id}`, {
        rollNumber: student.rollNumber,
        name: student.name,
        age: Number(student.age),
        email: student.email,
        course: student.course,
      });
      alert("Student updated successfully");
      navigate("/students");
    } catch (error) {
      alert("Error updating student");
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Roll Number: </label>
          <input
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Name: </label>
          <input name="name" value={student.name} onChange={handleChange} />
        </div>
        <div>
          <label>Age: </label>
          <input
            name="age"
            type="number"
            value={student.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            name="email"
            type="email"
            value={student.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Course: </label>
          <input name="course" value={student.course} onChange={handleChange} />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
