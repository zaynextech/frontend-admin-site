import {
  CalendarDays,
  Globe,
  Sparkles,
} from "lucide-react";

interface Lead {
  fullName: string;

  companyName: string;

  leadScore: string;

  projectStatus: string;

  createdAt: string;

  isConverted: boolean;

  country: string;
}

interface Props {
  lead: Lead;
}

const LeadHeader =
  ({
    lead,
  }: Props) => {

    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* BG GLOW */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_35%)]" />

        <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          {/* LEFT */}
          <div>

            {/* LABEL */}
            <div className="mb-4 flex items-center gap-2">

              <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">

                Enterprise Lead

              </div>

              {lead.isConverted && (

                <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-green-300">

                  Converted

                </div>

              )}

            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">

              {lead.companyName || lead.fullName}

            </h1>

            {/* SUBTEXT */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-cyan-400"
                />

                <span>

                  {lead.fullName}

                </span>

              </div>

              <div className="flex items-center gap-2">

                <Globe
                  size={16}
                  className="text-cyan-400"
                />

                <span>

                  {lead.country}

                </span>

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays
                  size={16}
                  className="text-cyan-400"
                />

                <span>

                  {new Date(
                    lead.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap gap-3">

            {/* LEAD SCORE */}
            <div
              className={`rounded-2xl border px-5 py-3 text-sm font-semibold backdrop-blur-xl

              ${
                lead.leadScore ===
                "enterprise"

                  ? "border-green-500/20 bg-green-500/10 text-green-300"

                  : lead.leadScore ===
                    "urgent"

                  ? "border-orange-500/20 bg-orange-500/10 text-orange-300"

                  : "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
              }`}
            >

              {lead.leadScore}

            </div>

            {/* STATUS */}
            <div
              className={`rounded-2xl border px-5 py-3 text-sm font-semibold backdrop-blur-xl

              ${
                lead.projectStatus ===
                "Ready to start"

                  ? "border-green-500/20 bg-green-500/10 text-green-300"

                  : lead.projectStatus ===
                    "Comparing agencies"

                  ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-300"

                  : "border-white/10 bg-white/[0.03] text-zinc-300"
              }`}
            >

              {lead.projectStatus}

            </div>

          </div>

        </div>

      </div>
    );
  };

export default LeadHeader;