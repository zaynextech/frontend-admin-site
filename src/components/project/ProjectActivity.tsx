import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import Loader from "../ui/Loader";

interface Activity {
  id: string;

  action: string;

  actor: string;

  type: string;

  createdAt: string;
}

interface Props {
  projectId: string;
}

const ProjectActivity =
  ({
    projectId,
  }: Props) => {

    const [activities, setActivities] =
      useState<Activity[]>([]);

    const [loading, setLoading] =
      useState(true);

    const fetchActivities =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

         const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/activity/project/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setActivities(
            response.data.logs || []
          );

        } catch (
          error
        ) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

      /* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */

    useEffect(() => {

      fetchActivities();

    }, []);

    if (loading) {

      return (
        <Loader />
      );
    }

    return (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

    {/* HEADER */}
    <div className="mb-6 flex items-center justify-between">

      <div>

        <h2 className="text-lg font-semibold tracking-tight">
          Activity Timeline
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Recent project activity and updates
        </p>

      </div>

    </div>

    {/* EMPTY */}
    {activities.length === 0 && (

      <div className="rounded-xl border border-white/5 bg-black/20 p-6 text-center text-sm text-zinc-500">

        No activity yet

      </div>

    )}

    {/* ACTIVITIES */}
    <div className="space-y-4">

      {activities.map(
        (activity) => (

          <div
            key={activity.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/20 p-4 transition hover:border-cyan-400/20 hover:bg-white/[0.02]"
          >

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_40%)]" />

            <div className="relative flex gap-4">

              {/* ICON/DOT */}
              <div
                className={`mt-1.5 h-3 w-3 rounded-full

                ${
                  activity.type ===
                  "UPLOAD"

                    ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"

                    : activity.type ===
                      "MILESTONE"

                    ? "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]"

                    : activity.type ===
                      "INVOICE"

                    ? "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]"

                    : "bg-white"
                }`}
              />

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-sm font-medium text-white">
                      {activity.action}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">

                      Actor:
                      {" "}

                      {activity.actor}

                    </p>

                  </div>

                  <span className="text-xs text-zinc-600">

                    {new Date(
                      activity.createdAt
                    ).toLocaleString()}

                  </span>

                </div>

              </div>

            </div>

          </div>
        )
      )}

    </div>

  </div>
);
  };

export default ProjectActivity;