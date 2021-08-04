import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { UpdateMaterials } from "../../modules/materialsManager"
import { getProjectMaterialsByProjectid, deleteByProjectIdAndMaterialId } from "../../modules/projectMaterialsManager"
export const EditMaterials = () => {
    const { projectId } = useParams()
    // const [pm, setMaterials] = useState([])
    const [materials, setT] = useState([{}])
    const history = useHistory()
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
        getMaterialsByPMId()
    }, [projectId])
    // const handleAdd = () => {
    //     setT([...materials, {
    //         id: 0,
    //         name: "Item Name",
    //         price: 0.0,
    //         qty: 0
    //     }])
    // }
    const handleRemove = (evt, i) => {
        if (window.confirm("This can not be undone")) {
            let temp = [...materials];
            temp.splice(i, 1);
            if (temp[i] !== 0) {

                deleteByProjectIdAndMaterialId(projectId, materials[i].id)
            }
            setT([...temp]);
        }
    }

    const handleDescriptionOnchange = (evt, i) => {
        const { name, value } = evt.target
        const temp = [...materials];
        if (name === "qty") {
            temp[i][name] = parseInt(value)
        } else if (name === "price") {
            temp[i][name] = parseFloat(value)
        } else {
            temp[i][name] = value
        }
        setT(temp)
    }
    const handleSaveMaterials = () => {
        materials.forEach(item => {
            UpdateMaterials(item.id, item)
        })
        history.push(`/Projects/${projectId}`)

    }
    const handleCancel = () => { }

    return (<div>
        <h1>Edit Materials</h1>
        {materials.map((item, i) => {
            return (<div key={i}>
                <div>{item.stepNumber}</div>
                <input type="text" name="name" onChange={evt => handleDescriptionOnchange(evt, i)} defaultValue={item.name} placeholder={"Name"} />
                <input type="number" item="1" pattern="\d+" min="0" name="qty" onChange={evt => handleDescriptionOnchange(evt, i)} defaultValue={item.qty} />
                <input type="number" min="0" name="price" onChange={evt => handleDescriptionOnchange(evt, i)} defaultValue={item.price} />
                <div className="btn-box">
                    <button
                        onClick={(evt) => handleRemove(evt, i)}>Remove</button>
                </div>
            </div>)
        })}
        <button onClick={() => handleSaveMaterials()}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
    </div >)
}