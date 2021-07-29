import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./Register";
import Hello from "./Hello";
import Login from "./Login";
import { ProjectsList } from "./projects/ProjectList";
import { Materials } from "./materials/Materials";
import { MaterialsList } from "./materials/MaterialsList";
import { ProjectCard } from "./projects/Projectcard";
export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
          <Hello />
        </Route>
        <Route path="/Projects" exact>
          {isLoggedIn ? <ProjectsList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Projects/:projectId(\d+)">
          {isLoggedIn ? <ProjectCard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Projects/Materials" >
          {isLoggedIn ? <Materials /> : <Redirect to="/login" />}
        </Route>
        <Route path="/Iventory/Materials">
          {isLoggedIn ? <MaterialsList /> : <Redirect to="/login" />}
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
