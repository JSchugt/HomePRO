import React, { useEffect, useState } from 'react'
import { getProjectByUserId } from '../../modules/projectsManager'
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { Project } from './Projects';
export const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const history = useHistory();
    const currentUser = firebase.auth().currentUser.uid;
    console.log(currentUser, "current user")
    const getProjects = () => {
        getProjectByUserId(currentUser)
            .then(proj => setProjects(proj));
    }
    useEffect(() => {
        getProjects();
    }, [])
    return (

        <div>
            <h1>Hello</h1>
            <div>

                {projects.map((proj) => {
                    return (
                        <Project key={proj.id} project={proj} />
                    )
                })}
            </div>
        </div >
    )
}