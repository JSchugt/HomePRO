import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { addStepsToProject, deleteStepById, getStepByProjectId } from "../../modules/stepManager"
export const StepEdit = () => {
    const { id } = useParams()
    const history = useHistory()
    const [steps, setSteps] = useState([{}])
    const getSteps = () => {
        getStepByProjectId(id).then(setSteps)

    }
    useEffect(() => {
        getSteps()
    }, id)

    const handleDescriptionOnchange = (evt, i) => {
        const { name, value } = evt.target;
        const temp = [...steps];
        if (name === "TimeEstimate") {

            temp[i][name] = parseInt(value);
        } else {
            temp[i][name] = value;
        }
        setSteps(temp);
    }
    const handleAdd = (i) => {
        setSteps([...steps, {
            stepNumber: i,
            projectId: id,
            TimeEstimate: 0,
            Description: "Description",
            isComplete: false
        }])
    }
    const handleRemove = index => {
        if (window.confirm("This can not be undone")) {
            let temp = [...steps];
            temp.splice(index, 1);
            temp.forEach(step => {
                if (step.stepNumber !== 1 && step.stepNumber > index) {
                    step.stepNumber = step.stepNumber - 1
                }
            });
            deleteStepById(steps[index].id)
            setSteps([...temp]);
        }
    };
    const handleSaveSteps = () => {
        steps.forEach(step => {
            deleteStepById(step.id)
        })
        steps.forEach(step => {
            addStepsToProject(step)
        })

        history.push(`/Projects`)

    }
    const handleCancel = () => {
        history.push(`/Projects/${id}`)
    }
    return (<div className="create-steps maincard">
        <h2>Edit Steps</h2>
        {steps.map((step, i) => {
            return (<div key={i}>
                <div>{step.stepNumber}</div>
                <label>Description</label>
                <input type="text" name="Description" onChange={evt => handleDescriptionOnchange(evt, i)} defaultValue={step.description} />
                <label>Minutes To Complete</label>
                <input type="number" step="1" pattern="\d+" min="0" name="TimeEstimate" onChange={evt => handleDescriptionOnchange(evt, i)} defaultValue={step.timeEstimate} />
                <div className="btn-box">
                    {steps.length !== 1 && <button
                        onClick={() => handleRemove(i)}>Remove</button>}
                    {steps.length - 1 === i && <button onClick={() => handleAdd(step.stepNumber + 1)}>Add</button>}
                </div>
            </div>)
        })}
        <button onClick={handleSaveSteps}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
    </div>
    )
}