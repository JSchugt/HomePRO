import React, { useEffect, useState } from 'react'
import { getProjectByUserId } from '../../modules/projectsManager'
// import { NavLink as RRNavLink, Redirect, Route } from "react-router-dom";

import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { Project } from './Projects';
import "./projects.css"
export const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const history = useHistory();
    const currentUser = firebase.auth().currentUser.uid;
    const getProjects = () => {
        getProjectByUserId(currentUser)
            .then(proj => setProjects(proj));
    }
    useEffect(() => {
        getProjects();
    }, [])
    const handleProjectClick = (id) => {
        history.push(`/Projects/${id}`)
    }
    return (

        <div className="maincard">
            <h1>Here Are Your Projects</h1>
            <div>

                {projects.map((proj) => {
                    return (
                        <div key={proj.id} id={proj.id} onClick={() => handleProjectClick(proj.id)}>

                            <Project key={proj.id} project={proj} />
                        </div>

                    )
                })}
            </div>
            <button onClick={() => { history.push(`/Projects/Create`) }}>New Project</button>
        </div >
    )
}