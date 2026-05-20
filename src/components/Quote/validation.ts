import type { QuoteFormData } from "./types";

export const validateForm = (
  form: QuoteFormData
) => {
  const errors: Partial<
    Record<keyof QuoteFormData, string>
  > = {};

  // Full Name
  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  // Email
  if (!/\S+@\S+\.\S+/.test(form.workEmail)) {
    errors.workEmail = "Invalid email address";
  }

  // Phone
  if (!/^\+?[0-9]{7,15}$/.test(form.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
  }

  // Website
  if (
    form.companyWebsite &&
    !/^https?:\/\/.+\..+/.test(form.companyWebsite)
  ) {
    errors.companyWebsite = "Invalid website URL";
  }

  // Project Type
  if (!form.projectType) {
    errors.projectType = "Select project type";
  }

  // Project Description
  if (!form.projectDescription.trim()) {
    errors.projectDescription =
      "Project description is required";
  }

  return errors;
};