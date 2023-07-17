import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/comp/Home';
import BookingView from '../src/comp/BookingView';
import AdminView from '../src/comp/AdminView';

export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/rent" element={<BookingView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
