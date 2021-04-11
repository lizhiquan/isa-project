import { useState } from 'react';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { updateHomework, deleteHomework } from '../../api/apiService';

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

export default function HomeworkItem({
  isAdmin,
  courseID,
  homeworkList,
  homeworkItem,
  onUpdateHomeworkList,
  onDeleteHomework,
}) {
  const classes = useStyles();
  const [dueDate, setDueDate] = useState(homeworkItem?.due_date.split('T')[0]);
  const [type, setType] = useState(homeworkItem?.type);
  const [name, setName] = useState(homeworkItem?.name);
  const [content, setContent] = useState(homeworkItem?.content);

  const handleUpdateHomework = async () => {
    const info = { name, content, type, due_date: dueDate, course_id: courseID };
    try {
      await updateHomework(info, homeworkItem?.id);
      const filteredList = homeworkList.filter((item) => {
        return item.id !== homeworkItem.id;
      });
      onUpdateHomeworkList([...filteredList, { id: homeworkItem?.id, ...info }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHomework = async () => {
    try {
      const updatedHomeworkList = homeworkList.filter((item) => {
        return item.id !== homeworkItem.id;
      });
      await deleteHomework(homeworkItem?.id);
      onUpdateHomeworkList([...updatedHomeworkList]);
      onDeleteHomework('');
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
          label="Homework Name"
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
          placeholder="Content"
          size="medium"
          variant="outlined"
          multiline
          fullWidth
          rows={6}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          className={classes.input}
          disabled={!isAdmin}
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Due Date"
          size="small"
          variant="outlined"
          type="date"
          value={dueDate?.split('T')[0]}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Select disabled={!isAdmin} className={classes.select} value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value={'lesson'}>Lesson</MenuItem>
          <MenuItem value={'lab'}>Lab</MenuItem>
        </Select>
      </Grid>
      {isAdmin ? (
        <Grid className={classes.buttons} item xs={12} md={12}>
          <Grid item xs={12} md={12}>
            <Button
              className={classes.button}
              onClick={handleUpdateHomework}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update Homework
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              className={classes.button}
              type="submit"
              onClick={handleDeleteHomework}
              fullWidth
              variant="contained"
              color="primary"
            >
              Delete Homework
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
