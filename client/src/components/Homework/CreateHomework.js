import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createHomework } from '../../api/apiService';
import { checkInvalidToken } from '../../utils';

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(0, 2),
    width: '100%',
    height: '50px',
  },
  paper: {
    minWidth: '500px',
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateHomework({ courses }) {
  const classes = useStyles();

  const [dueDate, setDueDate] = useState();
  const [type, setType] = useState('lesson');
  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [courseID, setCourseID] = useState();

  const handleCreateHomework = async (homeworkInfo) => {
    try {
      await createHomework(homeworkInfo);
      alert('Created homework successfully');
    } catch (error) {
      console.log(error);
      checkInvalidToken(error.response.status);
      alert('Error: Unable to create homework');
    }
  };

  return (
    <Grid item sm={12} md={6}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Homework
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            const homework = { name, content, type, due_date: dueDate, course_id: courseID };
            handleCreateHomework(homework);
          }}
          noValidate
        >
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Due Date"
            variant="outlined"
            type="date"
            validators={['required']}
            errorMessages={['This field is required']}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />
          <Select className={classes.input} value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value={'lesson'}>Lesson</MenuItem>
            <MenuItem value={'lab'}>Lab</MenuItem>
          </Select>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Homework Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="Homework Content"
            name="content"
            autoComplete="content"
            autoFocus
            onChange={(e) => setContent(e.target.value)}
          />
          <Select
            placeholder="Course"
            className={classes.input}
            value={courseID ?? ''}
            onChange={(e) => {
              setCourseID(e.target.value);
            }}
          >
            {courses?.map((course) => {
              return (
                <MenuItem key={course.id} value={course.id}>
                  {`${course.code}`}
                </MenuItem>
              );
            })}
          </Select>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Create Homework
          </Button>
        </form>
      </div>
    </Grid>
  );
}
