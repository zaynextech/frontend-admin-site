import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ui/ConfirmModal";
import Loader from "../components/ui/Loader";

interface Client {
  id: string;
  fullName: string;
}

interface Project {
  id: string;

  projectName: string;

  status: string;

  progress: number;

  priority?: string;

  deadline?: string;

  client: {
    fullName: string;
  };
}

const Projects = () => {

  const navigate =
    useNavigate();

  const [clients, setClients] =
    useState<Client[]>([]);

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [projectName, setProjectName] =
    useState("");

  const [clientId, setClientId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* EDIT STATES */
  const [editingProject, setEditingProject] =
    useState<Project | null>(
      null
    );

  const [editName, setEditName] =
    useState("");

  const [editStatus, setEditStatus] =
    useState("");

  const [editProgress, setEditProgress] =
    useState(0);

  const [editPriority, setEditPriority] =
    useState("");

  const [editDeadline, setEditDeadline] =
    useState("");

  /* FETCH */
  const fetchData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const [
          clientsResponse,
          projectsResponse,
        ] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/admin/clients`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),

          axios.get(
            `${import.meta.env.VITE_API_URL}/admin/projects`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          ),
        ]);

        setClients(
          clientsResponse.data
            .clients || []
        );

        setProjects(
          projectsResponse.data
            .projects || []
        );

      } catch (
        error
      ) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {

    fetchData();

  }, []);

  /* CREATE */
  const createProject =
    async () => {

      if (
        !projectName ||
        !clientId
      ) {

        toast.error(
          "Fill all fields"
        );

        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/projects`,
        {
          projectName,
          clientId,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

        setProjectName("");
        setClientId("");

        fetchData();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* DELETE */
  const deleteProject =
    async (
      id: string
    ) => {

      const confirmed =
  await ConfirmModal({
    title: "Delete Project?",
    text:
      "This action cannot be undone.",
    confirmText:
      "Yes, delete",
  });

if (!confirmed) {
  return;
}

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/projects/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

        setProjects(
          projects.filter(
            (project) =>
              project.id !== id
          )
        );

      } catch (
        error
      ) {

        console.log(error);

        toast.error(
          "Failed to delete project"
        );

      }
    };

  /* OPEN EDIT */
  const openEditModal =
    (
      project: Project
    ) => {

      setEditingProject(
        project
      );

      setEditName(
        project.projectName
      );

      setEditStatus(
        project.status
      );

      setEditProgress(
        project.progress
      );

      setEditPriority(
        project.priority || ""
      );

      setEditDeadline(
        project.deadline || ""
      );
    };

  /* UPDATE */
  const updateProject =
    async () => {

      if (!editingProject) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `${import.meta.env.VITE_API_URL}/admin/projects/${editingProject.id}`,
          {
            projectName:
              editName,

            status:
              editStatus,

            progress:
              editProgress,

            priority:
              editPriority,

            deadline:
              editDeadline,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setEditingProject(
          null
        );

        fetchData();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
          <Loader />
        </div>
    );
  }

  return (
  <div className="min-h-screen bg-black px-4 py-6 text-white md:px-8">

    {/* BACKGROUND GLOW */}
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

    {/* HEADER */}
    <div className="mb-8">

      <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
        Projects
      </h1>

      <p className="mt-2 text-sm text-zinc-500">
        Manage client projects
      </p>

      {/* SEARCH */}
      <div className="mt-6">

        <input
          type="text"
          placeholder="Search projects..."
          onChange={(e) => {

            const value =
              e.target.value.toLowerCase();

            fetchData();

            if (!value) {
              return;
            }

            setProjects(
              projects.filter(
                (project) =>
                  project.projectName
                    .toLowerCase()
                    .includes(value)
              )
            );
          }}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm backdrop-blur-xl transition focus:border-cyan-400/40 focus:outline-none"
        />

      </div>

    </div>

    {/* STATS */}
    <div className="mb-8 grid gap-4 md:grid-cols-3">

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

        <p className="text-sm text-zinc-500">
          Total Projects
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          {projects.length}
        </h2>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

        <p className="text-sm text-zinc-500">
          Completed
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-green-400">

          {
            projects.filter(
              (p) =>
                p.status ===
                "COMPLETED"
            ).length
          }

        </h2>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

        <p className="text-sm text-zinc-500">
          In Progress
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-cyan-400">

          {
            projects.filter(
              (p) =>
                p.status ===
                "IN_PROGRESS"
            ).length
          }

        </h2>

      </div>

    </div>

    {/* CREATE PROJECT */}
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">

      <h2 className="mb-5 text-lg font-semibold tracking-tight">
        Create Project
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) =>
            setProjectName(
              e.target.value
            )
          }
          className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
        />

        <select
          value={clientId}
          onChange={(e) =>
            setClientId(
              e.target.value
            )
          }
          className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
        >

          <option value="">
            Select Client
          </option>

          {clients.map(
            (client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.fullName}
              </option>
            )
          )}

        </select>

        <button
          onClick={
            createProject
          }
          className="h-11 rounded-xl bg-cyan-400 px-5 text-sm font-medium text-black transition hover:bg-cyan-300"
        >
          Create
        </button>

      </div>

    </div>

    {/* EMPTY */}
    {projects.length === 0 && (

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-zinc-500 backdrop-blur-xl">

        No projects found

      </div>

    )}

    {/* PROJECTS */}
    <div className="space-y-4">

      {projects.map(
        (project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-cyan-400/20"
          >

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h3 className="text-lg font-semibold tracking-tight">
                  {project.projectName}
                </h3>

                <p className="mt-2 text-sm text-zinc-500">

                  Client:
                  {" "}
                  {project.client.fullName}

                </p>

              </div>

              <div className="flex flex-wrap items-center gap-2">

                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-medium tracking-wide

                  ${
                    project.status === "COMPLETED"
                      ? "border-green-500/20 bg-green-500/10 text-green-400"
                      : project.status === "ON_HOLD"
                      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                      : "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
                  }`}
                >

                  {project.status}

                </span>

                <button
                  onClick={() =>
                    navigate(
                      `/projects/${project.id}`
                    )
                  }
                  className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/20"
                >
                  Details
                </button>

                <button
                  onClick={() =>
                    openEditModal(
                      project
                    )
                  }
                  className="rounded-lg border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-medium text-orange-300 transition hover:bg-orange-400/20"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProject(
                      project.id
                    )
                  }
                  className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2 text-xs font-medium text-red-300 transition hover:bg-red-400/20"
                >
                  Delete
                </button>

              </div>

            </div>

            {/* PROGRESS */}
            <div className="mt-6">

              <div className="mb-2 flex justify-between text-xs text-zinc-500">

                <span>
                  Progress
                </span>

                <span>
                  {project.progress}%
                </span>

              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">

                <div
                  className="h-full rounded-full bg-cyan-400 transition-all"
                  style={{
                    width:
                      `${project.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>
        )
      )}

    </div>

    {/* EDIT MODAL */}
    {editingProject && (

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">

          <h2 className="mb-6 text-xl font-semibold tracking-tight">
            Edit Project
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              value={editName}
              onChange={(e) =>
                setEditName(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            />

            <select
              value={editStatus}
              onChange={(e) =>
                setEditStatus(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            >

              <option value="IN_PROGRESS">
                IN_PROGRESS
              </option>

              <option value="COMPLETED">
                COMPLETED
              </option>

              <option value="ON_HOLD">
                ON_HOLD
              </option>

            </select>

            <input
              type="number"
              min={0}
              max={100}
              value={editProgress}
              onChange={(e) =>
                setEditProgress(
                  Number(
                    e.target.value
                  )
                )
              }
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            />

            <select
              value={editPriority}
              onChange={(e) =>
                setEditPriority(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            >

              <option value="LOW">
                LOW
              </option>

              <option value="MEDIUM">
                MEDIUM
              </option>

              <option value="HIGH">
                HIGH
              </option>

            </select>

            <input
              type="date"
              value={editDeadline}
              onChange={(e) =>
                setEditDeadline(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            />

            <div className="flex gap-3">

              <button
                onClick={
                  updateProject
                }
                className="flex-1 rounded-xl bg-cyan-400 py-3 text-sm font-medium text-black transition hover:bg-cyan-300"
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEditingProject(
                    null
                  )
                }
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      </div>

    )}

  </div>
);
};

export default Projects;