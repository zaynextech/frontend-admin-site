import {
  useState,
} from "react";

import axios from "axios";

import {
  CheckCircle2,
  Clock3,
  Plus,
  Target,
} from "lucide-react";

import {
  getProjectMilestones,
} from "../../services/milestone.service";
import toast from "react-hot-toast";

interface Milestone {

  id: string;

  title: string;

  status: string;

  createdAt: string;
}

interface Props {

  projectId: string;

  milestones: Milestone[];

  setMilestones: React.Dispatch<
    React.SetStateAction<
      Milestone[]
    >
  >;
}

const ProjectMilestones =
  ({
    projectId,
    milestones,
    setMilestones,
  }: Props) => {

    const [
      showMilestoneModal,
      setShowMilestoneModal,
    ] = useState(false);

    const [
      milestoneTitle,
      setMilestoneTitle,
    ] = useState("");

    /* CREATE */
    const createMilestone =
      async () => {

        if (
          !milestoneTitle
        ) {
          return;
        }

        try {

          const token =
            localStorage.getItem(
              "token"
            );

      await axios.post(
          `${import.meta.env.VITE_API_URL}/milestones`,
          {
            title: milestoneTitle,
            projectId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

          const milestoneData =
            await getProjectMilestones(
              projectId
            );

          setMilestones(
            milestoneData
              .milestones || []
          );

          setMilestoneTitle("");

          setShowMilestoneModal(
            false
          );

        } catch (
          error
        ) {

          console.log(error);

          toast.error(
            "Failed to create milestone"
          );

        }
      };

    const completedCount =
      milestones.filter(
        (
          milestone
        ) =>
          milestone.status ===
          "COMPLETED"
      ).length;

    const progress =
      milestones.length > 0

        ? Math.round(
            (
              completedCount /
              milestones.length
            ) * 100
          )

        : 0;

   return (
  <>
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/10 p-3 text-cyan-300">

            <Target size={20} />

          </div>

          <div>

            <h2 className="text-lg font-semibold tracking-tight">
              Project Milestones
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Track project delivery progress
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setShowMilestoneModal(
              true
            )
          }
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-medium text-black transition hover:bg-cyan-300"
        >

          <Plus size={16} />

          Add Milestone

        </button>

      </div>

      {/* PROGRESS */}
      <div className="mb-6 rounded-2xl border border-white/5 bg-black/20 p-5">

        <div className="mb-3 flex items-center justify-between">

          <p className="text-sm font-medium text-zinc-400">
            Project Progress
          </p>

          <p className="text-sm font-semibold text-cyan-300">
            {progress}%
          </p>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/5">

          <div
            style={{
              width:
                `${progress}%`,
            }}
            className="h-full rounded-full bg-cyan-400 transition-all duration-500"
          />

        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">

          <span>
            {completedCount} completed
          </span>

          <span>
            {milestones.length} total
          </span>

        </div>

      </div>

      {/* EMPTY */}
      {milestones.length === 0 && (

        <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/[0.03]">

            <Clock3
              size={30}
              className="text-zinc-600"
            />

          </div>

          <h3 className="text-lg font-semibold">
            No Milestones Yet
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Create milestones to organize project stages.
          </p>

        </div>

      )}

      {/* LIST */}
      <div className="space-y-4">

        {milestones.map(
          (
            milestone,
            index
          ) => (

            <div
              key={
                milestone.id
              }
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/20 p-5 transition hover:border-cyan-400/20 hover:bg-white/[0.02]"
            >

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_40%)]" />

              <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}
                <div className="flex items-start gap-4">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl

                    ${
                      milestone.status ===
                      "COMPLETED"

                        ? "bg-green-500/10 text-green-400"

                        : milestone.status ===
                          "APPROVED"

                        ? "bg-cyan-500/10 text-cyan-400"

                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >

                    <CheckCircle2
                      size={20}
                    />

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-zinc-500">

                        #{index + 1}

                      </span>

                      <h3 className="text-sm font-medium text-white">

                        {
                          milestone.title
                        }

                      </h3>

                    </div>

                    <p className="mt-2 text-xs text-zinc-500">

                      Created on{" "}

                      {new Date(
                        milestone.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap items-center gap-3">

                  {/* STATUS */}
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide

                    ${
                      milestone.status ===
                      "APPROVED"

                        ? "border-green-500/20 bg-green-500/10 text-green-400"

                        : milestone.status ===
                          "COMPLETED"

                        ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"

                        : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                    }`}
                  >

                    {
                      milestone.status
                    }

                  </span>

                  {/* ACTIONS */}
                  {milestone.status ===
                    "PENDING" && (

                    <button
                      className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/20"
                    >

                      Approve

                    </button>

                  )}

                  {milestone.status ===
                    "APPROVED" && (

                    <button
                      className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-medium text-green-300 transition hover:bg-green-400/20"
                    >

                      Mark Completed

                    </button>

                  )}

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>

    {/* MODAL */}
    {showMilestoneModal && (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">

          <h2 className="text-xl font-semibold tracking-tight">
            Create Milestone
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Add a new project checkpoint or delivery phase.
          </p>

          <input
            type="text"
            placeholder="Example: UI Design Approval"
            value={
              milestoneTitle
            }
            onChange={(e) =>
              setMilestoneTitle(
                e.target.value
              )
            }
            className="mt-6 h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
          />

          <div className="mt-6 flex gap-3">

            <button
              onClick={
                createMilestone
              }
              className="flex-1 rounded-xl bg-cyan-400 py-3 text-sm font-medium text-black transition hover:bg-cyan-300"
            >

              Create

            </button>

            <button
              onClick={() =>
                setShowMilestoneModal(
                  false
                )
              }
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >

              Cancel

            </button>

          </div>

        </div>

      </div>

    )}

  </>
);
  };

export default ProjectMilestones;