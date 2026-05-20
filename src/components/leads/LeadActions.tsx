import {
  Archive,
  ArrowRightCircle,
  BriefcaseBusiness,
  Loader2,
  Trash2,
  UserCheck,
} from "lucide-react";

interface Lead {
  id: string;

  isConverted: boolean;

  projectCreated?: boolean;

  clientExists?: boolean;
}

interface Props {
  lead: Lead;

  converting: boolean;

  creatingProject: boolean;

  deleting: boolean;

  onConvert: () => void;

  onCreateProject: () => void;

  onDelete: () => void;
}

const LeadActions =
  ({
    lead,
    converting,
    creatingProject,
    deleting,
    onConvert,
    onCreateProject,
    onDelete,
  }: Props) => {

    return (
      <div className="sticky bottom-5 z-40 rounded-3xl border border-white/10 bg-black/60 p-5 shadow-2xl backdrop-blur-2xl">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* LEFT */}
          <div>

            <h2 className="text-lg font-semibold tracking-tight text-white">

              Lead Workflow Actions

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

              Manage lead conversion, project creation, and lifecycle actions.

            </p>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3">

            {/* DELETE */}
            <button
              onClick={
                onDelete
              }

              disabled={
                deleting
              }

              className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {deleting ? (

                <Loader2
                  size={16}
                  className="animate-spin"
                />

              ) : (

                <Trash2
                  size={16}
                />

              )}

              {deleting
                ? "Deleting..."
                : "Delete Lead"}

            </button>

            {/* CONVERT */}
            {!lead.isConverted &&
              !lead.clientExists && (

              <button
                onClick={
                  onConvert
                }

                disabled={
                  converting
                }

                className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {converting ? (

                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                ) : (

                  <UserCheck
                    size={16}
                  />

                )}

                {converting
                  ? "Converting..."
                  : "Convert To Client"}

              </button>

            )}

            {/* CREATE PROJECT */}
            {(lead.isConverted ||
              lead.clientExists) &&
              !lead.projectCreated && (

              <button
                onClick={
                  onCreateProject
                }

                disabled={
                  creatingProject
                }

                className="flex items-center gap-2 rounded-2xl bg-green-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {creatingProject ? (

                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                ) : (

                  <BriefcaseBusiness
                    size={16}
                  />

                )}

                {creatingProject
                  ? "Creating..."
                  : "Create Project"}

              </button>

            )}

            {/* PROJECT CREATED */}
            {lead.projectCreated && (

              <button
                className="flex items-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-300"
              >

                <ArrowRightCircle
                  size={16}
                />

                Open Project Workspace

              </button>

            )}

            {/* ARCHIVE */}
            <button
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.05]"
            >

              <Archive
                size={16}
              />

              Archive

            </button>

          </div>

        </div>

      </div>
    );
  };

export default LeadActions;