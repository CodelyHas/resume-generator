import type { FormData, ProjectsData } from '../FormsData/types';
interface ResumeRendererProps {
  data: FormData;
  projects: ProjectsData[];
  editingProjectData?: ProjectsData | null;
}

export default function ResumeRenderer({data, projects, editingProjectData}: ResumeRendererProps) {
     return (
          <div>
               <div id="personal">
                    <h1 className="text-4xl font-bold">{data.personalInformation.fullName || 'John doe'}</h1>
                    <p className="text-lg mt-2">{[(data.personalInformation.phone || "+555 555 5555"), (data.personalInformation.email || "JohnDoe@gmail.com")].join(" | ")}</p>
               </div>

               <div id="educational">
                    <h1 className="text-2xl font-bold mb-4">Education</h1>

                    <div className="resume-sections">
                         <span className="date">
                         {[(data.educationalExperience.startDate || "08/2021"), (data.educationalExperience.endDate || "11/2025")].join("-")}
                         </span>
                         <div className="flex flex-col items-start">
                              <span className="content-title font-bold">
                                   {data.educationalExperience.educationalPlace || "University of Oxford"}
                              </span>
                              <span className="text-lg">
                                   {data.educationalExperience.degree || "4.5"}
                              </span>
                         </div>
                    </div>

               </div>

               <div id="professional">
                    <h1 className="text-2xl font-bold mb-4">Professional Experience</h1>

                              
                              {projects.length > 0
                              ? ((editingProjectData ? [editingProjectData] : projects).map((project) => (
                                   <div className="resume-sections" key={project.company + project.job}>
                                   <span className="date whitespace-nowrap">{project.startDate}-{project.endDate}</span>
                                   <div className="flex flex-col items-start">
                                        <span className="content-title font-bold">{project.company}</span>
                                        <span className='text-lg'>{project.job}</span>
                                        <span className='project-desc'>{project.jobDesc}</span>
                                   </div>
                                   </div>
                              )))
                              :
                              (
                                <>          
                                   <div className="resume-sections">

                                        <span className="date whitespace-nowrap">08/2021-Present</span>

                                        <div className="flex flex-col items-start">
                                             <span className="content-title font-bold">TechSolutions Inc.</span>
                                             <span className="text-lg">Senior Frontend Developer</span>
                                             <span className="project-desc">
                                               Developed responsive web applications using React and TypeScript,
                                               led a team of 5 developers, and improved application performance by 40%.
                                            </span>
                                      </div>
                                   </div>
                                </>
                              )
                         }
               </div>
          </div>
     )
}