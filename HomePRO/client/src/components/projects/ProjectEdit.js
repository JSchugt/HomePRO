import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { editProject, getProjectByProjectId } from "../../modules/projectsManager"

export const ProjectEdit = () => {
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const history = useHistory();
    const handleOnchange = (evt) => {

        let temp = project
        if (evt.target.name === "sname") {

            temp.name = evt.target.value
        } else {
            temp.description = evt.target.value
        }
        // const { name, value } = evt.target;
        // const temp = { ...project };
        // temp[name] = value;
        // setProject(temp);

    }
    const getProject = () => {
        getProjectByProjectId(projectId).then(setProject)

    }
    useEffect(() => {
        getProject()
    }, [projectId])
    const handleProjectSave = () => {
        editProject(project).then(history.push('/Projects'))
    }
    return (
        <div className="maincard">
            <h1>Edit Project</h1>
            <div>
                <label>Project Name</label>
            </div>
            <div>
                <input type="text" name={"sname"} onChange={(evt) => handleOnchange(evt)} defaultValue={project.name} />
            </div>
            <div>
                <label>Description</label>
            </div>
            <div>
                <input type="text" name={"description"} onChange={(evt) => handleOnchange(evt)} defaultValue={project.description} />
            </div>
            <div>
                <button onClick={handleProjectSave}>Save</button>
                <button onClick={() => history.push("/Projects")}>
                    Cancel</button>
            </div>
        </div>
    )
}