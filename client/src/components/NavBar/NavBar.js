import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '3vw',
  },
  tabs: {
    fontSize: '2vw',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Homework Manager
          </Typography>
          <Button className={classes.tabs} color="inherit" onClick={() => (window.location.href = '/stats')}>
            Statistics
          </Button>
          <Button className={classes.tabs} color="inherit" onClick={() => (window.location.href = '/courses')}>
            Courses
          </Button>
          <Button className={classes.tabs} color="inherit" onClick={() => (window.location.href = '/')}>
            Homework
          </Button>
          <Button className={classes.tabs} color="inherit" onClick={() => (window.location.href = '/admin')}>
            Admin
          </Button>
          <Button
            className={classes.tabs}
            color="inherit"
            onClick={() => {
              localStorage.setItem('token', '');
              window.location.href = '/Login';
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
