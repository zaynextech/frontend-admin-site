import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import Loader from "../components/ui/Loader";

import LeadHeader from "../components/leads/LeadHeader";
import LeadOverviewCards from "../components/leads/LeadOverviewCards";
import LeadInsights from "../components/leads/LeadInsights";
import LeadClientProfile from "../components/leads/LeadClientProfile";
import LeadProjectRequirements from "../components/leads/LeadProjectRequirements";
import LeadCapabilities from "../components/leads/LeadCapabilities";
import LeadDescription from "../components/leads/LeadDescription";
import LeadAttachments from "../components/leads/LeadAttachments";

interface Project {
  id: string;

  projectName: string;

  description: string;

  projectType: string;

  techStack: string;

  budget: string;

  deadline: string;

  status: string;

  priority: string;

  progress: number;

  createdAt: string;

  phoneNumber?: string;

  country?: string;

  companyWebsite?: string;

  rolePosition?: string;

  attachmentUrl?: string;

  estimatedUsers?: string;

  preferredContact?: string;

  ndaRequired?: boolean;

  ongoingSupport?: boolean;

  client: {
    id: string;

    fullName: string;

    email: string;
  };
}
const LeadDetails = () => {

  const { id } =
    useParams();


  const [project, setProject] =
    useState<Project | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProject =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/projects/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          setProject(
            response.data.project
          );

        } catch (
          error
        ) {

          console.log(error);

          toast.error(
            "Failed to fetch project"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchProject();

  }, [id]);

  /* LOADING */
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-black">

        <Loader />

      </div>
    );
  }

  /* NOT FOUND */
  if (!project) {

    return (
      <div className="p-10 text-red-400">

        Project not found

      </div>
    );
  }

  /* NOT FOUND */
  if (!project) {

    return (
      <div className="p-10 text-red-400">

        Lead not found

      </div>
    );
  }

const mappedLead = {
  id: project.id,

  fullName:
    project.client?.fullName || "Unknown Client",

  companyName:
    project.projectName || "Untitled Project",

  workEmail:
    project.client?.email || "",

  phoneNumber:
    project.phoneNumber || "",

  country:
    project.country || "",

  companyWebsite:
    project.companyWebsite || "",

  rolePosition:
    project.rolePosition || "",

  projectType:
    project.projectType || "",

  projectDescription:
    project.description || "",

  requiredFeatures:
    project.techStack || "",

  budgetRange:
    project.budget || "",

  projectTimeline:
    project.deadline || "",

  projectStatus:
    project.status || "",

  attachmentUrl:
    project.attachmentUrl || "",

  estimatedUsers:
    project.estimatedUsers || "",

  preferredContact:
    project.preferredContact || "",

  ndaRequired:
    project.ndaRequired || false,

  ongoingSupport:
    project.ongoingSupport || false,

  leadScore:
    project.priority || "NORMAL",

  isConverted: true,

  projectCreated: true,

  createdAt:
    project.createdAt,
};

return (
  <section className="min-h-screen bg-black px-4 py-6 text-white md:px-8">

    {/* BG */}
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_40%)]" />

    <div className="mx-auto max-w-[1700px] space-y-6">

      {/* HEADER */}
      <LeadHeader
        lead={mappedLead}
      />

      {/* KPI */}
      <LeadOverviewCards
        lead={mappedLead}
      />

      {/* INSIGHTS */}
      <LeadInsights
        lead={mappedLead}
      />

      {/* GRID */}
      <div className="grid gap-6 xl:grid-cols-2">

        <LeadClientProfile
          lead={mappedLead}
        />

        <LeadProjectRequirements
          lead={mappedLead}
        />

      </div>

      {/* CAPABILITIES */}
      <LeadCapabilities
        lead={mappedLead}
      />

      {/* DESCRIPTION */}
      <LeadDescription
        lead={mappedLead}
      />

      {/* ATTACHMENTS */}
      <LeadAttachments
        lead={mappedLead}
      />

    </div>

  </section>
  );
};

export default LeadDetails;