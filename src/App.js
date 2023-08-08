import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Bookings from './Bookings';
import Addevent from './Addevent';
import './App.css';
import Events from './Events';
import EventDetailsPage from './EventDetailsPage';
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., validate credentials with an API)
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <Router>
      <div className="container-fluid h-100">
        {!loggedIn ? (
          <div className="login-container d-flex justify-content-center align-items-center h-100" style={{ marginTop: '120px' }}>
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">Login</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                  <div className="form-group mb-4">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-3">
              <Sidebar handleLogout={handleLogout} />
            </div>
            <div className="col-9">
              <Routes>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/add-event" element={<Addevent />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:recId" element={<EventDetailsPage />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
