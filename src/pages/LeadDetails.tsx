import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";


import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader";

interface Lead {
  id: string;

  fullName: string;

  companyName: string;

  workEmail: string;

  phoneNumber: string;

  country: string;

  companyWebsite: string;

  rolePosition: string;

  projectType: string;

  projectDescription: string;

  requiredFeatures: string;

  budgetRange: string;

  projectTimeline: string;

  projectStatus: string;

  attachmentUrl: string;

  estimatedUsers: string;

  preferredContact: string;

  ndaRequired: boolean;

  ongoingSupport: boolean;

  leadScore: string;

  isConverted: boolean;

  clientExists?: boolean;

  projectCreated?: boolean;

  createdAt: string;
}

const LeadDetails = () => {

  const { id } =
    useParams();

  const [lead, setLead] =
    useState<Lead | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [converting, setConverting] =
    useState(false);

  const [creatingProject, setCreatingProject] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const navigate =
    useNavigate();

  /* FETCH LEAD */
  useEffect(() => {

    const fetchLead =
      async () => {

        try {

          const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/quote/${id}`
          );

          console.log(
            "LEAD:",
            response.data.quote
          );

          setLead(
            response.data.quote
          );

        } catch (
          error
        ) {

          console.log(
            "Failed to fetch lead",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchLead();

  }, [id]);

  /* LOADING */
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <Loader />

      </div>
    );
  }

  /* NOT FOUND */
  if (!lead) {

    return (
      <div className="p-10 text-red-400">

        Lead not found

      </div>
    );
  }

  /* CONVERT */
  const convertLead =
    async () => {

      try {

        setConverting(true);

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/quote/${lead.id}/convert`
          );

        toast.success(
          `Client created successfully.

Email:
${response.data.client.email}

Password:
${response.data.generatedPassword}`
        );

        /* UPDATE UI */
        setLead(
          (
            prev
          ) => prev
            ? {
                ...prev,

                isConverted:
                  true,

                clientExists:
                  true,
              }
            : null
        );

      } catch (
        error: unknown
      ) {

        console.log(error);

        /* USER EXISTS */
        if (
          axios.isAxiosError(
            error
          ) &&

          error.response?.data
            ?.message ===
            "User already exists"
        ) {

          toast.success(
            "Client already exists. You can now create the project."
          );

          setLead(
            (
              prev
            ) => prev
              ? {
                  ...prev,

                  isConverted:
                    true,

                  clientExists:
                    true,
                }
              : null
          );

          return;
        }

        toast.error(
          axios.isAxiosError(
            error
          )

            ? error.response
                ?.data
                ?.message

            : "Conversion failed"
        );

      } finally {

        setConverting(false);

      }
    };

  /* CREATE PROJECT */
  const createProject =
    async () => {

      try {

        setCreatingProject(
          true
        );

        const response =
         await axios.post(
          `${import.meta.env.VITE_API_URL}/quote/${lead.id}/create-project`
        );

        toast.success(
          `Project created successfully.

Project:
${response.data.project.projectName}`
        );

        /* UPDATE UI */
        setLead(
          (
            prev
          ) => prev
            ? {
                ...prev,

                projectCreated:
                  true,
              }
            : null
        );

      } catch (
        error: unknown
      ) {

        console.log(error);

        toast.error(
          axios.isAxiosError(
            error
          )

            ? error.response
                ?.data
                ?.message

            : "Project creation failed"
        );

      } finally {

        setCreatingProject(
          false
        );

      }
    };

  /* DELETE */
  const deleteLead =
    async () => {

      const confirmed =
        window.confirm(
          "Are you sure you want to permanently delete this lead?"
        );

      if (!confirmed)
        return;

      try {

        setDeleting(
          true
        );

        await axios.delete(
          `${import.meta.env.VITE_API_URL}/quote/${lead.id}`
        );

        toast.success(
          "Lead deleted successfully"
        );

        navigate(
          "/leads"
        );

      } catch (
        error: unknown
      ) {

        console.log(error);

        toast.error(
          axios.isAxiosError(
            error
          )

            ? error.response
                ?.data
                ?.message

            : "Failed to delete lead"
        );

      } finally {

        setDeleting(
          false
        );

      }
    };

  if (!lead) {

    return (
      <div className="p-10 text-red-400">
        Lead not found
      </div>
    );
  }


  

  return (
    <section className="p-10 text-white">

      {/* HEADER */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-5">

        <div>

          <h1 className="text-4xl font-black">
            Lead Details
          </h1>

          <p className="mt-2 text-slate-400">

            Full enterprise inquiry overview

          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold

          ${
            lead.leadScore ===
            "enterprise"

              ? "bg-green-500/20 text-green-400"

              : lead.leadScore ===
                "urgent"

              ? "bg-orange-500/20 text-orange-400"

              : "bg-blue-500/20 text-blue-400"
          }`}
        >

          {lead.leadScore}

        </span>

      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* CLIENT */}
        <div className="rounded-3xl border border-white/5 bg-[#111] p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Client Information
          </h2>

          <div className="space-y-4 text-sm">

            <p>
              <span className="text-slate-400">
                Full Name:
              </span>
              {" "}
              {lead.fullName}
            </p>

            <p>
              <span className="text-slate-400">
                Company:
              </span>
              {" "}
              {lead.companyName}
            </p>

            <p>
              <span className="text-slate-400">
                Email:
              </span>
              {" "}
              {lead.workEmail}
            </p>

            <p>
              <span className="text-slate-400">
                Phone:
              </span>
              {" "}
              {lead.phoneNumber}
            </p>

            <p>
              <span className="text-slate-400">
                Country:
              </span>
              {" "}
              {lead.country}
            </p>

            <p>
              <span className="text-slate-400">
                Website:
              </span>
              {" "}
              {lead.companyWebsite}
            </p>

            <p>
              <span className="text-slate-400">
                Role:
              </span>
              {" "}
              {lead.rolePosition}
            </p>

          </div>

        </div>

        {/* PROJECT */}
        <div className="rounded-3xl border border-white/5 bg-[#111] p-6">

          <h2 className="mb-6 text-2xl font-bold">
            Project Details
          </h2>

          <div className="space-y-4 text-sm">

            <p>
              <span className="text-slate-400">
                Project Type:
              </span>
              {" "}
              {lead.projectType}
            </p>

            <p>
              <span className="text-slate-400">
                Budget:
              </span>
              {" "}
              {lead.budgetRange}
            </p>

            <p>
              <span className="text-slate-400">
                Timeline:
              </span>
              {" "}
              {lead.projectTimeline}
            </p>

            <p>
              <span className="text-slate-400">
                Status:
              </span>
              {" "}
              {lead.projectStatus}
            </p>

            <p>
              <span className="text-slate-400">
                Estimated Users:
              </span>
              {" "}
              {lead.estimatedUsers}
            </p>

            <p>
              <span className="text-slate-400">
                Preferred Contact:
              </span>
              {" "}
              {lead.preferredContact}
            </p>

          </div>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-6 rounded-3xl border border-white/5 bg-[#111] p-6">

        <h2 className="mb-5 text-2xl font-bold">
          Project Description
        </h2>

        <p className="leading-relaxed text-slate-300">

          {lead.projectDescription}

        </p>

      </div>

      {/* FEATURES */}
      <div className="mt-6 rounded-3xl border border-white/5 bg-[#111] p-6">

        <h2 className="mb-5 text-2xl font-bold">
          Required Features
        </h2>

        <p className="leading-relaxed text-slate-300">

          {lead.requiredFeatures}

        </p>

      </div>

      {/* ATTACHMENT */}
      {lead.attachmentUrl && (

        <div className="mt-6 rounded-3xl border border-white/5 bg-[#111] p-6">

          <h2 className="mb-5 text-2xl font-bold">
            Attachments
          </h2>

          <a
            href={lead.attachmentUrl}

            target="_blank"

            rel="noreferrer"

            className="text-cyan-400 underline"
          >
            Open Attachment
          </a>

        </div>
      )}
      {/* ACTIONS */}
{/* ACTIONS */}
<div className="mt-8 flex flex-wrap gap-4">

  <button
  onClick={deleteLead}

  disabled={deleting}

  className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3 font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white disabled:opacity-50"
>
  {deleting
    ? "Deleting..."
    : "Delete Lead"}
</button>
  

  {lead.isConverted ? (

    <div className="rounded-2xl bg-green-500/20 px-6 py-3 font-semibold text-green-400">

      Already A Client

    </div>

  ) : (

    <button
      onClick={convertLead}

      disabled={converting}

      className="rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black"
    >

      {converting
        ? "Converting..."
        : "Convert To Client"
        
        }

    </button>

  )}

</div>

      {/* OPTIONS */}
      <div className="mt-6 flex flex-wrap gap-4">

        {lead.ndaRequired && (

          <span className="rounded-full bg-red-500/20 px-4 py-2 text-sm text-red-400">
            NDA Required
          </span>

        )}

        {lead.ongoingSupport && (

          <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
            Ongoing Support Needed
          </span>

        )}

        {lead.isConverted && (

  <button
    onClick={createProject}

    disabled={creatingProject}

    className="rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black"
  >

    {creatingProject
      ? "Creating..."
      : "Create Project"}

  </button>

)}

      </div>

    </section>
  );
};

export default LeadDetails;
