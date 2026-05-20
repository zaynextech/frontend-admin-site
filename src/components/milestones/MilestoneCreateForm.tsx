interface Props {
  projectId: string;

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
}

const MilestoneCreateForm =
  ({
    projectId,
    title,
    setTitle,
    description,
    setDescription,
    createMilestone,
  }: Props) => {

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

        <div className="rounded-[22px] border border-white/5 bg-black/40 p-6">

          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between gap-4">

            <div>

              <div className="mb-2 inline-flex items-center rounded-full border border-cyan-500/10 bg-cyan-500/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">

                Delivery Pipeline

              </div>

              <h3 className="text-xl font-semibold tracking-tight text-white">

                Create Milestone

              </h3>

              <p className="mt-1 text-sm text-zinc-500">

                Add a new project delivery stage

              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="space-y-4">

            <div>

              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">

                Milestone Title

              </label>

              <input
                type="text"

                placeholder="UI Approval, Backend Integration..."

                value={title}

                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }

                className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/30 focus:bg-black/60"
              />

            </div>

            <div>

              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500">

                Description

              </label>

              <textarea
                placeholder="Describe milestone objectives, requirements, approvals, or deliverables..."

                value={description}

                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }

                className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/30 focus:bg-black/60"
              />

            </div>

            {/* ACTION */}
            <div className="flex items-center justify-between border-t border-white/5 pt-5">

              <p className="text-xs text-zinc-600">

                NexaFlow delivery tracking system

              </p>

              <button
                onClick={() =>
                  createMilestone(
                    projectId
                  )
                }

                className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-cyan-300"
              >

                Create Milestone

              </button>

            </div>

          </div>

        </div>

      </div>
    );
  };

export default MilestoneCreateForm;