import React, { useEffect, useState } from "react"
import { editSteps, getStepByProjectId } from "../../modules/stepManager";
import { useHistory, useParams } from "react-router-dom"
import "./steps.css"
import "../Toggle.css"
export const StepList = () => {
    const [steps, setSteps] = useState([{}])
    const { projectId } = useParams()
    const history = useHistory()
    const getStepsByProject = () => {
        getStepByProjectId(projectId).then(setSteps)
    }

    useEffect(() => {
        getStepsByProject()
    }, projectId)


    const handleIsCompleteChange = (evt, i) => {
        let temp = [...steps]
        temp[i].isComplete = !temp[i].isComplete
        editSteps(temp[i].id, temp[i])
        setSteps([...temp])
    }
    return (
        <div className="maincard">
            <h2>Steps</h2>
            {
                steps.map((step, i) => {
                    return (<div className="steplist" key={step.id + "step" + step.number}>
                        <div className="stepDesc"><div>{step.stepNumber}.</div>
                            <div>{step.description}   </div>
                            <div className="timeestimate">{step.timeEstimate} Minutes</div>
                        </div>
                        <button id="isCompleteButton" onClick={(evt) => handleIsCompleteChange(evt, i)}>{step.isComplete ? "Complete" : "In Progress"}</button>
                        {/* <label className="switch">
                            <input type="checkbox" id="slider1" onClick={() => changeToggle(step.isComplete, step.id)} />
                            <span className="slider round"> </span>
                        </label> */}
                    </div>)
                })
            }
            <button onClick={() => { history.push(`/Projects/${projectId}/Steps/Edit`) }} >Edit Steps</button>
            <button onClick={() => { history.push(`/Projects/${projectId}`) }} >Back</button>
        </div >
    )

}