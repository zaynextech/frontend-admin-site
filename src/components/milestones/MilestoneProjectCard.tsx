import MilestoneCreateForm from "./MilestoneCreateForm";
import MilestoneLatest from "./MilestoneLatest";
import MilestoneList from "./MilestoneList";

import { statusColors } from "./milestoneColors";

import type {
  Project,
} from "./types";

interface Props {
  project: Project;

  selectedProject: string | null;

  setSelectedProject: React.Dispatch<
    React.SetStateAction<
      string | null
    >
  >;

  title: string;

  setTitle: React.Dispatch<
    React.SetStateAction<string>
  >;

  description: string;

  setDescription: React.Dispatch<
    React.SetStateAction<string>
  >;

  createMilestone: (
    projectId: string
  ) => Promise<void>;

  updateStatus: (
    milestoneId: string,
    status: string
  ) => Promise<void>;

  deleteMilestone: (
    id: string
  ) => Promise<void>;
}

const MilestoneProjectCard =
  ({
    project,
    selectedProject,
    setSelectedProject,
    title,
    setTitle,
    description,
    setDescription,
    createMilestone,
    updateStatus,
    deleteMilestone,
  }: Props) => {

    const latestMilestone =
      project.milestones[0];

    const isOpen =
      selectedProject ===
      project.id;

    const completedMilestones =
      project.milestones.filter(
        (
          milestone
        ) =>
          milestone.status ===
          "COMPLETED"
      ).length;

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

        <div className="rounded-[24px] border border-white/5 bg-black/40 p-5 sm:p-6">

          {/* HEADER */}
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

            {/* LEFT */}
            <div className="flex-1">

              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-500/10 bg-cyan-500/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">

                NexaFlow Project Pipeline

              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">

                {
                  project.projectName
                }

              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500">

                <span>

                  {
                    project.client
                      .fullName
                  }

                </span>

                <span className="hidden h-1 w-1 rounded-full bg-zinc-700 sm:block" />

                <span className="break-all">

                  {
                    project.client
                      .email
                  }

                </span>

              </div>

            </div>

            {/* RIGHT */}
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">

              <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">

                <p className="text-[10px] uppercase tracking-wide text-zinc-500">

                  Progress

                </p>

                <h3 className="mt-2 text-2xl font-semibold text-cyan-300">

                  {
                    project.progress
                  }%

                </h3>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">

                <p className="text-[10px] uppercase tracking-wide text-zinc-500">

                  Completed

                </p>

                <h3 className="mt-2 text-2xl font-semibold text-green-400">

                  {
                    completedMilestones
                  }

                </h3>

              </div>

            </div>

          </div>

          {/* STATUS */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <span
              className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]

              ${
                statusColors[
                  project.status
                ]
              }`}
            >

              {
                project.status
              }

            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">

              {
                project.milestones
                  .length
              } Milestones

            </span>

          </div>

          {/* PROGRESS BAR */}
          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-xs uppercase tracking-wide text-zinc-500">

                Delivery Progress

              </span>

              <span className="text-xs font-medium text-cyan-300">

                {
                  project.progress
                }%

              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/5">

              <div
                style={{
                  width:
                    `${project.progress}%`,
                }}

                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              />

            </div>

          </div>

          {/* LATEST */}
          {latestMilestone && (

            <MilestoneLatest
              milestone={
                latestMilestone
              }
            />

          )}

          {/* PAYMENTS */}
          <div className="mt-6">

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">

              Payments

            </h3>

            {project.milestones.some(
              (milestone) =>
                milestone.payments &&
                milestone.payments.length > 0
            ) ? (

              <div className="space-y-3">

                {project.milestones.map(
                  (milestone) => (

                    milestone.payments?.map(
                      (payment) => (

                        <div
                          key={payment.id}
                          className="rounded-2xl border border-white/10 bg-black/30 p-4"
                        >

                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                              <h4 className="text-sm font-semibold text-white">

                                {payment.title}

                              </h4>

                              <p className="mt-1 text-xs text-zinc-500">

                                Milestone:
                                {" "}
                                {milestone.title}

                              </p>

                              <p className="mt-1 text-xs text-zinc-500">

                                {payment.currency}
                                {" "}
                                {payment.amount}

                              </p>

                              {payment.paidAt && (

                                <p className="mt-2 text-xs text-zinc-500">

                                  Paid on:
                                  {" "}
                                  {new Date(
                                    payment.paidAt
                                  ).toLocaleString()}

                                </p>
                              )}

                            </div>

                            <div>

                              <span
                                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]

                                ${
                                  payment.status ===
                                  "PAID"

                                    ? "border border-green-500/20 bg-green-500/10 text-green-300"

                                    : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                                }`}
                              >

                                {payment.status}

                              </span>

                            </div>

                          </div>

                        </div>
                      )
                    )
                  )
                )}

              </div>

            ) : (

              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-sm text-zinc-500">

                No payments created yet.

              </div>

            )}

          </div>

          {/* ACTION */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="text-xs text-zinc-600">

              NexaFlow enterprise milestone tracking system

            </div>

            <button
              onClick={() =>
                setSelectedProject(
                  isOpen
                    ? null
                    : project.id
                )
              }

              className="h-12 rounded-2xl bg-cyan-400 px-6 text-sm font-semibold text-black transition-all hover:bg-cyan-300"
            >

              {isOpen
                ? "Close Workspace"
                : "Open Workspace"}

            </button>

          </div>

          {/* EXPANDED */}
          {isOpen && (

            <div className="mt-8 space-y-8 border-t border-white/5 pt-8">

              <MilestoneCreateForm
                projectId={
                  project.id
                }

                title={title}

                setTitle={
                  setTitle
                }

                description={
                  description
                }

                setDescription={
                  setDescription
                }

                createMilestone={
                  createMilestone
                }
              />

              <MilestoneList
                milestones={
                  project.milestones
                }

                updateStatus={
                  updateStatus
                }

                deleteMilestone={
                  deleteMilestone
                }
              />

            </div>

          )}

        </div>

      </div>
    );
  };

export default MilestoneProjectCard;