import {
  Download,
  Eye,
  FileText,
  Upload,
} from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";

interface ProjectFile {
  id: string;

  fileName: string;

  fileUrl: string;

  fileType: string;

  createdAt: string;
}

interface Props {
  projectId: string;

  files: ProjectFile[];

  setFiles: React.Dispatch<
    React.SetStateAction<ProjectFile[]>
  >;
}

const ProjectFiles =
  ({
    projectId,
    files,
    setFiles,
  }: Props) => {

    const uploadProjectFile =
      async (
        selectedFile:
          File | null
      ) => {

        if (!selectedFile) {
          return;
        }

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const formData =
            new FormData();

          formData.append(
            "file",
            selectedFile
          );

          formData.append(
            "projectId",
            projectId
          );

        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/files`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

          const filesResponse =
            await axios.get(
              `${import.meta.env.VITE_API_URL}/admin/files`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const filteredFiles =
            (
              filesResponse.data
                .files || []
            ).filter(
              (
                file: ProjectFile & {
                  project?: {
                    id: string;
                  };
                }
              ) =>
                file.project?.id ===
                projectId
            );

          setFiles(
            filteredFiles
          );

        } catch (
          error
        ) {

          console.log(error);

          toast.error(
            "Upload failed"
          );

        }
      };

    return (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

    {/* HEADER */}
    <div className="mb-6 flex items-center justify-between">

      <div>

        <h2 className="text-lg font-semibold tracking-tight">
          Project Files
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Upload and manage project assets
        </p>

      </div>

    </div>

    {/* UPLOAD */}
    <div className="mb-6 flex flex-col gap-3 lg:flex-row">

      <input
        type="file"
        onChange={(e) =>
          uploadProjectFile(
            e.target.files?.[0] ||
              null
          )
        }
        className="h-11 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-cyan-300 focus:border-cyan-400/40 focus:outline-none"
      />

      <button
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-medium text-black transition hover:bg-cyan-300"
      >

        <Upload size={16} />

        Upload

      </button>

    </div>

    {/* EMPTY */}
    {files.length === 0 && (

      <div className="rounded-xl border border-white/5 bg-black/20 p-6 text-center text-sm text-zinc-500">

        No files uploaded

      </div>

    )}

    {/* FILES */}
    <div className="space-y-3">

      {files.map(
        (file) => (

          <div
            key={file.id}
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/20 p-4 transition hover:border-cyan-400/20 hover:bg-white/[0.02]"
          >

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(0,229,255,0.08),transparent_40%)]" />

            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div className="flex items-center gap-4">

                <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/10 p-3 text-cyan-300">

                  <FileText size={18} />

                </div>

                <div>

                  <h3 className="text-sm font-medium text-white">
                    {file.fileName}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">

                    {new Date(
                      file.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">

                {/* PREVIEW */}
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white transition hover:border-cyan-400/20 hover:bg-cyan-400/10"
                >

                  <Eye size={15} />

                  Preview

                </a>

                {/* DOWNLOAD */}
                <a
                  href={file.fileUrl.replace(
                    "/upload/",
                    "/upload/fl_attachment/"
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-medium text-black transition hover:bg-cyan-300"
                >

                  <Download size={15} />

                  Download

                </a>

              </div>

            </div>

          </div>
        )
      )}

    </div>

  </div>
);
  };

export default ProjectFiles;