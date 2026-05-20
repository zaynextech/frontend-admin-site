import type {
  UploadedFile,
} from "../../types/file.types";

interface Props {
  editingFile: UploadedFile | null;

  newFileName: string;

  setNewFileName: React.Dispatch<
    React.SetStateAction<string>
  >;

  updateFile: () => void;

  setEditingFile: React.Dispatch<
    React.SetStateAction<UploadedFile | null>
  >;
}

const EditFileModal =
  ({
    editingFile,
    newFileName,
    setNewFileName,
    updateFile,
    setEditingFile,
  }: Props) => {

    if (!editingFile) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

        {/* MODAL */}
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#050505] shadow-2xl">

          {/* HEADER */}
          <div className="border-b border-white/5 px-5 py-4">

            <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">

              Edit File

            </h2>

            <p className="mt-1 text-xs text-zinc-500 md:text-sm">

              Update the file display name.

            </p>

          </div>

          {/* BODY */}
          <div className="p-5">

            <label className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-zinc-500">

              File Name

            </label>

            <input
              type="text"

              value={newFileName}

              onChange={(e) =>
                setNewFileName(
                  e.target.value
                )
              }

              placeholder="Enter file name"

              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-500/30 focus:bg-black/40"
            />

            {/* ACTIONS */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={updateFile}

                className="flex h-11 flex-1 items-center justify-center rounded-xl bg-cyan-500 px-4 text-sm font-semibold text-black transition-all hover:bg-cyan-400"
              >

                Save Changes

              </button>

              <button
                onClick={() =>
                  setEditingFile(
                    null
                  )
                }

                className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white transition-all hover:bg-white/[0.06]"
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      </div>
    );
  };

export default EditFileModal;