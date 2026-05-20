interface Project {
  id: string;

  projectName: string;

  description: string;

  status: string;

  progress: number;

  priority: string;

  budget?: string;

  deadline?: string;

  deploymentUrl?: string;

  repositoryUrl?: string;

  techStack?: string;

  quote?: {
    requiredFeaturesList?: string[];
  };

  client: {
    fullName: string;
    email: string;
  };
}

interface Props {
  project: Project;
}

const ProjectOverview =
  ({
    project,
  }: Props) => {

    return (
      <>
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {project.projectName}
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Main project workspace
            </p>

          </div>

          <span
            className={`w-fit rounded-full border px-4 py-2 text-xs font-medium tracking-wide

            ${
              project.status ===
              "COMPLETED"

                ? "border-green-500/20 bg-green-500/10 text-green-400"

                : project.status ===
                  "ON_HOLD"

                ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-300"

                : "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
            }`}
          >

            {project.status}

          </span>

        </div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* PROGRESS */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <p className="text-sm text-zinc-400">
              Progress
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              {project.progress}%
            </h2>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">

              <div
                style={{
                  width:
                    `${project.progress}%`,
                }}
                className="h-full rounded-full bg-cyan-400 transition-all"
              />

            </div>

          </div>

          {/* PRIORITY */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <p className="text-sm text-zinc-400">
              Priority
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {project.priority}
            </h2>

          </div>

          {/* BUDGET */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <p className="text-sm text-zinc-400">
              Budget
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {project.budget || "N/A"}
            </h2>

          </div>

          {/* DEADLINE */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <p className="text-sm text-zinc-400">
              Deadline
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {project.deadline || "N/A"}
            </h2>

          </div>

        </div>

        {/* CLIENT + TECH */}
        <div className="mt-6 grid gap-6 xl:grid-cols-2">

          {/* CLIENT */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <h2 className="mb-5 text-lg font-semibold tracking-tight">
              Client Information
            </h2>

            <div className="space-y-4">

              <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                <p className="text-xs text-zinc-400">
                  Full Name
                </p>

                <h3 className="mt-1 text-sm font-medium text-white">
                  {project.client.fullName}
                </h3>

              </div>

              <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                <p className="text-xs text-zinc-400">
                  Email Address
                </p>

                <h3 className="mt-1 text-sm font-medium text-white">
                  {project.client.email}
                </h3>

              </div>

            </div>

          </div>

          {/* TECH */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

            <h2 className="mb-5 text-lg font-semibold tracking-tight">
              Technical Details
            </h2>

            <div className="space-y-4">

              {/* CAPABILITIES */}
              <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                <p className="mb-3 text-xs uppercase tracking-wide text-zinc-300">
                  Project Capabilities
                </p>

               <div className="flex flex-wrap gap-2">

  {project.quote?.requiredFeaturesList &&
  project.quote.requiredFeaturesList.length > 0 ? (

    project.quote.requiredFeaturesList.map(
      (feature) => (

        <span
          key={feature}
          className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300"
        >

          {feature}

        </span>

      )
    )

  ) : (

    <span className="text-sm text-zinc-500">
      No capabilities added
    </span>

  )}

</div>

              </div>

              {/* TECH STACK */}
              {project.techStack && (

                <div className="rounded-xl border border-white/5 bg-black/20 p-4">

                  <p className="mb-3 text-xs uppercase tracking-wide text-zinc-300">
                    Tech Stack
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {project.techStack
                      .split(",")
                      .map((tech) => (

                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white"
                        >

                          {tech.trim()}

                        </span>

                      ))}

                  </div>

                </div>

              )}

              {/* LINKS */}
              <div className="flex flex-col gap-3">

                {project.repositoryUrl && (

                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm transition hover:border-cyan-400/20 hover:bg-white/[0.02]"
                  >

                    <span className="text-zinc-300">
                      Repository
                    </span>

                    <span className="text-cyan-300">
                      Open
                    </span>

                  </a>

                )}

                {project.deploymentUrl && (

                  <a
                    href={project.deploymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm transition hover:border-cyan-400/20 hover:bg-white/[0.02]"
                  >

                    <span className="text-zinc-300">
                      Live Deployment
                    </span>

                    <span className="text-cyan-300">
                      Visit
                    </span>

                  </a>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Project Description
          </h2>

          <p className="leading-7 text-sm text-zinc-300">

            {project.description || "No description provided."}

          </p>

          

        </div>
      </>
    );
  };

export default ProjectOverview;