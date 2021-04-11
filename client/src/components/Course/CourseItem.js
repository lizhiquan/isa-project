import { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { updateCourse, deleteCourse } from '../../api/apiService';

const useStyles = makeStyles((theme) => ({
  select: {
    padding: theme.spacing(0, 2),
    width: '100%',
    height: '50px',
  },
  container: {
    padding: '10px',
    margin: '20px 0',
    border: '2px solid grey',
    borderRadius: '10px',
  },
  button: {
    margin: '10px 0',
  },
}));

export default function HomeworkItem({ isAdmin, courses, course, onChangeCourse }) {
  const classes = useStyles();
  const [name, setName] = useState(course?.name);
  const [code, setCode] = useState(course?.code);

  const handleUpdateCourse = async () => {
    try {
      await updateCourse({ code, name }, course?.id);
      alert('Course Succesfully Updated');
    } catch (error) {
      console.log(error);
      alert('Error: course not updated');
    }
  };

  const handleDeleteCourse = async () => {
    try {
      const filteredList = courses?.filter((item) => {
        return course.id !== item.id;
      });
      onChangeCourse([...filteredList]);

      await deleteCourse(course?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid className={classes.container} container spacing={2}>
      <Grid item xs={12} md={12}>
        <TextField
          className={classes.input}
          disabled={!isAdmin}
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Course Name"
          size="small"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          className={classes.input}
          disabled={!isAdmin}
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Course Code"
          size="small"
          variant="outlined"
          value={code}
          onChange={(event) => setCode(event.target.value)}
        />
      </Grid>
      {isAdmin ? (
        <Grid className={classes.buttons} item xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <Button
              className={classes.button}
              onClick={handleUpdateCourse}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Course
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              className={classes.button}
              type="submit"
              onClick={handleDeleteCourse}
              fullWidth
              variant="contained"
              color="primary"
            >
              Delete Course
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
