import React, { useEffect, useState } from "react"
import { getStepByProjectId } from "../../modules/stepManager";
import { useToggle } from "../Toggle"
import { useHistory, useParams } from "react-router-dom"
import "./steps.css"
import "../Toggle.css"
export const StepList = () => {
    const [isOn, toggleIsOn] = useToggle();
    const [steps, setSteps] = useState([{}])
    const { projectId } = useParams()
    const history = useHistory()
    const getStepsByProject = () => {
        getStepByProjectId(projectId).then(setSteps)
    }
    useEffect(() => {
        toggleIsOn(true)
    }, [])
    useEffect(() => {
        getStepsByProject()
    }, [projectId])
    const changeToggle = (complete, id) => {

        toggleIsOn(!complete)
    }
    const handleOnClickEditSteps = () => {

    }
    return (
        <div>
            <h2>Hello from step list</h2>
            {
                steps.map((step) => {
                    return (<div className="steplist" key={step.id + "step" + step.number}>
                        <div className="stepDesc">{step.stepNumber}. {step.description}</div>
                        <label className="switch">
                            <input type="checkbox" id="slider1" onClick={() => changeToggle(step.isComplete, step.id)} />
                            <span className="slider round"> </span>
                        </label>
                    </div>)
                })
            }
            <button onClick={() => { history.push(`/Projects/${projectId}/Steps/Edit`) }} >Edit Steps</button>
        </div >
    )

}