import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

interface Revision {
  id: string;

  message: string;

  status: string;

  createdAt: string;

  client: {
    fullName: string;
    email: string;
  };
}

interface Props {
  projectId: string;
}

const ProjectRevisions =
  ({
    projectId,
  }: Props) => {

    const [revisions, setRevisions] =
      useState<Revision[]>([]);

    const [message, setMessage] =
      useState("");

    const fetchRevisions =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

         const response =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/revisions/${projectId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

          setRevisions(
            response.data.revisions || []
          );

        } catch (
          error
        ) {

          console.log(error);

        }
      };
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

useEffect(() => {

  fetchRevisions();

}, []);
    const createRevision =
      async () => {

        if (!message) {
          return;
        }

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          await axios.post(
            `${import.meta.env.VITE_API_URL}/revisions`,
            {
              projectId,
              message,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setMessage("");

          fetchRevisions();

        } catch (
          error
        ) {

          console.log(error);

          toast.error(
            "Failed to create revision"
          );

        }
      };

    const resolveRevision =
      async (
        id: string
      ) => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/revisions/${id}`,
        {
          status:
            "RESOLVED",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

          fetchRevisions();

        } catch (
          error
        ) {

          console.log(error);

        }
      };

   return (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

    {/* HEADER */}
    <div className="mb-6 flex items-center justify-between">

      <div>

        <h2 className="text-lg font-semibold tracking-tight">
          Revision Requests
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Manage client feedback and requested changes
        </p>

      </div>

    </div>

    {/* CREATE */}
    <div className="mb-6 flex flex-col gap-3 lg:flex-row">

      <input
        type="text"
        placeholder="Request revision..."
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        className="h-11 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
      />

      <button
        onClick={
          createRevision
        }
        className="h-11 rounded-xl bg-cyan-400 px-6 text-sm font-medium text-black transition hover:bg-cyan-300"
      >
        Submit
      </button>

    </div>

    {/* EMPTY */}
    {revisions.length === 0 && (

      <div className="rounded-xl border border-white/5 bg-black/20 p-6 text-center text-sm text-zinc-500">

        No revisions yet

      </div>

    )}

    {/* LIST */}
    <div className="space-y-4">

      {revisions.map(
        (revision) => (

          <div
            key={revision.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/20 p-5 transition hover:border-cyan-400/20 hover:bg-white/[0.02]"
          >

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_40%)]" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

              {/* LEFT */}
              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h3 className="text-sm font-medium text-white">

                    {
                      revision.client
                        .fullName
                    }

                  </h3>

                  <span className="text-xs text-zinc-500">

                    {
                      revision.client
                        .email
                    }

                  </span>

                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-300">

                  {revision.message}

                </p>

                <p className="mt-4 text-xs text-zinc-600">

                  {new Date(
                    revision.createdAt
                  ).toLocaleString()}

                </p>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-start gap-3 lg:items-end">

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide

                  ${
                    revision.status ===
                    "RESOLVED"

                      ? "border-green-500/20 bg-green-500/10 text-green-400"

                      : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                  }`}
                >

                  {revision.status}

                </span>

                {revision.status !==
                  "RESOLVED" && (

                  <button
                    onClick={() =>
                      resolveRevision(
                        revision.id
                      )
                    }
                    className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-medium text-green-300 transition hover:bg-green-400/20"
                  >
                    Resolve
                  </button>

                )}

              </div>

            </div>

          </div>
        )
      )}

    </div>

  </div>
);
  };

export default ProjectRevisions;