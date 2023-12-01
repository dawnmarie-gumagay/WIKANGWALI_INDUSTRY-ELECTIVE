import React, { useState, useEffect } from 'react';
import './PageAssets/page-styles.css';
import AdminADDStudent from './AdminADDStudent';
import AdminUPDATEStudent from './AdminUPDATEStudent';
import AdminDELETEStudent from './AdminDELETEStudent';

export function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/student/getAllStudents');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleAddStudentClick = () => {
    setShowAddForm(true);
  };

  const handleUpdateStudentClick = (student) => {
    setSelectedStudent(student);
    setShowUpdateForm(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowDeleteConfirmation(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setShowDeleteConfirmation(false);
    setSelectedStudent(null);

    // Refresh the form by fetching the updated data
    fetchStudents();
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
                  <button onClick={() => handleUpdateStudentClick(student)}>Update</button>
                  <button onClick={() => handleDeleteClick(student)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display the forms conditionally */}
        {showAddForm && <AdminADDStudent onAddStudent={handleAddStudent} onClose={handleFormClose} />}
        {showUpdateForm && <AdminUPDATEStudent onUpdateStudent={handleAddStudent} onClose={handleFormClose} initialData={selectedStudent} />}
        {showDeleteConfirmation && (
          <AdminDELETEStudent onClose={handleFormClose} onDelete={handleAddStudent} selectedStudent={selectedStudent} />
        )}
      </div>
    </div>
  );
}