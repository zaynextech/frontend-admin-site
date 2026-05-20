import { useEffect, useState } from "react";
import axios from "axios";
import {
  Globe,
  Trash2,
  Edit2,
  CheckCircle2,
} from "lucide-react";
import { COUNTRIES } from "../constants/countries";
import ConfirmModal from "../components/ui/ConfirmModal";

interface GlobalPresence {
  id: string;
  countryName: string;
  countryCode: string;
  clientCount: string;
  active: boolean;
}



const emptyForm = {
  countryName: "",
  countryCode: "",
  clientCount: "",
  active: true,
};

const GlobalManager = () => {
  const [globals, setGlobals] = useState<GlobalPresence[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  const fetchGlobals = async () => {
    try {
   const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/global`
      );

      setGlobals(res.data.globals);
    } catch {
      console.log("Failed to fetch globals");
    }
  };

useEffect(() => {
  const loadGlobals = async () => {
    await fetchGlobals();
  };

  loadGlobals();
}, []);
  const submitGlobal = async () => {
   try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/global/${editingId}`,
          form
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/global`,
          form
        );
      }

      setForm(emptyForm);
      setEditingId(null);

      fetchGlobals();
    } catch {
      console.log("Failed");
    }
  };

  const deleteGlobal = async (id: string) => {
    const confirmed =
  await ConfirmModal({
    title: "Delete Region?",
    text:
      "This action cannot be undone.",
    confirmText:
      "Yes, delete",
  });

if (!confirmed) {
  return;
}

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/global/${id}`
    );

    fetchGlobals();
  };

  const editGlobal = (item: GlobalPresence) => {
    setEditingId(item.id);

    setForm({
      countryName: item.countryName,
      countryCode: item.countryCode,
      clientCount: item.clientCount,
      active: item.active,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#030303] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Global Presence CMS
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage countries displayed on the homepage map.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* FORM */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6">

              <div className="mb-6 flex items-center gap-2">
                <Globe className="text-cyan-400" size={18} />

                <h2 className="text-lg font-semibold">
                  {editingId
                    ? "Edit Country"
                    : "Add Country"}
                </h2>
              </div>

              {/* Country */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-zinc-400">
                  Country
                </label>

                <select
                  value={form.countryName}
                  onChange={(e) => {
                    const selected = COUNTRIES.find(
                      (c) => c.name === e.target.value
                    );

                    setForm({
                      ...form,
                      countryName: selected?.name || "",
                      countryCode: selected?.code || "",
                    });
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none"
                >
                  <option value="">
                    Select Country
                  </option>

                  {COUNTRIES.map((country) => (
                    <option
                      key={country.code}
                      value={country.name}
                    >
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clients */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-zinc-400">
                  Client Count
                </label>

                <input
                  type="text"
                  placeholder="e.g. 12+ Clients"
                  value={form.clientCount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      clientCount: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none"
                />
              </div>

              {/* Active */}
              <div className="mb-8 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      active: e.target.checked,
                    })
                  }
                />

                <span className="text-sm text-zinc-300">
                  Active on Website
                </span>
              </div>

              {/* Submit */}
              <button
                onClick={submitGlobal}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                <CheckCircle2 size={16} />

                {editingId
                  ? "Update Region"
                  : "Add Region"}
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6">

              <h2 className="mb-6 text-lg font-semibold">
                Active Regions
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {globals.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/5 bg-black/40 p-5"
                  >
                    {/* Top */}
                    <div className="flex items-center gap-3">

                      <img
                        src={`https://flagcdn.com/w40/${item.countryCode}.png`}
                        alt={item.countryName}
                        className="h-6 w-9 rounded-md object-cover"
                      />

                      <div>
                        <h3 className="text-sm font-semibold">
                          {item.countryName}
                        </h3>

                        <p className="text-xs text-zinc-500">
                          {item.clientCount}
                        </p>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                          item.active
                            ? "text-emerald-400"
                            : "text-zinc-600"
                        }`}
                      >
                        {item.active
                          ? "Live"
                          : "Disabled"}
                      </span>

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            editGlobal(item)
                          }
                          className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          onClick={() =>
                            deleteGlobal(item.id)
                          }
                          className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GlobalManager;