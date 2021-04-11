import axios from 'axios';
import { getToken } from '../utils';

const apiService = axios.create({
  baseURL: 'http://vincentiz.me',
});

export async function loginUser(userInfo) {
  const queryPath = '/api/v1/users/authenticate';
  const res = await apiService.post(queryPath, userInfo);
  return res.data;
}

export async function createCourse(courseInfo) {
  const queryPath = '/api/v1/courses';
  const res = await apiService.post(queryPath, courseInfo, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export async function getCourses() {
  const queryPath = '/api/v1/courses';
  const res = await apiService.get(queryPath);
  return res.data;
}

export async function createHomework(homeworkInfo) {
  const queryPath = '/api/v1/homework';
  const res = await apiService.post(queryPath, homeworkInfo, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export async function updateHomework(homeworkInfo, homeworkID) {
  const queryPath = `/api/v1/homework/${homeworkID}`;
  const res = await apiService.put(queryPath, homeworkInfo, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export async function deleteHomework(homeworkID) {
  const queryPath = `/api/v1/homework/${homeworkID}`;
  const res = await apiService.delete(queryPath, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export async function updateCourse(courseInfo, courseID) {
  const queryPath = `/api/v1/courses/${courseID}`;
  const res = await apiService.put(queryPath, courseInfo, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export async function deleteCourse(courseID) {
  const queryPath = `/api/v1/courses/${courseID}`;
  const res = await apiService.delete(queryPath, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}

export async function getHomework() {
  const queryPath = '/api/v1/homework';
  const res = await apiService.get(queryPath);
  return res.data;
}

export async function getStats() {
  const queryPath = '/api/v1/stats';
  const res = await apiService.get(queryPath, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
}
