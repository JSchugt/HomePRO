import React, { useState } from "react"
import firebase from "firebase"
import { useHistory, useParams } from "react-router-dom"
import { createProject } from "../../modules/projectsManager"

export const ProjectCreate = () => {
    const [project, setProject] = useState({
        description: "",
        name: "",
        userId: firebase.auth().currentUser.uid
    })
    const history = useHistory();
    const handleOnchange = (evt) => {
        const { name, value } = evt.target;
        const temp = { ...project };
        temp[name] = value;
        setProject(temp);

    }
    const handleProjectSave = () => {
        createProject(project).then(history.push('/Projects'))
    }
    return (
        <div>
            <h1>Create Project</h1>
            <div>
                <label>Project Name</label>
            </div>
            <div>
                <input type="text" name={"name"} onChange={(evt) => handleOnchange(evt)} placeholder={"Project Name"} />
            </div>
            <div>
                <label>Description</label>
            </div>
            <div>
                <input type="text" name={"description"} onChange={(evt) => handleOnchange(evt)} placeholder={"Description"} />
            </div>
            <div>
                <button onClick={handleProjectSave}>Save</button>
                <button onClick={() => history.push("/Projects")}>
                    Cancel</button>
            </div>
        </div>
    )
}