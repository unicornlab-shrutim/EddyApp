import React from "react";
import "../../app/App.scss";
import * as microsoftTeams from "@microsoft/teams-js";
import { Text, Flex, Button } from "@fluentui/react-northstar";
import $ from "jquery";

class Login extends React.Component {
  login = () => {
    microsoftTeams.initialize();
    var self = this;
    microsoftTeams.authentication.authenticate({
      url: window.location.origin + "/simplestart",
      width: 600,
      height: 535,
      successCallback: function (result) {
        console.log("Success:   token: " + result.accessToken);
        localStorage.setItem("token", result.accessToken);
        console.log(self.props, "rrrrrr");
        if (result) {
          window.location.assign(window.location.origin + self.props.match.url);
        } else {
          console.log("Error getting token");
          $("#btnLogin").show();
        }
      },
      failureCallback: function (reason) {
        console.log("Login failed: " + reason);
        if (reason === "CancelledByUser" || reason === "FailedToOpenWindow") {
          console.log(
            "Login was blocked by popup blocker or canceled by user."
          );
        }
        // At this point we have to get the user involved, so show the login button
      },
    });
  };
  render() {
    return (
      <div
        id="btnLogin"
        className="text-center"
        style={{ paddingTop: "100px", paddingBottom: "400px" }}
      >
        <Text
          align="center"
          style={{ color: "#464775", fontWeight: "bolder", fontSize: 18 }}
        >
          Welcome to Eddy App
        </Text>
        <br></br>
        <br></br>
        <Flex hAlign="center">
          <Button primary content="Sign in" onClick={this.login}></Button>
        </Flex>
      </div>
    );
  }
}

export default Login;
