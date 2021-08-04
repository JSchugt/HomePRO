import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createMaterials } from "../../modules/materialsManager"

export const AddMaterials = () => {
    const { projectId } = useParams();
    const history = useHistory();
    const [materials, setMaterials] = useState([{

        name: "",
        price: 0,
        qty: 0,
        userId: "hello world"
    }])


    const handleRemove = (i) => {
        let temp = [...materials];
        temp.splice(i, 1);
        setMaterials([...temp])
    }
    const handleAdd = () => {
        let temp = [...materials, {
            name: "",
            price: 0,
            qty: 0,
            userId: "hello world"
        }]
        setMaterials(temp)
    }
    const handleOnChange = (evt, i) => {
        let temp = [...materials]
        const { value, name } = evt.target
        if (evt.target.name === "price") {
            temp[i][name] = parseFloat(value)
        } else if (evt.target.name === "qty") {
            temp[i][name] = parseInt(value)
        } else {
            temp[i][name] = value
        }
        setMaterials([...temp])
    }
    const handleSave = () => {
        materials.forEach((item) => {
            if (item.name === "" && item.price === 0 && item.qty === 0) {
                // No-op nothing to save
            } else {

                createMaterials(projectId, item)
            }
        })
        history.push(`/Projects/${projectId}`)
    }
    const handleCancel = () => {

    }
    return (<div>
        <h1>Add Materials</h1>
        {materials.map((item, i) => {

            return (<div key={"item" + i}>
                <input type="text" onChange={(evt) => handleOnChange(evt, i)} name="name" placeholder={"Enter an item Name"} />
                <input type="number" onChange={(evt) => handleOnChange(evt, i)} name="qty" placeholder={"0"} />
                <input type="number" onChange={(evt) => handleOnChange(evt, i)} name="price" placeholder={"$0.00"} />
                <div className="btn-box">
                    {materials.length !== 1 && <button
                        onClick={() => handleRemove(i)}>Remove</button>}
                    {materials.length - 1 === i && <button onClick={() => handleAdd()}>Add</button>}
                </div>            </div>)
        })}
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
    )
    // return (<h1>Hello worl</h1>)
}