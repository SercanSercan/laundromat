import React, {useEffect, useState} from 'react';
import './App.css';
import fire from './config/fire';
import {IBooking} from "./interfaces";

const collectionName = "gabelsGate1";

function App() {
  const [bookings, setBookings] = useState<IBooking[]>();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    let dbCollection = returnCollection(collectionName);
    const bookingArray: IBooking[] = [];
    dbCollection.orderBy("bookingDate", "asc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const tuple = doc.data();
        bookingArray.push(tuple as IBooking);
      });
    }).then(function() {
      console.log(bookingArray);
      setBookings(bookingArray);
    });
  };

  const returnCollection = (collectionName: string) => {
    const db = fire.firestore();
    return db.collection(collectionName);
  };

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
