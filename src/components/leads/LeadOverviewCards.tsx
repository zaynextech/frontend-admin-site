import {
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  Users,
} from "lucide-react";

interface Lead {
  budgetRange: string;

  projectTimeline: string;

  estimatedUsers: string;

  projectType: string;

  isConverted: boolean;
}

interface Props {
  lead: Lead;
}

const LeadOverviewCards =
  ({
    lead,
  }: Props) => {

    const cards = [
      {
        title:
          "Budget Range",

        value:
          lead.budgetRange ||
          "N/A",

        icon:
          CircleDollarSign,
      },

      {
        title:
          "Timeline",

        value:
          lead.projectTimeline ||
          "N/A",

        icon:
          Clock3,
      },

      {
        title:
          "Estimated Users",

        value:
          lead.estimatedUsers ||
          "N/A",

        icon:
          Users,
      },

      {
        title:
          "Project Type",

        value:
          lead.projectType ||
          "N/A",

        icon:
          BriefcaseBusiness,
      },
    ];

    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map(
          (
            card
          ) => {

            const Icon =
              card.icon;

            return (
              <div
                key={
                  card.title
                }

                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-300 hover:border-cyan-400/20"
              >

                {/* BG GLOW */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.06),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative z-10">

                  {/* ICON */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

                    <Icon size={22} />

                  </div>

                  {/* TITLE */}
                  <p className="mt-5 text-xs uppercase tracking-[0.2em] text-zinc-500">

                    {card.title}

                  </p>

                  {/* VALUE */}
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">

                    {card.value}

                  </h3>

                  {/* FOOTER */}
                  <div className="mt-5 flex items-center gap-2">

                    <div
                      className={`h-2 w-2 rounded-full

                      ${
                        lead.isConverted
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                    />

                    <span className="text-xs text-zinc-500">

                      {lead.isConverted
                        ? "Converted Lead"
                        : "Pending Conversion"}

                    </span>

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>
    );
  };

export default LeadOverviewCards;