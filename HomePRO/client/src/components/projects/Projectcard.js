import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteProjectByProjectId, getProjectByProjectId } from "../../modules/projectsManager";
import { getStepByProjectId, deleteStepById } from "../../modules/stepManager";
import { getProjectMaterialsByProjectid, deleteByProjectIdAndMaterialId } from "../../modules/projectMaterialsManager";

export const ProjectCard = () => {
    const [project, setProject] = useState({})
    const [steps, setSteps] = useState([])
    const [pm, setMaterials] = useState({})
    const [materials, setT] = useState([])
    const { projectId } = useParams();
    const history = useHistory();
    const getProjectById = () => {
        getProjectByProjectId(projectId).then(setProject)
    }
    //   ---------------------------------------------------
    const getStepsByProject = () => {
        getStepByProjectId(projectId).then(setSteps)
    }
    //   ---------------------------------------------------
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
    const handleRemoveSteClie = (id) => {
        deleteStepById(id).then(getStepsByProject)
    }
    const handleClickEditMaterials = () => {
        history.push(`/Projects/${projectId}/Materials/Edit`)
    }

    const handleClickEditSteps = (steps) => {
        history.push(`/Projects/${projectId}/steps`)
    }
    const handleDeleClick = () => {
        deleteProjectByProjectId(projectId).then(history.push("/Projects"))
    }
    return (<div>

        <h1>Project card</h1>
        <div>{project.name}</div>
        <div>{project.description}</div>
        <h2>
            Steps
            {steps.length > 0 ? <div>

                {steps.map((step) => {
                    return (<div key={step.id}>{step.description}</div>)
                })}
            </div> : <button onClick={() => history.push(`/Projects/${projectId}/Steps/Create`)}>Add Steps</button>}
        </h2>
        <button onClick={() => handleClickEditSteps(steps)}>View Steps</button>
        <h2>
            Materials
            {materials.map((item, i) => { return (<div key={item.id + "" + i + "" + projectId}>{item.name} </div>) })}
        </h2>
        <div>

            <button onClick={() => handleClickEditMaterials()}>Edit Materials</button>
            <button>
                <Link to={`/Projects/${projectId}/Materials/Add`} >
                    Add Materials
                </Link>
            </button>
        </div>
        <button>
            <Link to={`/Projects/${projectId}/Edit`}>
                Edit Project
            </Link>
        </button>
        <button onClick={handleDeleClick}> Delete Project</button>
    </div>
    )
}