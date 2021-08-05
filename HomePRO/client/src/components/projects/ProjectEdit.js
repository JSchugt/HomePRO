import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { editProject, getProjectByProjectId } from "../../modules/projectsManager"

export const ProjectEdit = () => {
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const history = useHistory();
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
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
        setImage(project.projectImage)

    }
    useEffect(() => {
        getProject()
    }, [projectId])
    const handleProjectSave = () => {
        editProject(project).then(history.push('/Projects'))
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
        let temp = { ...project }
        temp.projectImage = file.secure_url
        setProject(temp)
        project.projectImage = file.secure_url
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
            <input
                type="file"
                name="file"
                placeholder="Upload an Image"
                onChange={uploadImage}
            />
            {loading ? (
                <h3>Loading</h3>
            ) : (
                <img src={project.projectImage} style={{ width: '300px' }} alt={"No Image"} />
            )}
            <div>
                <button onClick={handleProjectSave}>Save</button>
                <button onClick={() => history.push("/Projects")}>
                    Cancel</button>
            </div>
        </div>
    )
}