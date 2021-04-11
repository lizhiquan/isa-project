import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { createCourse } from '../../api/apiService';
import CreateCourse from '../Course/CreateCourse';
import CreateHomework from '../Homework/CreateHomework';

export default function Admin({ onCoursesChange, courses }) {
  const handleCreateCourse = async (courseInfo) => {
    try {
      await createCourse(courseInfo);
      onCoursesChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={3} component="main">
      <CreateCourse onCreate={handleCreateCourse} />
      <CreateHomework courses={courses} />
    </Grid>
  );
}
