import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AdminADDStudent = ({ onAddStudent, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    password: '',
    email: '',
    admin: false, // Assuming the default value for admin is false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/student/insertStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newStudent = await response.json();
        // Pass the new student data to the parent component
        onAddStudent(newStudent);
        // Close the form
        onClose();
        // Reset the form inputs
        setFormData({
          username: '',
          fname: '',
          lname: '',
          password: '',
          email: '',
          admin: false,
        });
      } else {
        console.error('Failed to add new student:', response.statusText);
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error adding new student:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose}>Close</button>
        {/* Pop-up form */}
        <h1>ADD NEW STUDENT</h1>
        <form onSubmit={handleSubmit}>
          <label> Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          <br/>
          <label>First Name: </label>
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />
          <br/>
          <label>Last Name:</label>
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />
          <br/>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <br/>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <br/>
          <label>Admin:</label>
          <input type="checkbox" name="admin" checked={formData.admin} onChange={handleChange} />
          <br/><br/>
          <button type="submit">Add Student</button>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
AdminADDStudent.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminADDStudent;
