import type { FormField } from './types';

export const personalInformation = {
            sectionKey: "personalInformation",
            formName: "Personal Information",
            formIconClass: "fa-solid fa-id-card",
            fields: [{
                fieldName: "Full Name",
                inputId: "fullName",
                type: "text",
                placeholder: "Enter your full name.",
            },
            {
                fieldName: "Email Address",
                inputId: "email",
                type: "email",
                placeholder: "Enter your email address.",
            },
            {
                fieldName: "Phone Number",
                inputId: "phone",
                type: "tel",
                placeholder: "Enter your phone number.",
            }
        ] as FormField[]
    } as const


type Field = typeof personalInformation.fields[number];
export type PersonalInformationInputId = Field['inputId'];
export type PersonalInformationData = { [K in PersonalInformationInputId]: string; };