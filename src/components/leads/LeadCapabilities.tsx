import {
  Blocks,
  CheckCircle2,
} from "lucide-react";

interface Lead {
  requiredFeatures: string;
}

interface Props {
  lead: Lead;
}

const LeadCapabilities =
  ({
    lead,
  }: Props) => {

    const features =
      lead.requiredFeatures
        ?.split(",")
        .map(
          (
            item
          ) =>
            item.trim()
        )
        .filter(Boolean) || [];

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">

              Requested Capabilities

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

              Features, systems, and platform modules requested by the client.

            </p>

          </div>

          {/* COUNT */}
          <div className="flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">

            <Blocks size={14} />

            {features.length} Selected

          </div>

        </div>

        {/* EMPTY */}
        {features.length === 0 && (

          <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-10 text-center">

            <h3 className="text-lg font-medium text-white">

              No Features Submitted

            </h3>

            <p className="mt-3 text-sm text-zinc-500">

              The client did not specify project capabilities.

            </p>

          </div>

        )}

        {/* FEATURES */}
        {features.length > 0 && (

          <div className="flex flex-wrap gap-3">

            {features.map(
              (
                feature
              ) => (

                <div
                  key={
                    feature
                  }

                  className="group flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300 transition duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/15"
                >

                  <CheckCircle2
                    size={16}
                  />

                  <span>

                    {feature}

                  </span>

                </div>
              )
            )}

          </div>

        )}

      </div>
    );
  };

export default LeadCapabilities;