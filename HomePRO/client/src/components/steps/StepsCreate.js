import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { addStepsToProject } from "../../modules/stepManager"
export const StepCreate = () => {
    const { id } = useParams()
    const history = useHistory()
    const [steps, setSteps] = useState([{
        stepNumber: 1,
        projectId: id,
        timeEstimate: 0,
        description: "Description",
        isComplete: false
    }])
    // const getSteps = () => {
    //     getStepByProjectId(id).then(setSteps)

    // }
    // useEffect(() => {
    //     getSteps()
    // }, [id])

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
        let temp = [...steps];
        temp.splice(index, 1);
        temp.forEach(step => {
            if (step.stepNumber !== 1 && step.stepNumber > index) {
                step.stepNumber = step.stepNumber - 1
            }

        });
        setSteps([...temp]);
    };
    const handleSaveSteps = () => {
        steps.forEach(step => {
            addStepsToProject(step)
        })
        history.push(`/Projects/${id}`)
    }
    const handleCancel = () => {
        history.push(`/Projects/${id}`)
    }
    return (<div className="create-steps">
        <h2>Create Steps</h2>
        {steps.map((step, i) => {
            return (<div key={i}>
                <div>{step.stepNumber}</div>
                <input type="text" name="Description" onChange={evt => handleDescriptionOnchange(evt, i)} placeholder={step.description} />
                <input type="number" step="1" pattern="\d+" min="0" name="TimeEstimate" onChange={evt => handleDescriptionOnchange(evt, i)} placeholder={step.timeEstimate} />
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