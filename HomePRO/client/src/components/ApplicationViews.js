import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./Register";
import Hello from "./Hello";
import Login from "./Login";
import { ProjectsList } from "./projects/ProjectList";
import { Materials } from "./materials/Materials";
import { MaterialsList } from "./materials/MaterialsList";
import { ProjectCard } from "./projects/Projectcard";
import { StepCreate } from "./steps/StepsCreate";
import { StepEdit } from "./steps/StepsEdit";
import { ProjectCreate } from "./projects/ProjectCreate";
import { StepList } from "./steps/StepsList";
import { ProjectEdit } from "./projects/ProjectEdit";
export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
          <Hello />
        </Route>
        {/* Projects */}
        <Route path="/Projects" exact>
          {isLoggedIn ? <ProjectsList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Projects/:projectId(\d+)" exact>
          {isLoggedIn ? <ProjectCard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Projects/:projectId(\d+)/edit" exact>
          {isLoggedIn ? <ProjectEdit /> : <Redirect to="/login" />}
        </Route>
        {/* Materials */}
        <Route path="/Projects/Materials" >
          {isLoggedIn ? <Materials /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Iventory/Materials">
          {isLoggedIn ? <MaterialsList /> : <Redirect to="/login" />}
        </Route>
        {/* Steps */}
        <Route path="/projects/:projectId(\d+)/steps" exact>
          {isLoggedIn ? <StepList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/projects/:id(\d+)/steps/edit" exact>
          {isLoggedIn ? <StepEdit /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Projects/:id(\d+)/Steps/Create" exact>
          {isLoggedIn ? <StepCreate /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Projects/Create" exact>
          {isLoggedIn ? <ProjectCreate /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>



    </main>
  );
};
