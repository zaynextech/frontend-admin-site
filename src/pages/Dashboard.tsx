import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FolderKanban,
  CircleDollarSign,
  Users,
  CheckCircle2,
  Clock3,
  Wallet,
  Target,
  Activity,
} from "lucide-react";

interface Project {
  id: string;
  projectName: string;
  status: string;
  progress: number;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
}

interface Stats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalClients: number;
  totalRevenue: number;
  pendingPayments: number;
  paidPayments: number;
  totalMilestones: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}
interface Client {
  fullName: string;
  email: string;
}

interface Milestone {
  id: string;
  title: string;
  payments?: Payment[];
}

interface ProjectData {
  id: string;
  projectName: string;
  status: string;
  progress: number;
  client?: Client;
  milestones: Milestone[];
}

const StatCard = ({
  title,
  value,
  icon,
  color,
}: StatCardProps) => {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">

            {title}

          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">

            {value}

          </h2>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >

          {icon}

        </div>

      </div>

    </div>
  );
};

const Dashboard = () => {

  const [loading, setLoading] =
    useState(true);

  const [projects, setProjects] =
    useState<Project[]>([]);

 

  const [stats, setStats] =
    useState<Stats>({
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      totalClients: 0,
      totalRevenue: 0,
      pendingPayments: 0,
      paidPayments: 0,
      totalMilestones: 0,
    });

  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const projectsResponse =
            await axios.get(
              `${import.meta.env.VITE_API_URL}/admin/projects`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const projectsData: ProjectData[] =
              projectsResponse.data
                .projects || [];

          setProjects(
            projectsData
          );

          const allPayments =
            projectsData.flatMap(
              (project: ProjectData) =>
                project.milestones.flatMap(
                  (milestone: Milestone) =>
                    milestone.payments ||
                    []
                )
            );

          

          const totalRevenue =
  allPayments
    .filter(
      (payment: Payment) =>
        payment.status ===
        "PAID"
    )
    .reduce(
      (
        total: number,
        payment: Payment
      ) =>
        total +
        payment.amount,
      0
    );

          const pendingPayments =
            allPayments.filter(
              (payment: Payment) =>
                payment.status ===
                "PENDING"
            ).length;

          const paidPayments =
            allPayments.filter(
              (payment: Payment) =>
                payment.status ===
                "PAID"
            ).length;

          const totalMilestones =
            projectsData.reduce(
              (total: number, project: ProjectData) =>
                total +
                project.milestones
                  .length,
              0
            );

          const uniqueClients =
            new Set(
              projectsData.map(
                (project: ProjectData) =>
                  project.client
                    ?.email
              )
            );

          setStats({
            totalProjects:
              projectsData.length,

            activeProjects:
              projectsData.filter(
                (project: ProjectData) =>
                  project.status ===
                  "IN_PROGRESS"
              ).length,

            completedProjects:
              projectsData.filter(
                (project: ProjectData) =>
                  project.status ===
                  "COMPLETED"
              ).length,

            totalClients:
              uniqueClients.size,

            totalRevenue,

            pendingPayments,

            paidPayments,

            totalMilestones,
          });

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchDashboard();

  }, []);

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">

        Loading Dashboard...

      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black px-4 py-6 text-white md:px-8">

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}
        <div>

          <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/10 bg-cyan-500/5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300">

            Zaynex Admin Control Center

          </div>

          <h1 className="text-4xl font-bold tracking-tight">

            Dashboard Overview

          </h1>

          <p className="mt-2 text-zinc-500">

            Monitor projects, milestones, revenue, and client activity.

          </p>

        </div>

        {/* STATS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={
              <FolderKanban size={26} />
            }
            color="bg-cyan-500/10 text-cyan-300"
          />

          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            icon={
              <Activity size={26} />
            }
            color="bg-blue-500/10 text-blue-300"
          />

          <StatCard
            title="Completed Projects"
            value={stats.completedProjects}
            icon={
              <CheckCircle2 size={26} />
            }
            color="bg-green-500/10 text-green-300"
          />

          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            icon={
              <Users size={26} />
            }
            color="bg-purple-500/10 text-purple-300"
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.totalRevenue}`}
            icon={
              <CircleDollarSign size={26} />
            }
            color="bg-emerald-500/10 text-emerald-300"
          />

          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon={
              <Clock3 size={26} />
            }
            color="bg-yellow-500/10 text-yellow-300"
          />

          <StatCard
            title="Paid Payments"
            value={stats.paidPayments}
            icon={
              <Wallet size={26} />
            }
            color="bg-cyan-500/10 text-cyan-300"
          />

          <StatCard
            title="Milestones"
            value={stats.totalMilestones}
            icon={
              <Target size={26} />
            }
            color="bg-pink-500/10 text-pink-300"
          />

        </div>

        {/* RECENT PROJECTS */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-semibold">

                Recent Projects

              </h2>

              <p className="mt-1 text-sm text-zinc-500">

                Latest active project activity

              </p>

            </div>

          </div>

          <div className="space-y-4">

            {projects
              .slice(0, 6)
              .map(
                (
                  project
                ) => (

                  <div
                    key={
                      project.id
                    }
                    className="rounded-2xl border border-white/10 bg-black/30 p-5"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div>

                        <h3 className="text-lg font-semibold">

                          {
                            project.projectName
                          }

                        </h3>

                        <p className="mt-2 text-sm text-zinc-500">

                          Project progress:
                          {" "}
                          {
                            project.progress
                          }%

                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]

                          ${
                            project.status ===
                            "COMPLETED"

                              ? "border border-green-500/20 bg-green-500/10 text-green-300"

                              : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                          }`}
                        >

                          {
                            project.status
                          }

                        </span>

                      </div>

                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">

                      <div
                        style={{
                          width:
                            `${project.progress}%`,
                        }}
                        className="h-full rounded-full bg-cyan-400"
                      />

                    </div>

                  </div>
                )
              )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default Dashboard;