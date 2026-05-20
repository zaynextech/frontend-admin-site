import {
  Upload,
} from "lucide-react";

import type {
  Project,
} from "../../types/file.types";

interface Props {
  projects: Project[];

  selectedFile: File | null;

  setSelectedFile: React.Dispatch<
    React.SetStateAction<File | null>
  >;

  projectId: string;

  setProjectId: React.Dispatch<
    React.SetStateAction<string>
  >;

  uploadFile: () => void;
}

const FilesUploadCard =
  ({
    projects,
    selectedFile,
    setSelectedFile,
    projectId,
    setProjectId,
    uploadFile,
  }: Props) => {

    return (
      <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl md:p-5">

        {/* TOP */}
        <div className="mb-5 flex flex-col gap-1">

          <h2 className="text-base font-semibold tracking-tight text-white md:text-lg">

            Upload Files

          </h2>

          <p className="text-xs text-zinc-500 md:text-sm">

            Store project assets, deliverables, and documents.

          </p>

        </div>

        {/* FORM */}
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">

          {/* PROJECT */}
          <select
            value={projectId}

            onChange={(e) =>
              setProjectId(
                e.target.value
              )
            }

            className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition-all focus:border-cyan-500/30 focus:bg-black/50"
          >

            <option value="">
              Select Project
            </option>

            {projects.map(
              (project: Project) => (

                <option
                  key={project.id}
                  value={project.id}
                >

                  {project.projectName}

                </option>

              )
            )}

          </select>

          {/* FILE */}
          <div className="flex h-11 items-center rounded-xl border border-white/10 bg-black/30 px-3 transition-all focus-within:border-cyan-500/30">

            <input
              type="file"

              onChange={(e) =>
                setSelectedFile(
                  e.target.files?.[0] ||
                    null
                )
              }

              className="w-full text-xs text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/90 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-black hover:file:bg-cyan-400"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={uploadFile}

            disabled={
              !selectedFile ||
              !projectId
            }

            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-black transition-all hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
          >

            <Upload size={16} />

            Upload

          </button>

        </div>

      </div>
    );
  };

export default FilesUploadCard;