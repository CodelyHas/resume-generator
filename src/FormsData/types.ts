import { personalInformation } from './PersonalInformation';
import { educationalExperience } from './EducationalExperience';
import { professionalExperience } from './ProfessionalExperience';

export type FormField = {
  fieldName: string;
  inputId: string;
  type: string;
  placeholder: string;
  isBigInput?: boolean;
  value?: string;
  required?: boolean;
}

export type ProjectsData = {
  company: string;
  job: string;
  startDate: string;
  endDate: string;
  jobDesc: string;
}

type DataFromFields<T extends readonly { inputId: string }[]> = {
  [K in T[number] as K["inputId"]]: string;
}

export type PersonalInformationData = DataFromFields<typeof personalInformation.fields>;
export type EducationalExperienceData = DataFromFields<typeof educationalExperience.fields>;
export type ProfessionalExperienceData = DataFromFields<typeof professionalExperience.fields>;

export type SectionKey = keyof FormData;

export type FormData = {
  personalInformation: PersonalInformationData;
  educationalExperience: EducationalExperienceData;
  professionalExperience: ProfessionalExperienceData;
}

export {
  personalInformation,
  educationalExperience,
  professionalExperience,
}
