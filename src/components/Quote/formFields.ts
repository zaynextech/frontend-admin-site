export const inputFields = [
  {
    name: "fullName",
    placeholder: "Full Name",
    type: "text",
  },

  {
    name: "companyName",
    placeholder: "Company / Organization",
    type: "text",
  },

  {
    name: "workEmail",
    placeholder: "Work Email",
    type: "email",
  },

  {
    name: "phoneNumber",
    placeholder: "Phone Number",
    type: "tel",
  },

  {
    name: "country",
    placeholder: "Country",
    type: "text",
  },

  {
    name: "companyWebsite",
    placeholder: "Company Website",
    type: "url",
  },

  {
    name: "rolePosition",
    placeholder: "Your Role / Position",
    type: "text",
  },

  {
    name: "estimatedUsers",
    placeholder: "Estimated Users",
    type: "text",
  },

  {
    name: "preferredContact",
    placeholder: "Preferred Contact Method",
    type: "text",
  },

  {
    name: "attachmentUrl",
    placeholder: "Attachment URL",
    type: "url",
    colSpan: "col-span-2",
  },
];

export const selectFields = [
  {
    name: "projectType",
    placeholder: "Project Type",
    options: [
      "SaaS Platform",
      "School Management System",
      "Hospital Management System",
      "ERP System",
      "Mobile App",
      "Booking Platform",
      "POS System",
      "AI Automation",
      "Custom Software",
    ],
  },

  {
    name: "budgetRange",
    placeholder: "Estimated Budget",
    options: [
      "$500 - $1,000",
      "$1,000 - $5,000",
      "$5,000 - $20,000",
      "$20,000+",
      "Need Consultation",
    ],
  },

  {
    name: "projectTimeline",
    placeholder: "Project Timeline",
    options: [
      "ASAP",
      "1 Month",
      "2 - 3 Months",
      "Flexible",
    ],
  },

  {
    name: "projectStatus",
    placeholder: "Project Status",
    options: [
      "Ready to start",
      "Comparing agencies",
      "Researching options",
      "Need consultation first",
    ],
  },
];

export const textareaFields = [
  {
    name: "projectDescription",
    placeholder:
      "Describe your project requirements...",
    className:
      "col-span-2 min-h-[180px]",
  },

  {
    name: "requiredFeatures",
    placeholder:
      "Required Features (comma separated)",
    className:
      "col-span-2 min-h-[120px]",
  },
];

export const checkboxFields = [
  {
    name: "ndaRequired",
    label: "NDA Required",
  },

  {
    name: "ongoingSupport",
    label: "Ongoing Support Needed",
  },
];