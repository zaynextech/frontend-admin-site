import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import FileItem from "./FileItem";

import type {
  Project,
  UploadedFile,
} from "../../types/file.types";

interface Props {
  project: Project;

  expandedProject: string | null;

  setExpandedProject: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  openEditModal: (
    file: UploadedFile
  ) => void;

  deleteFile: (
    id: string
  ) => void;
}

const ProjectFilesCard =
  ({
    project,
    expandedProject,
    setExpandedProject,
    openEditModal,
    deleteFile,
  }: Props) => {

    const files =
      project.files || [];

    const expanded =
      expandedProject ===
      project.id;

    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all">

        {/* HEADER */}
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">

          {/* INFO */}
          <div className="min-w-0">

            <h2 className="truncate text-base font-semibold tracking-tight text-white md:text-lg">

              {project.projectName}

            </h2>

            <p className="mt-1 text-xs text-zinc-500 md:text-sm">

              {files.length} file
              {files.length !== 1 &&
                "s"}

            </p>

          </div>

          {/* TOGGLE */}
          <button
            onClick={() =>
              setExpandedProject(
                expanded
                  ? null
                  : project.id
              )
            }

            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 text-xs font-medium text-cyan-300 transition-all hover:bg-cyan-500 hover:text-black md:text-sm"
          >

            {expanded
              ? "Hide Files"
              : "View Files"}

            {expanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}

          </button>

        </div>

        {/* FILES */}
        {expanded && (

          <div className="border-t border-white/5 p-4 md:p-5">

            {files.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-8 text-center">

                <p className="text-sm text-zinc-500">

                  No files uploaded

                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {files.map(
                  (
                    file: UploadedFile
                  ) => (

                    <FileItem
                      key={file.id}

                      file={file}

                      openEditModal={
                        openEditModal
                      }

                      deleteFile={
                        deleteFile
                      }
                    />

                  )
                )}

              </div>

            )}

          </div>

        )}

      </div>
    );
  };

export default ProjectFilesCard;