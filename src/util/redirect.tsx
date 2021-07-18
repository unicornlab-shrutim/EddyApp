import React from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import config from "../config.json";

export function redirectToDashboard() {
  window.location.assign(window.location.origin + "/dashboard");
}

export function redirectToAssignments() {
  window.location.assign(window.location.origin + "/assignments");
}

export function redirectFromDashboard(view: string) {
  window.location.assign(window.location.origin + "/dashboard/" + view);
}

export function redirectFromAssignment(view: string) {
  window.location.assign(window.location.origin + "/assignments/" + view);
}

export function openAssignment(
  classId: string,
  assignmentId: string,
  isComplete: boolean
) {
  window.location.assign(
    window.location.origin +
      `/assignments/getassignment/class/${classId}/assignment/${assignmentId}/${isComplete}`
  );
}

export function openSubmission(classID: string) {
  window.location.assign(
    window.location.origin + `/assignment/submission/${classID}`
  );
}

export function openAssignmentSubmission(
  classId: string,
  assignmentId: string
) {
  window.location.assign(
    window.location.origin +
      `/assignment/submission/${classId}/view/${assignmentId}`
  );
}

export function goToAssignmentsTab() {
  microsoftTeams.executeDeepLink(
    "https://teams.microsoft.com/l/entity/" +
      config.TeamsAppId +
      "/" +
      config.AssignmentsTabID
  );
}
