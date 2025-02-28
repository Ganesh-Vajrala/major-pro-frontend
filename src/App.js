import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import AmazonAnalysis from './components/AmazonAnalysis';

function App() {
  return (
    
    <Router>
      
      <Routes> 
        
        <Route path="/" element={<Home />} />
        <Route path="/analysis/amazon" element={<AmazonAnalysis/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;