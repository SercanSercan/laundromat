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
  let initialDate = new Date();

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
      //console.log(bookingArray);
      setBookings(bookingArray);
    });
  };

  const returnCollection = (collectionName: string) => {
    const db = fire.firestore();
    return db.collection(collectionName);
  };

  const renderBookingGrid = () => {
    const rows:JSX.Element[] = [];
      console.log("initialDate", initialDate);
    let currentDate = initialDate;
    for (let i = 0; i < numOfDays; i++) {
      rows.push(
          <div className={"bookingGrid-row"}>
            <div className={"bookingGrid-row__dateCell"}>{formatDate(currentDate)}</div>
            <div className={"bookingGrid-row__bookingCell"}></div>
            <div className={"bookingGrid-row__bookingCell"}></div>
            <div className={"bookingGrid-row__bookingCell"}></div>
            <div className={"bookingGrid-row__bookingCell"}></div>
          </div>
      );
      currentDate.setDate(currentDate.getDate() + 1);
      //console.log("currentDate", currentDate);
    }

    return (
        <Card className="bookingGrid">
          {rows}
        </Card>
    );
  };

  const formatDate = (date: Date): string => {
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      return mo + " " + da;
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
                onBlur={(date) => {
                  console.log(date);
                }}
                extended
                placeholder={"placeholder"}
            />
          </div>
          <div className="bookingPanel-row">
            {renderBookingGrid()}
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
