import axios from 'axios';
import {SERVER_URL} from "../constants";

const apiService = axios.create({
	baseURL: SERVER_URL,
});

export async function loginUser(userInfo) {
	const queryPath = '/api/v1/users/authenticate';
	const res = await apiService.post(queryPath, userInfo);
	return res.data;
}

export async function createCourse(courseInfo) {
	const queryPath = '/api/v1/courses';
	const res = await apiService.post(queryPath, courseInfo, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
	return res.data;
}
