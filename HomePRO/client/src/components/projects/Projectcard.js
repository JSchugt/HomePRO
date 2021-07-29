import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProjectByProjectId, getProjectByUserId } from "../../modules/projectsManager";


export const ProjectCard = () => {
    const [project, setProject] = useState({})
    const { projectId } = useParams();

    const getProjectById = () => {

        getProjectByProjectId(projectId).then(setProject)
    }

    useEffect(() => {
        getProjectById()

    }, [])
    return (<div>

        <h1>Project card</h1>
        <div>{project.name}</div>
    </div>
    )
}