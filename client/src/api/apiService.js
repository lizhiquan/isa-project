import axios from 'axios';

const apiService = axios.create({
	baseURL: 'http://localhost:8000',
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
	console.log(res.data);
	return res.data;
}

export async function getCourses() {
	const queryPath = '/api/v1/courses';
	const res = await apiService.get(queryPath);
	return res.data;
}

export async function createHomework(homeworkInfo) {
	console.log(homeworkInfo);
	const queryPath = '/api/v1/homework';
	const res = await apiService.post(queryPath, homeworkInfo, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
	return res.data;
}
