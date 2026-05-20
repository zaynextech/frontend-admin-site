import {
  FileText,
} from "lucide-react";

interface Lead {
  projectDescription: string;
}

interface Props {
  lead: Lead;
}

const LeadDescription =
  ({
    lead,
  }: Props) => {

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-6 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

            <FileText size={22} />

          </div>

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">

              Project Description

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

              Detailed business and technical requirements submitted by the client.

            </p>

          </div>

        </div>

        {/* CONTENT */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-black/30">

          {/* TOP BAR */}
          <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">

            <div className="h-3 w-3 rounded-full bg-red-400" />

            <div className="h-3 w-3 rounded-full bg-yellow-400" />

            <div className="h-3 w-3 rounded-full bg-green-400" />

          </div>

          {/* TEXT */}
          <div className="p-6">

            {lead.projectDescription ? (

              <p className="whitespace-pre-wrap text-sm leading-8 text-zinc-300">

                {lead.projectDescription}

              </p>

            ) : (

              <div className="py-10 text-center">

                <h3 className="text-lg font-medium text-white">

                  No Description Submitted

                </h3>

                <p className="mt-3 text-sm text-zinc-500">

                  The client did not provide additional project details.

                </p>

              </div>

            )}

          </div>

        </div>

      </div>
    );
  };

export default LeadDescription;