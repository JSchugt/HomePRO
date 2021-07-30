import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProjectByProjectId, getProjectByUserId } from "../../modules/projectsManager";
import { getStepByProjectId } from "../../modules/stepManager";
import { getProjectMaterialsByProjectid, deleteByProjectIdAndMaterialId } from "../../modules/projectMaterialsManager";

export const ProjectCard = () => {
    const [project, setProject] = useState({})
    const [steps, setSteps] = useState([])
    const [pm, setMaterials] = useState({})
    const [materials, setT] = useState([])
    const { projectId } = useParams();

    const getProjectById = () => {
        getProjectByProjectId(projectId).then(setProject)
    }
    const getStepsByProject = () => {
        getStepByProjectId(projectId).then(setSteps)
    }
    const getMaterialsByPMId = () => {
        getProjectMaterialsByProjectid(projectId).then(res => {
            setMaterials(res)
            if (res === 204) {
                setT([])
            }
            else {
                setT(res.materials)
            }
        })
    }
    useEffect(() => {
        getProjectById()
    }, [projectId])
    useEffect(() => {
        getStepsByProject()
    }, [projectId])
    useEffect(() => {
        getMaterialsByPMId()
    }, [projectId])
    const handleRemoveOnClick = (id, id2) => {

        deleteByProjectIdAndMaterialId(id, id2).then(getMaterialsByPMId())
    }
    return (<div>

        <h1>Project card</h1>
        <div>{project.name}</div>
        <div>{project.description}</div>
        <h2>
            {steps.map((step) => {
                return (<div key={step.id}>{step.description}</div>)
            })}

        </h2>
        <h2>
            Materials
            {materials.map((item, i) => { return (<div key={item.id + "" + i + "" + projectId}>{item.name} <button onClick={() => handleRemoveOnClick(projectId, item.id)}>Remove</button></div>) })}
        </h2>
    </div>
    )
}