import React, { useState } from "react"
import firebase from "firebase"
import { useHistory, useParams } from "react-router-dom"
import { createProject } from "../../modules/projectsManager"

export const ProjectCreate = () => {
    const [project, setProject] = useState({
        description: "",
        name: "",
        projectImage: "",
        userId: firebase.auth().currentUser.uid
    })
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
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

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'HomPRO')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/nss-student/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        console.log("FILE URL", file.secure_url)
        setLoading(false)
        // sends to sql
        project.projectImage = file.secure_url
    }
    return (
        <div className="maincard">
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
            <h1>Upload Images</h1>
            <input
                type="file"
                name="file"
                placeholder="Upload an Image"
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading</h3>
            ) : (
                <img src={image} style={{ width: '300px' }} />
            )}
            <div>
                <button onClick={handleProjectSave}>Save</button>
                <button onClick={() => history.push("/Projects")}>
                    Cancel</button>
            </div>
        </div>
    )
}