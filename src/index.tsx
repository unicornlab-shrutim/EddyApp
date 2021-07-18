// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
import * as microsoftTeams from "@microsoft/teams-js";
import { BrowserRouter as Router } from "react-router-dom";

microsoftTeams.initialize();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
