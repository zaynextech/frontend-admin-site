import {
  BriefcaseBusiness,
  Clock3,
  CircleDollarSign,
  FolderKanban,
  Headphones,
  Layers3,
  Users,
} from "lucide-react";

interface Lead {
  projectType: string;

  budgetRange: string;

  projectTimeline: string;

  projectStatus: string;

  estimatedUsers: string;

  ongoingSupport: boolean;
}

interface Props {
  lead: Lead;
}

const LeadProjectRequirements =
  ({
    lead,
  }: Props) => {

    const items = [
      {
        label:
          "Project Type",

        value:
          lead.projectType ||
          "N/A",

        icon:
          BriefcaseBusiness,
      },

      {
        label:
          "Budget Range",

        value:
          lead.budgetRange ||
          "N/A",

        icon:
          CircleDollarSign,
      },

      {
        label:
          "Timeline",

        value:
          lead.projectTimeline ||
          "N/A",

        icon:
          Clock3,
      },

      {
        label:
          "Project Status",

        value:
          lead.projectStatus ||
          "N/A",

        icon:
          FolderKanban,
      },

      {
        label:
          "Estimated Users",

        value:
          lead.estimatedUsers ||
          "N/A",

        icon:
          Users,
      },

      {
        label:
          "Support Plan",

        value:
          lead.ongoingSupport
            ? "Ongoing Support Requested"
            : "No Ongoing Support",

        icon:
          Headphones,
      },
    ];

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">

              Project Requirements

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

              Technical scope and delivery expectations submitted by the client.

            </p>

          </div>

          {/* BADGE */}
          <div className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">

            <Layers3 size={14} />

            Requirements

          </div>

        </div>

        {/* GRID */}
        <div className="grid gap-4 md:grid-cols-2">

          {items.map(
            (
              item
            ) => {

              const Icon =
                item.icon;

              return (
                <div
                  key={
                    item.label
                  }

                  className="group rounded-2xl border border-white/5 bg-black/20 p-4 transition duration-300 hover:border-cyan-400/20"
                >

                  <div className="flex items-start gap-4">

                    {/* ICON */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

                      <Icon size={20} />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">

                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

                        {item.label}

                      </p>

                      <h3 className="mt-2 text-sm font-medium leading-6 text-white">

                        {item.value}

                      </h3>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>
    );
  };

export default LeadProjectRequirements;