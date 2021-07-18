// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from "react";
import "./App.scss";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { themeNames } from "@fluentui/react-teams";
import { Provider } from "@fluentui/react-teams";
import * as microsoftTeams from "@microsoft/teams-js";
import Dashboard from "../pages/Dashboard/Dashboard";
import Assignments from "../pages/Asssignments/Assignments";
import AssignmentView from "../components/Assignments/AssignmentView/AssignmentView";
import CreateAssignment from "../components/Assignments/CreateAssignment/CreateAssignment";
import SubmissionView from "../components/Assignments/SubmissionView/SubmissionView";
import AssignmentSubmission from "../components/Assignments/SubmissionView/AssignmentSubmission";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import Start from "../pages/Login/simplestart";
import End from "../pages/Login/simpleend";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {
  const [appContext, setAppContext] = useState<microsoftTeams.Context>();
  const [appAppearance, setAppAppearance] = useState<themeNames>(
    themeNames.Default
  );

  useEffect(() => {
    microsoftTeams.getContext((context) => {
      setAppContext(context);
      setAppAppearance(initTeamsTheme(context.theme));

      microsoftTeams.appInitialization.notifySuccess();
    });

    microsoftTeams.registerOnThemeChangeHandler((theme) => {
      setAppAppearance(initTeamsTheme(theme));
    });
  }, []);

  return (
    <Provider themeName={appAppearance} lang="en-US">
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/assignments" component={Assignments} />
        <Route
          exact
          path="/assignments/getassignment/class/:classId/assignment/:assignmentId/:isComplete"
          component={AssignmentView}
        />
        <Route
          exact
          path="/assignment/submission/:classId"
          component={SubmissionView}
        />
        <Route
          exact
          path="/assignment/submission/:classId/view/:assignmentId"
          component={AssignmentSubmission}
        />
        <Route exact path="/assignments/create" component={CreateAssignment} />
        <Route exact path="/login/:page" component={Login}></Route>
        <Route exact path="/simplestart" component={Start}></Route>
        <Route exact path="/simpleend" component={End}></Route>
        <Route exact path="/errorpage/errormsg/:msg" component={ErrorPage} />
        <Route exact path="/errorpage/:id" component={ErrorPage} />
      </Switch>
    </Provider>
  );
}

export default App;

function initTeamsTheme(theme: string | undefined): themeNames {
  localStorage.setItem("theme", theme ? theme : "Light");

  switch (theme) {
    case "dark":
      return themeNames.Dark;
    case "contrast":
      return themeNames.HighContrast;
    default:
      return themeNames.Default;
  }
}
