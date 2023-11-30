import React, { useState, useEffect } from 'react';
import './PageAssets/page-styles.css';
import AdminADDStudent from './AdminADDStudent'; // Assuming you have a separate component for the form

export function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/student/getAllStudents');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudentClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <h1 className='hh-greet'>WELCOME ADMIN!</h1>
      </div>

      <div className='aHome-container'>
        <button onClick={handleAddStudentClick}>Add New Student</button>

        {/* Display students in a table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>admin</th>
              <th>isDeleted</th>
              {/* Add more columns as needed */}
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.username}</td>
                <td>{student.fname}</td>
                <td>{student.lname}</td>
                <td>{student.email}</td>
                <td>{student.password}</td>
                <td>{String(student.admin)}</td>
                <td>{student.isDeleted}</td>
                {/* Add more columns as needed */}
                <td>
                  <button>Update</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display the form conditionally */}
        {showForm && <AdminADDStudent onClose={handleFormClose} />}
      </div>
    </div>
  );
}

