import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

interface QuoteLead {
  leadStage: string;
  id: string;

  fullName: string;
  companyName: string;

  workEmail: string;
  phoneNumber: string;

  projectType: string;

  budgetRange: string;

  projectTimeline: string;

  projectStatus: string;

  leadScore: string;

  isReviewed: boolean;
  isContacted: boolean;

  createdAt: string;
}

const LeadManager = () => {

  const [leads, setLeads] =
    useState<QuoteLead[]>([]);

  const navigate =
    useNavigate();

  const [sortBy, setSortBy] =
  useState("newest");

  useEffect(() => {

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/quote`
      )

      .then((res) =>
        setLeads(
          res.data.quotes
        )
      )

      .catch(() =>
        console.log(
          "failed"
        )
      );

  }, []);

  const sortedLeads =
  [...leads].sort(
    (a, b) => {

      if (
        sortBy === "newest"
      ) {

        return (
          new Date(
            b.createdAt
          ).getTime() -

          new Date(
            a.createdAt
          ).getTime()
        );
      }

      if (
        sortBy === "oldest"
      ) {

        return (
          new Date(
            a.createdAt
          ).getTime() -

          new Date(
            b.createdAt
          ).getTime()
        );
      }

      if (
        sortBy === "enterprise"
      ) {

        return (
          a.leadScore ===
          "enterprise"

            ? -1

            : 1
        );
      }

      return 0;
    }
  );

  return (
    <section className="p-10 text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-black">
          Enterprise Lead Management
        </h1>

        <p className="mt-2 text-slate-400">
          Manage software inquiries and qualified enterprise clients.
        </p>

      </div>

      {/* Sorting  */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <h2 className="text-2xl font-black text-white">
              Leads
            </h2>

            <select
              value={sortBy}

              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }

              className="rounded-2xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-500"
            >

              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="enterprise">
                Enterprise Leads
              </option>

            </select>
          </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-3xl border border-white/5">

        <table className="w-full">

          <thead className="bg-[#111]">

            <tr className="text-left">

              <th className="p-5">
                Client
              </th>

              <th className="p-5">
                Company
              </th>

              <th className="p-5">
                Project
              </th>

              <th className="p-5">
                Budget
              </th>

              <th className="p-5">
                Timeline
              </th>

              <th className="p-5">
                Lead Score
              </th>

              <th className="p-5">
                Status
              </th>

              <th className="p-5">
                Actions
              </th>

            </tr>

          </thead>
          

          <tbody>

            {sortedLeads.map(
              (lead) => (

                <tr
                  key={lead.id}

                  className="border-t border-white/5 hover:bg-white/[0.02]"
                >

                  {/* CLIENT */}
                  <td className="p-5">

                    <div>

                      <p className="font-semibold">
                        {lead.fullName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {lead.workEmail}
                      </p>

                    </div>

                  </td>

                  {/* COMPANY */}
                  <td className="p-5">

                    <div>

                      <p>
                        {lead.companyName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {lead.phoneNumber}
                      </p>

                    </div>

                  </td>

                  {/* PROJECT */}
                  <td className="p-5">

                    <div>

                      <p>
                        {lead.projectType}
                      </p>

                      <p className="text-xs text-slate-500">
                        {lead.projectStatus}
                      </p>

                    </div>

                  </td>

                  {/* BUDGET */}
                  <td className="p-5">

                    {lead.budgetRange}

                  </td>

                  {/* TIMELINE */}
                  <td className="p-5">

                    {lead.projectTimeline}

                  </td>

                  {/* SCORE */}
                  <td className="p-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold

                      ${
                        lead.leadScore ===
                        "enterprise"

                          ? "bg-green-500/20 text-green-400"

                          : lead.leadScore ===
                            "urgent"

                          ? "bg-orange-500/20 text-orange-400"

                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >

                      {lead.leadScore}

                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="p-5">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold

                    ${
                      lead.leadStage ===
                      "NEW"

                        ? "bg-blue-500/20 text-blue-400"

                        : lead.leadStage ===
                          "CONTACTED"

                        ? "bg-yellow-500/20 text-yellow-400"

                        : lead.leadStage ===
                          "QUALIFIED"

                        ? "bg-purple-500/20 text-purple-400"

                        : lead.leadStage ===
                          "PROPOSAL_SENT"

                        ? "bg-orange-500/20 text-orange-400"

                        : lead.leadStage ===
                          "NEGOTIATION"

                        ? "bg-pink-500/20 text-pink-400"

                        : lead.leadStage ===
                          "CONVERTED"

                        ? "bg-green-500/20 text-green-400"

                        : "bg-red-500/20 text-red-400"
                    }`}
                  >

                    {lead.leadStage}

                  </span>

                </td>

                  {/* ACTIONS */}
                  <td className="p-5">

                    <button
                      onClick={() =>
                        navigate(
                          `/leads/${lead.id}`
                        )
                      }

                      className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black"
                    >
                      View
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default LeadManager;