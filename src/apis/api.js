import * as config from "../config.json";
import axios from "./axoisJWTDecorator";

let baseAPIUrl = config.APIUrl + "/api/";

export const getAppSettings = async (source) => {
  let resource = "appsettings";
  return await axios.get(baseAPIUrl, resource, source);
};

export const getMyClasses = async (source) => {
  let resource = "classes";
  return await axios.get(baseAPIUrl, resource, source);
};

export const getRecentActivity = async (source) => {
  let resouce = "recentactivity?limit=10";
  return await axios.get(baseAPIUrl, resouce, source);
};

export const getGradesView = async (source, classId) => {
  let resource = `classes/${classId}/grades`;
  return await axios.get(baseAPIUrl, resource, source);
};

export const getAllAssignments = async (source) => {
  let resource = "assignments";
  return await axios.get(baseAPIUrl, resource, source);
};

export const getAssignment = async (source, classId, assignmentId) => {
  let resource = `classes/${classId}/assignments/${assignmentId}`;
  console.log(resource);
  return await axios.get(baseAPIUrl, resource, source);
};

export const getFile = async (source, url) => {
  return await axios.get(url, null, source);
};
