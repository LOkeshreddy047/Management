import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import './App.css';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/students">Student List</Link>
        <Link to="/add-student">Add Student</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
