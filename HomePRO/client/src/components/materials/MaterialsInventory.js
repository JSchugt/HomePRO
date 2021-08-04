import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom";
import { getProjectMaterialsByProjectid } from "../../modules/projectMaterialsManager";
import './materials.css'
import { MaterialsInvoice } from "./MaterialsInvoice";


export const MaterialsList = () => {
    const [inventory, setInventory] = useState([{}])
    const { projectId } = useParams();
    const getInvenotry = () => {
        getProjectMaterialsByProjectid(projectId).then(res => {
            if (res === 204) {
                setInventory([{}])
            } else {
                setInventory(res.materials)
                res.materials.forEach(element => {
                });
            }
        })
    }


    useEffect(() => {
        getInvenotry()
    }, [projectId])

    return (<MaterialsInvoice key={"MatInvoice"} inventory={inventory} projectId={projectId} />
    )
}