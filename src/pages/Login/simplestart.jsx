import React, { Component } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import config from "../../config.json";

export default class startSimple extends Component {
  componentDidMount() {
    microsoftTeams.initialize();
    let state = Math.random().toString(36).substring(7);
    localStorage.setItem("simple.state", state);
    var queryParams = {
      client_id: config.ClientId,
      response_type: "token",
      response_mode: "fragment",
      resource: "https://graph.microsoft.com/",
      redirect_uri: window.location.origin + "/simpleend",
      scope: config.Scope,

      nonce: this.uuidv4(),
      state: state,
    };
    let authorizeEndpoint =
      "https://login.microsoftonline.com/common/oauth2/authorize?" +
      this.toQueryString(queryParams);
    window.location.assign(authorizeEndpoint);
  }

  toQueryString = (queryParams) => {
    let encodedQueryParams = [];
    for (let key in queryParams) {
      encodedQueryParams.push(key + "=" + encodeURIComponent(queryParams[key]));
    }
    return encodedQueryParams.join("&");
  };

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
  render() {
    return <></>;
  }
}
