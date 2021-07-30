import React, { useEffect, useState } from 'react'
import { getProjectByUserId } from '../../modules/projectsManager'
// import { NavLink as RRNavLink, Redirect, Route } from "react-router-dom";

import { Redirect, useHistory, NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { Project } from './Projects';
export const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const history = useHistory();
    const currentUser = firebase.auth().currentUser.uid;
    //console.log(currentUser, "current user")
    const getProjects = () => {
        console.log(currentUser, "Current user")
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

        <div>
            <h1>Hello</h1>
            <div>

                {projects.map((proj) => {
                    return (
                        <div id={proj.id} onClick={() => handleProjectClick(proj.id)}>

                            <Project key={proj.id} project={proj} />
                        </div>

                    )
                })}
            </div>
        </div >
    )
}