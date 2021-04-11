import Grid from '@material-ui/core/Grid';
import { createCourse } from '../../api/apiService';
import CreateCourse from '../Course/CreateCourse';
import CreateHomework from '../Homework/CreateHomework';
import { getToken } from '../../utils';
import { Redirect } from 'react-router-dom';

export default function Admin({ courses, onCoursesChange }) {
  const handleCreateCourse = async (courseInfo) => {
    try {
      await createCourse(courseInfo);
      onCoursesChange();
      alert('Created course sucessfully');
    } catch (error) {
      console.log(error);
      alert('Error: failed to create course');
    }
  };

  if (!getToken()) {
    return <Redirect to={'/login'} />;
  }

  return (
    <Grid container spacing={3} component="main">
      <CreateCourse onCreate={handleCreateCourse} />
      <CreateHomework courses={courses} />
    </Grid>
  );
}
