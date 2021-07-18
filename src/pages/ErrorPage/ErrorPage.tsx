import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Text } from "@fluentui/react-northstar";
import "./errorPage.scss";

const ErrorPage: React.FunctionComponent<any> = (props) => {
  function parseErrorMessage(): string {
    const params = props.match.params;
    if ("id" in params) {
      const id = params["id"];
      if (id === "401") {
        return "Sorry, an error occurred while trying to access this service.";
      } else if (id === "403") {
        return "Sorry, you do not have permission to access this page. Please contact your administrator to be granted permission.";
      } else {
        return "Ooops! An unexpected error seems to have occured. Why not try refreshing your page? Or you can contact your administrator if the problem persists.";
      }
    } else if ("msg" in params) {
      const msg = params["msg"];
      return msg;
    }
    return "Ooops! An unexpected error seems to have occured. Why not try refreshing your page? Or you can contact your administrator if the problem persists.";
  }

  return (
    <Text
      content={parseErrorMessage()}
      className="error-message"
      error
      size="medium"
    />
  );
};

export default ErrorPage;
