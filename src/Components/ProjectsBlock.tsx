import { useState } from "react";
import type {ProjectsData } from "../FormsData/types";

interface projectBlockProps {
    projects: ProjectsData[];
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
}

export default function ProjectsBlock({projects, onDelete, onEdit}:projectBlockProps) {
    const [isManaging, setIsmanaging] = useState(false)

    function onManage() {
        const body = document.body;

        if(!isManaging) body.style.overflow = "hidden";
        else body.style.overflow = ""

        setIsmanaging(!isManaging)
    }


    return (
    <>
        { projects.length > 0 && (
            <div className="regular-block">
                <h2 className="ml-2 text-[1.2em] font-bold">Added Projects:</h2>
                <button onClick={() => onManage()} className="manage-btn">Manage</button>
            </div>
        )}
        
        {isManaging && (
            <>
                <div className="modal-backdrop" onClick={onManage}/>
                <div id="projects-modal">
                    <button className="modal-close-btn" onClick={() => onManage()}><i className="fa-solid fa-xmark"></i></button>
                    <div id="modal-content">
                        <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
                        <ul className="list-none space-y-2">
                            {projects.map((project, index) => (
                                <li key={index} className="project-items">
                                    <span className="text-xl font-semibold flex-grow text-left">{project.company}</span> 
                                    <div className="list-actions">
                                        <button className="edit-btn" onClick={ ()=>{onManage(); onEdit(index);}}><i className="fa-solid fa-pen"></i></button>
                                        <button className="delete-btn" onClick={() => onDelete(index)}><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </li>
                               
                            ))}
                        </ul>
                    </div>
                    
                </div>
            </>
        )}
        
        {console.log(projects)}
    </>
    )
}