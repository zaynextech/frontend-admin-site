import {
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-hot-toast/headless";

interface Project {
  id: string;

  projectName: string;

  payments?: Payment[];
}

interface Milestone {
  id: string;

  title: string;
}

interface Payment {
  id: string;

  title: string;

  description?: string;

  amount: number;

  currency: string;

  status: string;

  createdAt: string;

  paidAt?: string;
}

export default function AdminPayments() {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [milestones, setMilestones] =
    useState<Milestone[]>([]);

  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [projectId, setProjectId] =
    useState("");

  const [milestoneId, setMilestoneId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const fetchProjects =
    useCallback(async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/admin/projects`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setProjects(
            data.projects
          );
        }

      } catch (error) {

        console.error(error);
      }

    }, []);

  const fetchMilestones =
    useCallback(async (
      selectedProjectId: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/milestones/${selectedProjectId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setMilestones(
            data.milestones
          );
        }

      } catch (error) {

        console.error(error);
      }

    }, []);

  const fetchPayments =
    useCallback(async (
      selectedProjectId: string
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            `${import.meta.env.VITE_API_URL}/payments/project/${selectedProjectId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (data.success) {

          setPayments(
            data.payments
          );
        }

      } catch (error) {

        console.error(error);
      }

    }, []);

  useEffect(() => {

    const loadProjects =
      async () => {

        await fetchProjects();
      };

    loadProjects();

  }, [fetchProjects]);

  useEffect(() => {

  if (!projectId) return;

  const loadData =
    async () => {

      await fetchMilestones(
        projectId
      );

      await fetchPayments(
        projectId
      );
    };

  loadData();

  const interval =
    setInterval(() => {

      fetchPayments(
        projectId
      );

    }, 5000);

  return () =>
    clearInterval(interval);

}, [
  projectId,
  fetchMilestones,
  fetchPayments,
]);

 const createPayment =
  async () => {

    try {

      if (
        !projectId ||
        !milestoneId ||
        !title ||
        !amount
      ) {

       toast.error(
  "Please fill all required fields"
);

        return;
      }

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/payments/create`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              projectId,
              milestoneId,
              title,
              description,
              amount:
                Number(amount),
              dueDate,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {

        toast.error(
  data.message ||
          "Failed to create payment"
        );

        return;
      }

      console.log(
            "Payment created successfully"
            );

      setTitle("");
      setDescription("");
      setAmount("");
      setDueDate("");
      setMilestoneId("");

      fetchPayments(
        projectId
      );

    } catch (error) {

      console.error(error);

      toast.error(
  "Something went wrong"
);

    } finally {

      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black px-4 py-6 text-white md:px-8">

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

      <div className="mx-auto max-w-6xl space-y-6">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">

            Project Payments

          </h1>

          <p className="mt-2 text-zinc-500">

            Create and manage milestone payments.

          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm text-zinc-400">

                Select Project

              </label>

              <select
                value={projectId}
                onChange={(e) =>
                  setProjectId(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-3"
              >

                <option value="">

                  Choose project

                </option>

                {projects.map(
                  (project) => (

                    <option
                      key={project.id}
                      value={project.id}
                    >

                      {project.projectName}

                    </option>
                  )
                )}

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm text-zinc-400">

                Select Milestone

              </label>

              <select
                value={milestoneId}
                onChange={(e) =>
                  setMilestoneId(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-3"
              >

                <option value="">

                  Choose milestone

                </option>

                {milestones.map(
                  (milestone) => (

                    <option
                      key={milestone.id}
                      value={milestone.id}
                    >

                      {milestone.title}

                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          <div className="mt-5 grid gap-5">

            <div>

              <label className="mb-2 block text-sm text-zinc-400">

                Payment Title

              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="UI Design Payment"
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-zinc-400">

                Description

              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Payment description"
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/40 p-3"
              />

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm text-zinc-400">

                  Amount

                </label>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  placeholder="15000"
                  className="w-full rounded-2xl border border-white/10 bg-black/40 p-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm text-zinc-400">

                  Due Date

                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/40 p-3"
                />

              </div>

            </div>

            <button
              onClick={createPayment}
              disabled={loading}
              className="rounded-2xl bg-white py-3 font-semibold text-black transition hover:opacity-90"
            >

              {loading

                ? "Creating Payment..."

                : "Create Payment"}

            </button>

          </div>

        </div>

        {payments.length > 0 && (

          <div className="space-y-4">

            {payments.map(
              (payment) => (

                <div
                  key={payment.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                    <h2 className="text-xl font-semibold">

                        {payment.title}

                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">

                        {payment.description ||
                        "No description"}

                    </p>

                    {payment.paidAt && (

                        <p className="mt-2 text-xs text-zinc-500">

                        Paid on:
                        {" "}
                        {new Date(
                            payment.paidAt
                        ).toLocaleString()}

                        </p>
                    )}

                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">

                        {payment.currency}
                        {" "}
                        {payment.amount}

                      </span>

                      <span
                        className={`rounded-full px-3 py-1 ${
                          payment.status ===
                          "PAID"

                            ? "border border-green-500/20 bg-green-500/10 text-green-300"

                            : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                        }`}
                      >

                        {payment.status}

                      </span>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

        

      </div>

    </section>
  );
}