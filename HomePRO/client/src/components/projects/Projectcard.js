import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { deleteProjectByProjectId, getProjectByProjectId } from "../../modules/projectsManager";
import { getStepByProjectId } from "../../modules/stepManager";
import { getProjectMaterialsByProjectid } from "../../modules/projectMaterialsManager";
import "./projects.css"
export const ProjectCard = () => {
    const [project, setProject] = useState({})
    const [steps, setSteps] = useState([])
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
    }, projectId)
    useEffect(() => {
        getMaterialsByPMId()
    }, [projectId])
    const handleClickViewMaterials = () => {
        history.push(`/Projects/${projectId}/Materials/`)
    }
    const handleClickEditSteps = (steps) => {
        history.push(`/Projects/${projectId}/steps`)
    }
    const handleDeleClick = () => {
        if (window.confirm("Are you sure you want to delete this project")) {

            deleteProjectByProjectId(projectId).then(history.push("/Projects"))
        }
    }
    return (<div className="maincard">
        <h1>Project card</h1>
        <div className="projectHead">
            <div>
                <h2 id="projDescription">{project.name}</h2>
                <h2 id="projDescription">{project.description}</h2>
            </div>
            <img src={project.projectImage} style={{ width: '300px' }} />
        </div>
        <div className="projlistspace">
            <div className="step_materials">
                <div>
                    <h2>
                        Steps
                        {steps.length > 0 ? <div >
                            {steps.map((step) => {
                                return (<div key={step.id}>{step.description}</div>)
                            })}
                        </div> : <button onClick={() => history.push(`/Projects/${projectId}/Steps/Create`)}>Add Steps</button>}
                    </h2>

                </div>
                <div className="projlistspace"></div>
                <div className="materialsspace">
                    <h2>
                        Materials
                        {materials.map((item, i) => { return (<div key={item.id + "" + i + "" + projectId}>{item.name} </div>) })}
                    </h2>
                    <div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <button onClick={() => handleClickEditSteps(steps)}>View Steps</button>
            <button onClick={() => handleClickViewMaterials()}>View Materials</button>
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