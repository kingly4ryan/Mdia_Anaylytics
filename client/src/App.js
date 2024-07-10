import React from 'react';
import './App.css';
import Segmentation from './components/Segmentation';
import Performance from './components/Performance';
import Churn from './components/Churn';

function App() {
  return (
    <div className="App">
      <h1>Media Analytics Dashboard</h1>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      <Segmentation />
      <Performance />
      <Churn />
    </div>
  );
}

export default App;
