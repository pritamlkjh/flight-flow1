import { useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

interface Booking {
  id: number;
  phoneNumber: string;
  bookingTime: string;
  deal: {
    departureCity: string;
    arrivalCity: string;
    price: number;
  };
}

const MyBookings = () => {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/booking/phone/${phone}`);
      setBookings(res.data);
    } catch (err) {
      alert("Error fetching bookings");
    }
  };

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Bookings</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">My Bookings</h1>
            <p className="mt-2 text-sm text-slate-200/80">Search reservations linked to your phone number.</p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            Back To Deals
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
          />
          <button
            onClick={fetchBookings}
            className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Get Bookings
          </button>
        </div>
      </header>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/70 p-8 text-center text-slate-300">
          No bookings found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {bookings.map((b) => (
            <article key={b.id} className="rounded-2xl border border-white/10 bg-slate-900/75 p-5">
              <h3 className="font-display text-xl font-semibold text-white">
                {b.deal.departureCity} <span className="text-brand-300">→</span> {b.deal.arrivalCity}
              </h3>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>
                  <span className="font-semibold text-slate-100">Price:</span> ₹{b.deal.price}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">Booked:</span>{" "}
                  {new Date(b.bookingTime).toLocaleString()}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookings;