import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  User2,
} from "lucide-react";

interface Lead {
  fullName: string;

  companyName: string;

  workEmail: string;

  phoneNumber: string;

  country: string;

  companyWebsite: string;

  rolePosition: string;

  preferredContact: string;
}

interface Props {
  lead: Lead;
}

const LeadClientProfile =
  ({
    lead,
  }: Props) => {

    const profileItems = [
      {
        label:
          "Full Name",

        value:
          lead.fullName,

        icon:
          User2,
      },

      {
        label:
          "Company",

        value:
          lead.companyName ||
          "N/A",

        icon:
          Building2,
      },

      {
        label:
          "Email Address",

        value:
          lead.workEmail,

        icon:
          Mail,
      },

      {
        label:
          "Phone Number",

        value:
          lead.phoneNumber,

        icon:
          Phone,
      },

      {
        label:
          "Country",

        value:
          lead.country ||
          "N/A",

        icon:
          MapPin,
      },

      {
        label:
          "Role / Position",

        value:
          lead.rolePosition ||
          "N/A",

        icon:
          User2,
      },
    ];

    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-xl font-semibold tracking-tight text-white">

              Client Profile

            </h2>

            <p className="mt-2 text-sm text-zinc-500">

              Contact identity and business information.

            </p>

          </div>

          {/* CONTACT METHOD */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">

            {lead.preferredContact ||
              "Email"}

          </div>

        </div>

        {/* GRID */}
        <div className="grid gap-4 md:grid-cols-2">

          {profileItems.map(
            (
              item
            ) => {

              const Icon =
                item.icon;

              return (
                <div
                  key={
                    item.label
                  }

                  className="group rounded-2xl border border-white/5 bg-black/20 p-4 transition duration-300 hover:border-cyan-400/20"
                >

                  <div className="flex items-start gap-4">

                    {/* ICON */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

                      <Icon size={20} />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">

                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

                        {item.label}

                      </p>

                      <h3 className="mt-2 break-words text-sm font-medium leading-6 text-white">

                        {item.value}

                      </h3>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* WEBSITE */}
        {lead.companyWebsite && (

          <div className="mt-5 rounded-2xl border border-white/5 bg-black/20 p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-300">

                  <Globe size={20} />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

                    Company Website

                  </p>

                  <p className="mt-2 break-all text-sm text-white">

                    {lead.companyWebsite}

                  </p>

                </div>

              </div>

              <a
                href={
                  lead.companyWebsite.startsWith(
                    "http"
                  )

                    ? lead.companyWebsite

                    : `https://${lead.companyWebsite}`
                }

                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
              >

                Visit Website

              </a>

            </div>

          </div>

        )}

      </div>
    );
  };

export default LeadClientProfile;