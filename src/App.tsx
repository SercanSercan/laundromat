import React, {useEffect, useState} from 'react';
import './App.scss';
import { DatePicker } from '@fremtind/jkl-datepicker-react';
import "@fremtind/jkl-datepicker/datepicker.min.css";
import "@fremtind/jkl-icon-button/icon-button.min.css";
import { TextInput } from '@fremtind/jkl-text-input-react';
import "@fremtind/jkl-text-input/text-input.min.css";
import fire from './config/fire';
import { BOOKING_TIMES, IBooking } from "./interfaces";

const collectionName = "gabelsGate1";
const numOfDays = 10;

function App() {
  const [bookings, setBookings] = useState<IBooking[]>();
  let initialDate = new Date(new Date().setHours(0,0,0,0));

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
      setBookings(bookingArray);
    });
  };

  const returnCollection = (collectionName: string) => {
    const db = fire.firestore();
    return db.collection(collectionName);
  };

  const renderBookingGrid = () => {
      const rows: JSX.Element[] = [];
      let currentDate = initialDate;
      rows.push(renderHeader());
      for (let i = 0; i < numOfDays; i++) {
          rows.push(
              <>
                  <div className={"bookingGrid-row__dateCell"}>{formatDate(currentDate)}</div>
                  <div className={"bookingGrid-row__bookingCell"}>{findBookedPerson(currentDate, BOOKING_TIMES.SEVEN_ELEVEN)}</div>
                  <div className={"bookingGrid-row__bookingCell"}>{findBookedPerson(currentDate, BOOKING_TIMES.ELEVEN_FIFTEEN)}</div>
                  <div className={"bookingGrid-row__bookingCell"}>{findBookedPerson(currentDate, BOOKING_TIMES.FIFTEEN_NINETEEN)}</div>
                  <div className={"bookingGrid-row__bookingCell"}>{findBookedPerson(currentDate, BOOKING_TIMES.NINETEEN_TWENTYTHREE)}</div>
              </>
          );
          currentDate.setDate(currentDate.getDate() + 1);
      }

      return (
        <div className="bookingGrid">
          {rows}
        </div>
      );
  };

  const renderHeader = () => {
      return (
          <>
              <div className={"bookingGrid-row__dateCell"}>&nbsp;</div>
              <div className={"bookingGrid-row__bookingCell"}>{BOOKING_TIMES.SEVEN_ELEVEN}</div>
              <div className={"bookingGrid-row__bookingCell"}>{BOOKING_TIMES.ELEVEN_FIFTEEN}</div>
              <div className={"bookingGrid-row__bookingCell"}>{BOOKING_TIMES.FIFTEEN_NINETEEN}</div>
              <div className={"bookingGrid-row__bookingCell"}>{BOOKING_TIMES.NINETEEN_TWENTYTHREE}</div>
          </>
      );
  };

  const findBookedPerson = (currentDate: Date, time: string): JSX.Element => {
    let selectedValue = "";
    if (bookings) {
        for (let i = 0; i < bookings.length; i++) {
            const registeredDate = new Date(bookings[i].bookingDate.seconds * 1000);
            if (currentDate.toString() === registeredDate.toString() && time === bookings[i].bookingTime) {
                selectedValue = bookings[i].name;
            }
        }
    }
    return (
        <TextInput
            label={""}
            onBlur={(e) => {
                console.log(e.target.value);
            }}
            value={selectedValue}
            maxLength={20}
        />
    );
  };

  const formatDate = (date: Date): string => {
      const mo = new Intl.DateTimeFormat('no', { month: 'short' }).format(date);
      const da = new Intl.DateTimeFormat('no', { day: '2-digit' }).format(date);
      return da + " " + mo;
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
