import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { Link } from "react-router-dom";

const Booking = () => {
  const { dealId } = useParams();
  const [phone, setPhone] = useState("");

  const handleBooking = async () => {
    try {
      await API.post(`/booking/${dealId}?phone=${phone}`);
      alert("✅ Booking successful!");
    } catch (err) {
      alert("❌ Booking failed!");
    }
  };

  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Booking</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">Book Flight</h1>
        <p className="mt-2 text-sm text-slate-200/80">
          Confirm your seat for deal <span className="font-semibold text-white">#{dealId}</span>.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-200" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
          />

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              onClick={handleBooking}
              className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Confirm Booking
            </button>
            <Link
              to="/"
              className="rounded-xl border border-white/25 px-5 py-3 text-center text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Back To Deals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;