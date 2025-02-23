import { LandPlot } from 'lucide-react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function Home() {
  return <div className="text-center text-blue-500 p-4">Home Page</div>;
}

function About() {
  return <div className="text-center text-blue-500 p-4">About Page</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;