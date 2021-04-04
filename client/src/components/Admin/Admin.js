import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { getCourses, createCourse } from '../../api/apiService';
import Course from '../Course/Course';
import Homework from '../Homework/Homework';

export default function Admin() {
	const [courses, setCourses] = useState();

	const handleGetCourses = async () => {
		try {
			const res = await getCourses();
			setCourses(res);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCreateCourse = async (courseInfo) => {
		try {
			await createCourse(courseInfo);
			handleGetCourses();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		handleGetCourses();
	}, []);

	return (
		<Grid container spacing={3} component="main">
			<Course onCreate={handleCreateCourse} />
			<Homework courses={courses} />
		</Grid>
	);
}
