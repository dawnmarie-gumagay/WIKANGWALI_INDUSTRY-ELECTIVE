import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AdminUPDATEStudent = ({ onUpdateStudent, onClose, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    username: '',
    fname: '',
    lname: '',
    password: '',
    email: '',
    admin: false,
  });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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
      const response = await fetch(`http://localhost:8080/student/updateStudent?username=${formData.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        // Pass the updated student data to the parent component
        onUpdateStudent(updatedStudent);
        // Close the form
        onClose();
        // Reset the form inputs
        setFormData({
          fname: '',
          lname: '',
          password: '',
          email: '',
        });

        // Show an alert message
        window.alert('Student updated successfully!');
      } else {
        console.error('Failed to update student:', response.statusText);
        // Handle the error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose}>Close</button>
        {/* Pop-up form */}
        <h1>UPDATE STUDENT</h1>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} readOnly />
          <br />
          <label>First Name:</label>
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />
          <br />
          <label>Last Name:</label>
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <br />
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <br />
          <br /><br />
          <button type="submit">Update Student</button>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
AdminUPDATEStudent.propTypes = {
  onUpdateStudent: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default AdminUPDATEStudent;
