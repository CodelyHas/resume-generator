import type { FormField } from './types';

export const educationalExperience = {
        sectionKey: "educationalExperience",
        formName: "Educational Experience",
        formIconClass: "fa-solid fa-graduation-cap",
        fields: [
            {
                fieldName: "School or University",
                inputId: "educationalPlace",
                type: "text",
                placeholder: "Enter your school or univesity",
            },
            {
                fieldName: "Degree",
                inputId: "degree",
                type: "text",
                placeholder: "Enter your degree/field of study",
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


type Field = typeof educationalExperience.fields[number];
export type EducationalExperienceInputId = Field['inputId'];
export type EducationalExperienceData = { [K in EducationalExperienceInputId]: string };