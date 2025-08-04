import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import {personalInformation, educationalExperience, professionalExperience } from './FormsData/types.ts';
import type { FormData, SectionKey } from './FormsData/types.ts';
import type {ProjectsData} from './FormsData/types.ts'
import FormBlock from './Components/FormBlock.tsx';
import ResumeRenderer from './Components/ResumeRenderer.tsx';
import { useState, useRef } from 'react';
import ProjectsBlock from './Components/ProjectsBlock.tsx';
import ResumeActions from './Components/ResumeActions.tsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function generateEmptyData(fields: readonly { inputId: string }[]) {
  return Object.fromEntries(fields.map(field => [field.inputId, ""]));
}

export default function App() {
  const resumeRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [projectIndex, setProjectIndex] = useState(-1)
  const [formData, setFormData] = useState<FormData>({
    personalInformation: generateEmptyData(personalInformation.fields),
    educationalExperience: generateEmptyData(educationalExperience.fields),
    professionalExperience: generateEmptyData(professionalExperience.fields)
  })

  const [projects, setProjects] = useState<ProjectsData[]>([]);

  const visibleProjects = projectIndex !== -1
  ? projects.map((project, index) =>
      index === projectIndex ? formData.professionalExperience as ProjectsData : project
    )
  : projects;

  const handlePdf = async () => {
    const element = resumeRef.current
    if(!element) return;

    const canvasOptions = {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
    }

    const canvas = await html2canvas(element, canvasOptions)
    const imageData = canvas.toDataURL("image/png", 1.0)

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: "mm",
      format: "a4"
    })

    const imgprops = pdf.getImageProperties(imageData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgprops.height * pdfWidth) / imgprops.width;
  
  pdf.addImage(
    imageData, 
    'PNG', 
    0, 
    0, 
    pdfWidth, 
    pdfHeight,
    undefined,
    'FAST'
  )
    pdf.save("my-resume.pdf")
  }

  function validateRequiredProjectFields(project: ProjectsData): boolean {
    return (
      project.company.trim() !== "" &&
      project.startDate.trim() !== "" &&
      project.endDate.trim() !== ""
    );
  }

  function emptyData(section?: SectionKey) {
    const sectionField = {
      personalInformation: personalInformation.fields,
      educationalExperience: educationalExperience.fields,
      professionalExperience: professionalExperience.fields,
    }

    if (section) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: generateEmptyData(sectionField[section])
      }))
    } else {
      setFormData({
        personalInformation: generateEmptyData(sectionField.personalInformation),
        educationalExperience: generateEmptyData(sectionField.educationalExperience),
        professionalExperience: generateEmptyData(sectionField.professionalExperience),
      })
      projects.length = 0
    }
  }

  function addProjects() {
    const { company, job, startDate, endDate, jobDesc } = formData.professionalExperience;

    const newProject: ProjectsData = {
      company, 
      job,
      startDate,
      endDate,
      jobDesc
    }

    if (!validateRequiredProjectFields(newProject)) {
    alert("Please fill in the required fields: Company, Start Date, and End Date.");
    return;
  }

    setProjects((prev) => [...prev, newProject]);
    emptyData(professionalExperience.sectionKey)
  }

  function onDelete(index:number) {
    setProjects(prev => prev.filter((_, i) => i !== index ))
  }


  function handleInputChange(sectionKey: SectionKey, inputId: string, value: string) {
    setFormData((prevData) => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        [inputId]: value
      }
    }));
  }

  function handleProjectEdits(index:number) {
    const project = projects[index];

    setFormData(prev => ({
      ...prev,
      professionalExperience: {
        company: project.company,
        job: project.job,
        startDate: project.startDate,
        endDate: project.endDate,
        jobDesc: project.jobDesc
      }
    }));
    setProjectIndex(index)
  }
  
  function onConfirmEdit() {
    if (projectIndex === null) return;

    const { company, job, startDate, endDate, jobDesc } = formData.professionalExperience;

    const updatedProject: ProjectsData = { company, job, startDate, endDate, jobDesc };

    if (!validateRequiredProjectFields(updatedProject)) {
      alert("Please fill in the required fields: Company, Start Date, and End Date.");
      return;
    }

    setProjects(prev => 
      prev.map((proj, i) => i === projectIndex ? updatedProject : proj)
    )

    emptyData(professionalExperience.sectionKey);
    setProjectIndex(-1);
  }

  function onDiscardEdit() {
    emptyData(professionalExperience.sectionKey)
    setProjectIndex(-1)
  }

  return (
    <div id='app-container'>
      <div id='formsContainer'>
        <ResumeActions onEmpty={emptyData} onSave={handlePdf}/>
        <FormBlock
          key={personalInformation.sectionKey}
          sectionKey={personalInformation.sectionKey}
          formName={personalInformation.formName}
          formIconClass={personalInformation.formIconClass}
          formFields={personalInformation.fields}
          formData={formData.personalInformation}
          isActive={activeIndex === 0}
          onExpand={() => setActiveIndex(0)}
          onChange={handleInputChange}
        />
        <FormBlock
          key={educationalExperience.sectionKey}
          sectionKey={educationalExperience.sectionKey}
          formName={educationalExperience.formName}
          formIconClass={educationalExperience.formIconClass}
          formFields={educationalExperience.fields}
          formData={formData.educationalExperience}
          isActive={activeIndex === 1}
          onExpand={() => setActiveIndex(1)}
          onChange={handleInputChange}
        />
        <FormBlock
          key={professionalExperience.sectionKey}
          sectionKey={professionalExperience.sectionKey}
          formName={professionalExperience.formName}
          formIconClass={professionalExperience.formIconClass}
          formFields={professionalExperience.fields}
          formData={formData.professionalExperience}
          isActive={activeIndex === 2}
          onExpand={() => setActiveIndex(2)}
          onAdd={addProjects}
          onChange={handleInputChange}
          hasAddButton={projectIndex === -1}
          editMode={projectIndex !== -1}
          onConfirmEdit={onConfirmEdit}
          onDiscardEdit={onDiscardEdit}
        />
        <ProjectsBlock onEdit={handleProjectEdits} onDelete={onDelete} projects={projects}/>
      </div>
      <div id="resumeContainer" ref={resumeRef}>
        <ResumeRenderer
        data={formData}
        projects={visibleProjects} />
      </div>
    </div>
  );
}
