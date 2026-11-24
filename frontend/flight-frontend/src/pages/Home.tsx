import { useEffect, useState } from "react";
import API from "../api/api";
import type { Deal } from "../types/types";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/deals").then((res) => setDeals(res.data));
  }, []);

  return (
    <section className="space-y-8">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-glow backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="inline-flex rounded-full border border-brand-300/40 bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
              Limited Time Offers
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Special Flight Deals
            </h1>
            <p className="max-w-2xl text-sm text-slate-200/80 sm:text-base">
              Find discounted routes before they expire and lock your next trip
              in seconds.
            </p>
          </div>

          <button
            onClick={() => navigate("/my-bookings")}
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View My Bookings
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/25"
          >
            Go To Admin Page
          </button>
        </div>
      </header>

      {deals.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-10 text-center text-slate-300 backdrop-blur">
          No active deals available right now. Please check again shortly.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="group rounded-2xl border border-white/10 bg-slate-900/75 p-5 transition hover:-translate-y-0.5 hover:border-brand-300/60 hover:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                  Available
                </span>
                <span className="text-xs text-slate-400">Deal #{deal.id}</span>
              </div>

              <h3 className="font-display text-xl font-semibold text-white">
                {deal.departureCity} <span className="text-brand-300">→</span>{" "}
                {deal.arrivalCity}
              </h3>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>
                  <span className="font-semibold text-slate-100">Price:</span> ₹
                  {deal.price}
                </p>
                <p>
                  <span className="font-semibold text-slate-100">Expires:</span>{" "}
                  {new Date(deal.expiryTime).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => navigate(`/book/${deal.id}`)}
                className="mt-5 w-full rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
              >
                Book Now
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
