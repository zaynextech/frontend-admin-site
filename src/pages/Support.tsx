import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Loader from "../components/ui/Loader";

interface Ticket {
  id: string;

  subject: string;

  message: string;

  status: string;

  createdAt: string;

  client?: {
    fullName: string;
    email: string;
  };
}

const Support = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* FETCH */
  useEffect(() => {

    const fetchTickets =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axios.get(
              `${import.meta.env.VITE_API_URL}/admin/support`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setTickets(
            response.data.tickets || []
          );

        } catch (
          error
        ) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchTickets();

  }, []);

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Support Tickets
        </h1>

        <p className="mt-2 text-slate-400">
          Manage client support requests
        </p>

      </div>

      {/* TICKETS */}
      <div className="space-y-5">

        {tickets.length === 0 ? (

          <div className="rounded-2xl border border-white/5 bg-[#111] p-6 text-slate-400">

            No support tickets found

          </div>

        ) : (

          tickets.map(
            (ticket) => (

              <div
                key={ticket.id}

                className="rounded-3xl border border-white/5 bg-[#111] p-6"
              >

                <div className="flex flex-wrap items-start justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-lg font-bold">

                        {ticket.subject}

                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold

                        ${
                          ticket.status ===
                          "OPEN"

                            ? "bg-yellow-500/20 text-yellow-400"

                            : ticket.status ===
                              "RESOLVED"

                            ? "bg-green-500/20 text-green-400"

                            : "bg-cyan-500/20 text-cyan-400"
                        }`}
                      >

                        {ticket.status}

                      </span>

                    </div>

                    {/* CLIENT */}
                    {ticket.client && (

                      <div className="mt-3 text-sm text-slate-400">

                        <p>

                          {ticket.client.fullName}

                        </p>

                        <p className="text-xs text-slate-500">

                          {ticket.client.email}

                        </p>

                      </div>

                    )}

                    {/* MESSAGE */}
                    <p className="mt-5 leading-relaxed text-slate-300">

                      {ticket.message}

                    </p>

                    {/* DATE */}
                    <p className="mt-5 text-xs text-slate-500">

                      {new Date(
                        ticket.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
};

export default Support;