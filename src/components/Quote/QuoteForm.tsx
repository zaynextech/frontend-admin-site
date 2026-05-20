import { useState } from "react";

import axios from "axios";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FormCheckbox from "./FormCheckbox";

import {
  inputFields,
  selectFields,
  textareaFields,
  checkboxFields,
} from "./formFields";

import { validateForm } from "./validation";

import type { QuoteFormData } from "./types";

import { Button } from "../../../components/ui/button";

import toast from "react-hot-toast";
import FeatureSelector from "./FeatureSelector";

const QuoteForm = () => {

  const initialForm: QuoteFormData = {

    fullName: "",

    companyName: "",

    workEmail: "",

    phoneNumber: "",

    country: "",

    companyWebsite: "",

    rolePosition: "",

    projectType: "",

    projectDescription: "",

    requiredFeatures: [],

    budgetRange: "",

    projectTimeline: "",

    projectStatus: "",

    attachmentUrl: "",

    estimatedUsers: "",

    preferredContact: "",

    ndaRequired: false,

    ongoingSupport: false,
  };

  const [form, setForm] =
    useState<QuoteFormData>(
      initialForm
    );

  const [errors, setErrors] =
    useState<
      Partial<
        Record<
          keyof QuoteFormData,
          string
        >
      >
    >({});

  const [loading, setLoading] =
    useState(false);

  /* HANDLE CHANGE */
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {

    const {
      name,
      value,
      type,
    } = e.target;

    const checked =
      e.target instanceof
      HTMLInputElement

        ? e.target.checked

        : false;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* SUBMIT */
  const submitQuote =
    async () => {

      const validationErrors =
        validateForm(form);

      if (
        Object.keys(
          validationErrors
        ).length > 0
      ) {

        setErrors(
          validationErrors
        );

        return;
      }

      try {

        setLoading(true);

     await axios.post(
        `${import.meta.env.VITE_API_URL}/quote`,
        {
          ...form,

          requiredFeatures:
            form.requiredFeatures.join(
              ", "
            ),
        }
      );

        toast.success(
          "Quote request submitted successfully."
        );

        setForm(
          initialForm
        );

        setErrors({});

      } catch {

        toast.error(
          "Failed to submit quote."
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <section className="min-h-screen bg-[#030303] px-6 py-20 text-white lg:px-10">

      {/* BG */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-full -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-20 text-center">

          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">

            Enterprise Quote Request

          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-[0.9] tracking-tight lg:text-7xl">

            Let’s Architect
            <br />

            <span className="text-zinc-500">

              Your Digital Infrastructure

            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">

            Submit your project requirements and our engineering team will prepare a tailored software proposal.

          </p>

        </div>

        {/* FORM */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-10">

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">

            {/* SECTION */}
            <div className="col-span-full border-b border-white/5 pb-4">

              <h2 className="text-xs font-mono tracking-[0.3em] text-cyan-400">

                01. CLIENT IDENTITY

              </h2>

            </div>

            {/* INPUTS */}
            {inputFields.map(
              (field) => (

                <FormInput
                  key={field.name}

                  name={field.name}

                  placeholder={field.placeholder}

                  type={field.type}

                  value={
                    form[
                      field.name as keyof QuoteFormData
                    ] as string
                  }

                  error={
                    errors[
                      field.name as keyof QuoteFormData
                    ]
                  }

                  className={field.colSpan}

                  onChange={handleChange}
                />
              )
            )}

            {/* SECTION */}
            <div className="col-span-full mt-6 border-b border-white/5 pb-4">

              <h2 className="text-xs font-mono tracking-[0.3em] text-purple-400">

                02. PROJECT SPECIFICATIONS

              </h2>

            </div>

            {/* SELECTS */}
            {selectFields.map(
              (field) => (

                <FormSelect
                  key={field.name}

                  name={field.name}

                  value={
                    form[
                      field.name as keyof QuoteFormData
                    ] as string
                  }

                  placeholder={field.placeholder}

                  options={field.options}

                  error={
                    errors[
                      field.name as keyof QuoteFormData
                    ]
                  }

                  onChange={handleChange}
                />
              )
            )}

            {/* TEXTAREAS */}
            {textareaFields.map(
              (field) => {

                if (
                  field.name ===
                  "requiredFeatures"
                ) {

                  return (
                    <FeatureSelector
                      key={field.name}

                      value={
                        form.requiredFeatures
                      }

                      onChange={(
                        value: string[]
                      ) =>
                        setForm(
                          (
                            prev
                          ) => ({
                            ...prev,

                            requiredFeatures:
                              value,
                          })
                        )
                      }
                    />
                  );
                }

                return (
                  <FormTextarea
                    key={field.name}

                    name={field.name}

                    placeholder={field.placeholder}

                    value={
                      form[
                        field.name as keyof QuoteFormData
                      ] as string
                    }

                    error={
                      errors[
                        field.name as keyof QuoteFormData
                      ]
                    }

                    className={field.className}

                    onChange={handleChange}
                  />
                );
              }
            )}

            {/* CHECKBOX */}
            <div className="col-span-full mt-2 flex flex-wrap gap-8 rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-6">

              {checkboxFields.map(
                (field) => (

                  <FormCheckbox
                    key={field.name}

                    name={field.name}

                    label={field.label}

                    checked={
                      form[
                        field.name as keyof QuoteFormData
                      ] as boolean
                    }

                    onChange={handleChange}
                  />
                )
              )}

            </div>

          </div>

          {/* INFO */}
          <div className="mt-14 rounded-3xl border border-cyan-500/10 bg-cyan-500/[0.03] p-8">

            <h3 className="text-2xl font-bold">

              Serious Project Inquiries Only

            </h3>

            <p className="mt-3 leading-relaxed text-zinc-400">

              Our engineering team reviews enterprise-grade software requests, scalable SaaS platforms, AI systems, ERP infrastructures, and serious digital transformation projects.

            </p>

          </div>

          {/* BUTTON */}
          <Button
            onClick={submitQuote}

            disabled={loading}

            className="mt-10 h-14 w-full rounded-2xl bg-cyan-400 text-lg font-bold text-black transition-all hover:bg-cyan-300"
          >

            {loading

              ? "Submitting..."

              : "Submit Enterprise Quote Request"}

          </Button>

        </div>

      </div>

    </section>
  );
};

export default QuoteForm;