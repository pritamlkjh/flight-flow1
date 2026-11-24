export interface Deal {
  id: number;
  departureCity: string;
  arrivalCity: string;
  price: number;
  expiryTime: string;
}

export interface Booking {
  id: number;
  phoneNumber: string;
  bookingTime: string;
}