import type { Milestone } from "./types";

interface Props {
  milestone: Milestone;

  updateStatus: (
    milestoneId: string,
    status: string
  ) => Promise<void>;

  deleteMilestone: (
    id: string
  ) => Promise<void>;
}

const statusStyles: Record<
  string,
  string
> = {

  PENDING:
    "border-zinc-500/20 bg-zinc-500/10 text-zinc-300",

  IN_PROGRESS:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",

  SUBMITTED:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

  APPROVED:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",

  COMPLETED:
    "border-green-500/20 bg-green-500/10 text-green-400",
};

const MilestoneItem =
  ({
    milestone,
    updateStatus,
    deleteMilestone,
  }: Props) => {

    return (
      <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20">

        <div className="rounded-[22px] border border-white/5 bg-black/40 p-5">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            {/* LEFT */}
            <div className="flex-1">

              <div className="flex flex-wrap items-center gap-3">

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]

                  ${
                    statusStyles[
                      milestone.status
                    ]
                  }`}
                >

                  {
                    milestone.status
                  }

                </span>

                <span className="text-[11px] uppercase tracking-wide text-zinc-600">

                  Milestone Stage

                </span>

              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">

                {milestone.title}

              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">

                {milestone.description ||
                  "No milestone description provided."}

              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-zinc-600">

                <span>

                  Created:
                  {" "}

                  {new Date(
                    milestone.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex w-full flex-col gap-3 sm:w-auto">

              <select
                value={
                  milestone.status
                }

                onChange={(e) =>
                  updateStatus(
                    milestone.id,
                    e.target.value
                  )
                }

                className="h-11 rounded-2xl border border-white/10 bg-black/50 px-4 text-sm text-white outline-none transition-all focus:border-cyan-400/30"
              >

                <option value="PENDING">
                  PENDING
                </option>

                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>

                <option value="SUBMITTED">
                  SUBMITTED
                </option>

                <option value="APPROVED">
                  APPROVED
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>

              </select>

              <button
                onClick={() =>
                  deleteMilestone(
                    milestone.id
                  )
                }

                className="h-11 rounded-2xl border border-red-500/10 bg-red-500/10 px-5 text-sm font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
              >

                Delete

              </button>

            </div>

          </div>

        </div>

      </div>
    );
  };

export default MilestoneItem;