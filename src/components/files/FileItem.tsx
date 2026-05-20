import {
  Download,
  Eye,
  FileText,
  Pencil,
  Trash2,
} from "lucide-react";

import type {
  UploadedFile,
} from "../../types/file.types";

interface Props {
  file: UploadedFile;

  openEditModal: (
    file: UploadedFile
  ) => void;

  deleteFile: (
    id: string
  ) => void;
}

const FileItem =
  ({
    file,
    openEditModal,
    deleteFile,
  }: Props) => {

    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all hover:border-cyan-500/20">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}
          <div className="flex min-w-0 items-start gap-4">

            {/* ICON */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/10 bg-cyan-500/10 text-cyan-300">

              <FileText size={18} />

            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">

              <h3 className="truncate text-sm font-medium tracking-tight text-white md:text-base">

                {file.fileName}

              </h3>

              {/* TAGS */}
              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400">

                  {file.fileType}

                </span>

                <span className="rounded-full border border-cyan-500/10 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-cyan-300">

                  {file.uploadedBy}

                </span>

                <span className="rounded-full border border-orange-500/10 bg-orange-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-orange-300">

                  {new Date(
                    file.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">

            {/* VIEW */}
            <a
              href={file.fileUrl}

              target="_blank"

              rel="noreferrer"

              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-zinc-300 transition-all hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-cyan-300"
            >

              <Eye size={16} />

            </a>

            {/* DOWNLOAD */}
            <a
              href={file.fileUrl.replace(
                "/upload/",
                "/upload/fl_attachment/"
              )}

              target="_blank"

              rel="noreferrer"

              className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-black transition-all hover:bg-cyan-400"
            >

              <Download size={16} />

            </a>

            {/* EDIT */}
            <button
              onClick={() =>
                openEditModal(
                  file
                )
              }

              className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-black transition-all hover:bg-orange-400"
            >

              <Pencil size={16} />

            </button>

            {/* DELETE */}
            <button
              onClick={() =>
                deleteFile(
                  file.id
                )
              }

              className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-black transition-all hover:bg-red-400"
            >

              <Trash2 size={16} />

            </button>

          </div>

        </div>

      </div>
    );
  };

export default FileItem;