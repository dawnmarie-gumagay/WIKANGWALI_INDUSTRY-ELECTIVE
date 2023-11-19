import './App.css';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

function App() {
  return (
    <div className="logged-in">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Love+Ya+Like+A+Sister&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" />
      </head>
      <LoggedIn/>
      <h1>GIT pract</h1>
      <LoggedOut/>
    </div>
  );
}

export default App;
