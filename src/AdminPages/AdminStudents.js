import React, { useState, useEffect } from 'react';
import './PageAssets/page-styles.css';

export function AdminStudents() {
  const [students, setStudents] = useState([]);

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

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <h1 className='hh-greet'>WELCOME ADMIN!</h1>
      </div>

      <div className='aHome-container'>
        {/* Display students in a table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              {/* Add more columns as needed */}
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
                <td>{student.isAdmin}</td>
                <td>{student.isDeleted}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
