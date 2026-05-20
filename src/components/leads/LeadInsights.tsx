import {
  AlertTriangle,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

interface Lead {
  budgetRange: string;

  projectTimeline: string;

  estimatedUsers: string;

  ndaRequired: boolean;

  ongoingSupport: boolean;

  leadScore: string;

  projectType: string;
}

interface Props {
  lead: Lead;
}

const LeadInsights =
  ({
    lead,
  }: Props) => {

    const insights = [];

    /* ENTERPRISE */
    if (
      lead.leadScore ===
      "enterprise"
    ) {

      insights.push({
        title:
          "Enterprise Lead",

        description:
          "High-value business inquiry with strong conversion potential.",

        icon:
          BriefcaseBusiness,

        color:
          "cyan",
      });
    }

    /* URGENT */
    if (
      lead.projectTimeline ===
      "ASAP"
    ) {

      insights.push({
        title:
          "Fast Delivery Risk",

        description:
          "Client expects rapid delivery timeline.",

        icon:
          Clock3,

        color:
          "orange",
      });
    }

    /* LARGE SCALE */
    if (
      lead.estimatedUsers?.includes(
        "1000"
      ) ||

      lead.estimatedUsers?.includes(
        "5000"
      ) ||

      lead.estimatedUsers?.includes(
        "10000"
      )
    ) {

      insights.push({
        title:
          "Large User Scale",

        description:
          "Infrastructure planning and scalability required.",

        icon:
          Users,

        color:
          "purple",
      });
    }

    /* NDA */
    if (
      lead.ndaRequired
    ) {

      insights.push({
        title:
          "NDA Required",

        description:
          "Client requires confidentiality before engagement.",

        icon:
          ShieldCheck,

        color:
          "red",
      });
    }

    /* SUPPORT */
    if (
      lead.ongoingSupport
    ) {

      insights.push({
        title:
          "Long-Term Partnership",

        description:
          "Client requested ongoing maintenance and support.",

        icon:
          BadgeCheck,

        color:
          "green",
      });
    }

    /* FALLBACK */
    if (
      insights.length === 0
    ) {

      insights.push({
        title:
          "Standard Lead",

        description:
          "General inquiry without advanced business requirements.",

        icon:
          Sparkles,

        color:
          "zinc",
      });
    }

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-6">

          <h2 className="text-xl font-semibold tracking-tight text-white">

            Lead Intelligence

          </h2>

          <p className="mt-2 text-sm text-zinc-500">

            Automated business insights generated from submitted requirements.

          </p>

        </div>

        {/* GRID */}
        <div className="grid gap-4 lg:grid-cols-2">

          {insights.map(
            (
              insight,
              index
            ) => {

              const Icon =
                insight.icon;

              return (
                <div
                  key={
                    index
                  }

                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-5 transition duration-300 hover:border-cyan-400/20"
                >

                  {/* GLOW */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.06),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-start gap-4">

                    {/* ICON */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl

                      ${
                        insight.color ===
                        "cyan"

                          ? "bg-cyan-500/10 text-cyan-300"

                          : insight.color ===
                            "orange"

                          ? "bg-orange-500/10 text-orange-300"

                          : insight.color ===
                            "purple"

                          ? "bg-purple-500/10 text-purple-300"

                          : insight.color ===
                            "red"

                          ? "bg-red-500/10 text-red-300"

                          : insight.color ===
                            "green"

                          ? "bg-green-500/10 text-green-300"

                          : "bg-white/10 text-zinc-300"
                      }`}
                    >

                      <Icon size={22} />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">

                      <h3 className="text-base font-semibold text-white">

                        {insight.title}

                      </h3>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">

                        {insight.description}

                      </p>

                    </div>

                  </div>

                  {/* ALERT */}
                  {insight.title ===
                    "Fast Delivery Risk" && (

                    <div className="mt-5 flex items-center gap-2 rounded-xl border border-orange-500/10 bg-orange-500/5 px-4 py-3 text-xs text-orange-300">

                      <AlertTriangle
                        size={14}
                      />

                      Timeline may affect delivery quality and team allocation.

                    </div>

                  )}

                </div>
              );
            }
          )}

        </div>

      </div>
    );
  };

export default LeadInsights;