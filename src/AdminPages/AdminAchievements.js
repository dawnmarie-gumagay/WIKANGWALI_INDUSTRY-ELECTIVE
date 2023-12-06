import React, { useState, useEffect } from 'react';
import './PageAssets/page-styles.css';

export function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('http://localhost:8080/achievement/getAllAchievements');
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className='hh-container'>
        <h1 className='hh-greet'>Achievement Dashboard</h1>
      </div>

      <div className='aHome-container'>

        {/* Display achievements in a table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              {/* Add more columns as needed */}
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((achievement) => (
              <tr key={achievement.achievement_id}>
                <td>{achievement.achievement_id}</td>
                <td>{achievement.achievement_name}</td>
                <td>{achievement.achievement_desc}</td>
                {/* Add more columns as needed */}
                <td>
                  <button >Update</button>
                  <button >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}