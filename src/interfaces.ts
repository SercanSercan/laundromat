export interface IBooking {
    bookingDate: {
        seconds: number;
        nanoseconds: number;
    };
    bookingTime: string;
    logDate: {
        seconds: number;
        nanoseconds: number;
    };
    name: string;
}

export enum BOOKING_TIMES {
    SEVEN_ELEVEN = "07:00 - 11:00",
    ELEVEN_FIFTEEN = "11:00 - 15:00",
    FIFTEEN_NINETEEN = "15:00 - 19:00",
    NINETEEN_TWENTYTHREE = "19:00 - 23:00"
}