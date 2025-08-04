import type { FormField } from './types';

export const professionalExperience = {
    sectionKey: "professionalExperience",
    formName: "Professional Experience",
    formIconClass: "fa-solid fa-briefcase",
    fields: [{
            fieldName: "Company Name",
            inputId: "company",
            type: "text",
            placeholder: "Enter company's name.",
            required: true
        },
        {
            fieldName: "Job Title",
            inputId: "job",
            type: "text",
            placeholder: "Enter your job title."
        },
        {
            fieldName: "Job Description",
            inputId: "jobDesc",
            type: "text",
            placeholder: "Enter tasks, or describe your work.",
            isBigInput: true
        },
        {
            fieldName: "Start Date",
            inputId: "startDate",
            type: "month",
            placeholder: "mm/yyyy",
        },
        {
            fieldName: "End Date",
            inputId: "endDate",
            type: "month",
            placeholder: "mm/yyyy",
        }
    ] satisfies FormField[]
} as const

type Field = typeof professionalExperience.fields[number];
export type ProfessionalExperienceInputId = Field['inputId'];

export type ProfessionalExperienceData = {[K in ProfessionalExperienceInputId]: string;};