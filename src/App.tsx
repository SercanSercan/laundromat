import React, {useEffect, useState} from 'react';
import './App.css';
import { Card } from '@fremtind/jkl-card-react';
import { DatePicker } from '@fremtind/jkl-datepicker-react';
import "@fremtind/jkl-datepicker/datepicker.min.css";
import "@fremtind/jkl-icon-button/icon-button.min.css";
import fire from './config/fire';
import { IBooking } from "./interfaces";

const collectionName = "gabelsGate1";
const numOfDays = 10;

function App() {
  const [bookings, setBookings] = useState<IBooking[]>();
  const [initialDate, setInitialDate] = useState<Date>(new Date());

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
      <header>
      </header>
      <main>
        <section className="bookingPanel">
          <div className="bookingPanel-row">
            <DatePicker
                label={""}
                helpLabel={"Set initial date"}
                initialDate={initialDate}
                onBlur={(date) => {
                  console.log(date);
                }}
                extended
                placeholder={"placeholder"}
            />
          </div>
          <div className="bookingPanel-row">
            <Card className="bookingGrid"></Card>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
