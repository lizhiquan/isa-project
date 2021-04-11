import React, { useState } from 'react';
import HomeworkItem from './HomeworkItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    minWidth: '500px',
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  dropDown: {
    margin: theme.spacing(3),
    minWidth: 180,
  },
  list: {
    minHeight: '10vh',
  },
}));

const menuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};

export default function HomeworkList({ isAdmin, courses, homework, onUpdateHomeworkList }) {
  const classes = useStyles();
  const [courseID, setCourseID] = useState();
  const [course, setCourse] = useState();
  const [open, setOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState();
  const [showAllHomework, setShowAllHomework] = useState(false);

  const handleChange = (event) => {
    setCourseID(event.target.value);
    const filteredHomework = homework?.filter((item) => {
      return item.course_id === event.target.value;
    });

    setCourse(event.target.value);
    setSelectedHomework(filteredHomework);
  };

  const handleToggleViewAllHomework = (event) => {
    setShowAllHomework(!showAllHomework);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container className={classes.container}>
      <Grid className={classes.grid} item sm={12} md={6}>
        <Typography component="h1" variant="h2">
          Homework List
        </Typography>
        <Typography component="h1" variant="h3">
          {isAdmin && !showAllHomework ? 'Admin Mode' : 'User Mode'}
        </Typography>

        {!showAllHomework ? (
          <>
            <Typography component="h5" variant="h5">
              Select Course ID
            </Typography>
            <Select
              MenuProps={menuProps}
              className={classes.dropDown}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={course ?? ''}
              onChange={handleChange}
            >
              {courses?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.code}
                </MenuItem>
              ))}
            </Select>

            <Grid item sm={12} md={6} className={classes.list}>
              {selectedHomework?.length > 0 ? (
                selectedHomework?.map((item) => {
                  console.log(item.id);

                  return (
                    <HomeworkItem
                      key={item.id}
                      isAdmin={isAdmin}
                      courseID={courseID}
                      homeworkItem={item}
                      homeworkList={homework}
                      onUpdateHomeworkList={onUpdateHomeworkList}
                      onDeleteHomework={setSelectedHomework}
                    >
                      {item.name}
                    </HomeworkItem>
                  );
                })
              ) : (
                <Typography component="h1" variant="h4">
                  No Homework
                </Typography>
              )}
            </Grid>
          </>
        ) : (
          <Grid item sm={12} md={6} className={classes.list}>
            {homework?.map((item) => (
              <HomeworkItem key={item.id} isAdmin={false} courseID={courseID} homework={item}>
                {item.name}
              </HomeworkItem>
            ))}
          </Grid>
        )}

        <Button
          className={classes.button}
          onClick={handleToggleViewAllHomework}
          type="button"
          fullWidth
          variant="contained"
          color="primary"
        >
          Toggle View All Homework
        </Button>
      </Grid>
    </Container>
  );
}
