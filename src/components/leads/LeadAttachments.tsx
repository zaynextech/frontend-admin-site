import {
  Download,
  ExternalLink,
  FileText,
  Link2,
  Paperclip,
} from "lucide-react";

interface Lead {
  attachmentUrl: string;
}

interface Props {
  lead: Lead;
}

const LeadAttachments =
  ({
    lead,
  }: Props) => {

    const hasAttachment =
      Boolean(
        lead.attachmentUrl
      );

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-6 flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

            <Paperclip size={22} />

          </div>

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">

              Attachments & Resources

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

              Files, references, and external resources provided by the client.

            </p>

          </div>

        </div>

        {/* EMPTY */}
        {!hasAttachment && (

          <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500">

              <FileText size={28} />

            </div>

            <h3 className="mt-5 text-lg font-medium text-white">

              No Attachments Submitted

            </h3>

            <p className="mt-3 text-sm text-zinc-500">

              The client did not upload any supporting files or references.

            </p>

          </div>

        )}

        {/* ATTACHMENT */}
        {hasAttachment && (

          <div className="group rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-cyan-400/20">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

                  <Link2 size={24} />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

                    External Resource

                  </p>

                  <p className="mt-2 break-all text-sm leading-7 text-white">

                    {lead.attachmentUrl}

                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3">

                {/* OPEN */}
                <a
                  href={
                    lead.attachmentUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
                >

                  <ExternalLink
                    size={16}
                  />

                  Open

                </a>

                {/* DOWNLOAD */}
                <a
                  href={
                    lead.attachmentUrl
                  }
                  download
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.05]"
                >

                  <Download
                    size={16}
                  />

                  Download

                </a>

              </div>

            </div>

          </div>

        )}

      </div>
    );
  };

export default LeadAttachments;