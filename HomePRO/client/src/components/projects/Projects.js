import React from "react";

// Displays projects and called from project list
export const Project = ({ project }) => {

    return (
        <div>

            <h2>{project.name}</h2>
            <img src={project.projectImage} style={{ width: '300px' }} />

        </div>
    )
}