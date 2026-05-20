import MilestoneItem from "./MilestoneItem";

import type {
  Milestone,
} from "./types";

interface Props {
  milestones: Milestone[];

  updateStatus: (
    milestoneId: string,
    status: string
  ) => Promise<void>;

  deleteMilestone: (
    id: string
  ) => Promise<void>;
}

const MilestoneList =
  ({
    milestones,
    updateStatus,
    deleteMilestone,
  }: Props) => {

    return (
      <div className="mt-8">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-2 inline-flex items-center rounded-full border border-cyan-500/10 bg-cyan-500/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">

              Delivery Timeline

            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-white">

              Project Milestones

            </h3>

            <p className="mt-2 text-sm text-zinc-500">

              Manage approvals, progress stages,
              submissions, and completion workflow.

            </p>

          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl">

              <p className="text-[10px] uppercase tracking-wide text-zinc-500">

                Total

              </p>

              <h4 className="mt-1 text-lg font-semibold text-white">

                {milestones.length}

              </h4>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl">

              <p className="text-[10px] uppercase tracking-wide text-zinc-500">

                Completed

              </p>

              <h4 className="mt-1 text-lg font-semibold text-green-400">

                {
                  milestones.filter(
                    (
                      milestone
                    ) =>
                      milestone.status ===
                      "COMPLETED"
                  ).length
                }

              </h4>

            </div>

          </div>

        </div>

        {/* EMPTY */}
        {milestones.length === 0 && (

          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/30">

              <div className="h-3 w-3 rounded-full bg-cyan-400" />

            </div>

            <h3 className="text-xl font-semibold text-white">

              No Milestones Yet

            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-500">

              Create milestones to start tracking
              project delivery workflow and approvals.

            </p>

          </div>

        )}

        {/* LIST */}
        <div className="space-y-5">

          {milestones.map(
            (
              milestone
            ) => (

              <MilestoneItem
                key={
                  milestone.id
                }

                milestone={
                  milestone
                }

                updateStatus={
                  updateStatus
                }

                deleteMilestone={
                  deleteMilestone
                }
              />

            )
          )}

        </div>

      </div>
    );
  };

export default MilestoneList;