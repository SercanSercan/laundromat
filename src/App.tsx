import React from 'react';
import './App.css';
import fire from './config/fire';

const collectionName = "gabelsGate1";

function App() {

  const loadBookings = () => {
    let dbCollection = returnCollection(collectionName);
    console.log(dbCollection);
  };

  const returnCollection = (collectionName: string) => {
    const db = fire.firestore();
    return db.collection(collectionName);
  };

  loadBookings();

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
