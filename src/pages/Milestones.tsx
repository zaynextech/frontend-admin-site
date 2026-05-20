import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Loader from "../components/ui/Loader";

import MilestoneHeader from "../components/milestones/MilestoneHeader";

import MilestoneProjectCard from "../components/milestones/MilestoneProjectCard";

import type {
  Project,
} from "../components/milestones/types";

const Milestones = () => {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<string | null>(
    null
  );

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  /* FETCH */
  const fetchProjects =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/projects`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setProjects(
          response.data.projects || []
        );

      } catch (
        error
      ) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();

  }, []);

  /* CREATE */
  const createMilestone =
    async (
      projectId: string
    ) => {

      if (!title) {
        return;
      }

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          `${import.meta.env.VITE_API_URL}/admin/milestones`,
          {
            title,
            description,
            projectId,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setTitle("");

        setDescription("");

        fetchProjects();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* UPDATE */
  const updateStatus =
    async (
      milestoneId: string,
      status: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
            `${import.meta.env.VITE_API_URL}/admin/milestones/${milestoneId}`,
            {
              status,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        fetchProjects();

      } catch (
        error
      ) {

        console.log(error);

      }
    };

  /* DELETE */
  const deleteMilestone =
    async (
      id: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/milestones/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchProjects();

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
  <section className="min-h-screen bg-black px-4 py-6 text-white md:px-8">

    {/* BACKGROUND */}
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

    {/* HEADER */}
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

      <div>

        

        <MilestoneHeader />

      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">

          <p className="text-xs text-zinc-500">
            Projects
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {projects.length}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">

          <p className="text-xs text-zinc-500">
            Milestones
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight">

            {projects.reduce(
              (
                total,
                project
              ) =>
                total +
                project.milestones.length,
              0
            )}

          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">

          <p className="text-xs text-zinc-500">
            Active
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-cyan-300">

            {
              projects.filter(
                (project) =>
                  project.status ===
                  "IN_PROGRESS"
              ).length
            }

          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl">

          <p className="text-xs text-zinc-500">
            Completed
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-green-300">

            {
              projects.filter(
                (project) =>
                  project.status ===
                  "COMPLETED"
              ).length
            }

          </h3>

        </div>

      </div>

    </div>

    {/* PROJECTS */}
    <div className="space-y-5">

      {projects.map(
        (project) => (

          <div
            key={project.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl"
          >

            <div className="rounded-[22px] border border-white/5 bg-black/40 p-5">

              <MilestoneProjectCard
                project={
                  project
                }

                selectedProject={
                  selectedProject
                }

                setSelectedProject={
                  setSelectedProject
                }

                title={title}

                setTitle={
                  setTitle
                }

                description={
                  description
                }

                setDescription={
                  setDescription
                }

                createMilestone={
                  createMilestone
                }

                updateStatus={
                  updateStatus
                }

                deleteMilestone={
                  deleteMilestone
                }
              />

            </div>

          </div>

        )
      )}

    </div>

  </section>
);
};

export default Milestones;