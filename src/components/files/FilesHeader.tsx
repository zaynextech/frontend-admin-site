// FilesHeader.tsx

interface Props {
  totalFiles: number;
}

const FilesHeader =
  ({
    totalFiles,
  }: Props) => {

    return (
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}
        <div>

          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">

            Files

          </h1>

          <p className="mt-1 text-xs text-zinc-500 md:text-sm">

            Manage uploads, deliverables, and shared project assets.

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center">

          <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/10 px-4 py-3 backdrop-blur-xl">

            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">

              Total Files

            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white md:text-2xl">

              {totalFiles}

            </h2>

          </div>

        </div>

      </div>
    );
  };

export default FilesHeader;