import { React, Component } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export default class startEnd extends Component {
  componentDidMount() {
    microsoftTeams.initialize();

    let hashParams = this.getHashParameters();

    if (hashParams["error"]) {
      // Authentication/authorization failed
      microsoftTeams.authentication.notifyFailure(hashParams);
    } else if (hashParams["access_token"]) {
      // Get the stored state parameter and compare with incoming state
      // This validates that the data is coming from Azure AD
      let expectedState = localStorage.getItem("simple.state");

      if (expectedState !== hashParams["state"]) {
        // State does not match, report error
        microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
      } else {
        // Success: return token information to the tab

        microsoftTeams.authentication.notifySuccess({
          idToken: hashParams["id_token"],
          accessToken: hashParams["access_token"],
          tokenType: hashParams["token_type"],
          expiresIn: hashParams["expires_in"],
        });
      }
    } else {
      // Unexpected condition: hash does not contain error or access_token parameter
      microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
    }
  }

  getHashParameters() {
    let hashParams = {};
    window.location.hash
      .substr(1)
      .split("&")
      .forEach(function (item) {
        let s = item.split("="),
          k = s[0],
          v = s[1] && decodeURIComponent(s[1]);
        hashParams[k] = v;
      });
    return hashParams;
  }
  render() {
    return <></>;
  }
}
