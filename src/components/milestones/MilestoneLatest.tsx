import type { Milestone } from "./types";

import { statusColors } from "./milestoneColors";

interface Props {
  milestone: Milestone;
}

const MilestoneLatest = ({
  milestone,
}: Props) => {

  const latestPayment =
    milestone.payments?.[0];

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">

      <div className="rounded-[22px] border border-white/5 bg-black/40 p-5">

        {/* TOP */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          {/* LEFT */}
          <div className="flex-1">

            <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/10 bg-cyan-500/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-300">

              Latest Milestone

            </div>

            <h3 className="text-xl font-semibold tracking-tight text-white">

              {milestone.title}

            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">

              {milestone.description ||
                "No milestone description provided."}

            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-600">

              <span>
                Created:
                {" "}
                {new Date(
                  milestone.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

          </div>

          {/* STATUS */}
          <div>

            <span
              className={`inline-flex rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]

              ${
                statusColors[
                  milestone.status
                ]
              }`}
            >

              {milestone.status}

            </span>

          </div>

        </div>

        {/* PAYMENT */}
        {latestPayment && (

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h4 className="text-sm font-semibold text-white">

                  {latestPayment.title}

                </h4>

                <p className="mt-1 text-xs text-zinc-500">

                  {latestPayment.currency}
                  {" "}
                  {latestPayment.amount}

                </p>

                {latestPayment.paidAt && (

                  <p className="mt-2 text-xs text-zinc-500">

                    Paid on:
                    {" "}
                    {new Date(
                      latestPayment.paidAt
                    ).toLocaleString()}

                  </p>
                )}

              </div>

              <div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]

                  ${
                    latestPayment.status ===
                    "PAID"

                      ? "border border-green-500/20 bg-green-500/10 text-green-300"

                      : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                  }`}
                >

                  {latestPayment.status}

                </span>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default MilestoneLatest;