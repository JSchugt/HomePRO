import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import CategoryList from "./Category/CategoryList"
// import Login from "./Login";
// import Register from "./Register";
import Hello from "./Hello";



export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {/* {isLoggedIn ? <Hello /> : <Redirect to="/login" />} */}
          <Hello />
        </Route>

        <Route path="/login">
          {/* <Login /> */}
        </Route>


      </Switch>



    </main>
  );
};
