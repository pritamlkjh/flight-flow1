import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

interface Deal {
  id: number;
  departureCity: string;
  arrivalCity: string;
  price: number;
  expiryTime: string;
}

const AdminDashboard = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    departureCity: "",
    arrivalCity: "",
    price: "",
    expiryTime: "",
  });

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleAdd = async () => {
    if (
      !form.departureCity ||
      !form.arrivalCity ||
      !form.price ||
      !form.expiryTime
    ) {
      alert("Please fill all fields before adding a deal.");
      return;
    }

    try {
      // datetime-local usually returns YYYY-MM-DDTHH:mm; append seconds for stricter backend parsers.
      const normalizedExpiry =
        form.expiryTime.length === 16
          ? `${form.expiryTime}:00`
          : form.expiryTime;

      await API.post("/deals", {
        ...form,
        price: Number(form.price),
        expiryTime: normalizedExpiry,
      });

      setForm({
        departureCity: "",
        arrivalCity: "",
        price: "",
        expiryTime: "",
      });
      fetchDeals();
    } catch (error) {
      alert("Failed to add deal. Please check date/time format and try again.");
    }
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/deals/${id}`);
    fetchDeals();
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
              Control Center
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-200/80">
              Add, track, and remove flight deals in real time.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-red-300/40 bg-red-500/15 px-4 py-2.5 text-sm font-semibold text-red-100 transition hover:bg-red-500/25"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="rounded-3xl border border-white/15 bg-slate-900/75 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-white">
          Add New Deal
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input
            placeholder="Departure City"
            value={form.departureCity}
            onChange={(e) =>
              setForm({ ...form, departureCity: e.target.value })
            }
            className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
          />

          <input
            placeholder="Arrival City"
            value={form.arrivalCity}
            onChange={(e) => setForm({ ...form, arrivalCity: e.target.value })}
            className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-brand-300 focus:outline-none"
          />

          <input
            type="datetime-local"
            value={form.expiryTime || ""}
            onChange={(e) => setForm({ ...form, expiryTime: e.target.value })}
            style={{ colorScheme: "dark" }}
            className="w-full rounded-xl border border-white/20 bg-slate-950/60 px-4 py-3 text-slate-100 focus:border-brand-300 focus:outline-none"
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-5 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
        >
          Add Deal
        </button>
      </div>

      <div className="rounded-3xl border border-white/15 bg-slate-900/75 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-white">
          All Deals
        </h2>

        {deals.length === 0 ? (
          <p className="mt-4 text-sm text-slate-300">No deals available.</p>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {deals.map((deal) => (
              <article
                key={deal.id}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-white">
                    {deal.departureCity}{" "}
                    <span className="text-brand-300">→</span> {deal.arrivalCity}
                  </h3>
                  <span className="text-xs text-slate-400">#{deal.id}</span>
                </div>

                <div className="space-y-1.5 text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-100">Price:</span>{" "}
                    ₹{deal.price}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">
                      Expires:
                    </span>{" "}
                    {new Date(deal.expiryTime).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(deal.id)}
                  className="mt-4 rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/25"
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
