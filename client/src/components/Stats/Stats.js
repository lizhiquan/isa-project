import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { getStats } from '../../api/apiService';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  grid: {
    minWidth: '500px',
    margin: theme.spacing(8, 10),
    display: 'flex',
    flexDirection: 'column',
  },
  requests: {
    color: 'white',
    backgroundColor: 'green',
    borderRadius: '5px',
  },
}));

export default function Stats() {
  const classes = useStyles();
  const url = window.location.href;
  const [stats, setStats] = useState();

  const handleGetStats = async () => {
    try {
      const res = await getStats;
      setStats(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetStats();
  }, []);
  return (
    <Container className={classes.container}>
      <Grid className={classes.grid} item md={12}>
        <Typography component="h4" variant="h4">
          Login
        </Typography>
        <Typography component="h5" variant="h5">
          POST - {url}/api/v1/users/authenticate - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
      </Grid>

      <Grid className={classes.grid} item md={12}>
        <Typography component="h4" variant="h4">
          Homework
        </Typography>
        <Typography component="h5" variant="h5">
          POST - {url}/api/v1/courses - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
        <Typography component="h5" variant="h5">
          GET - {url}/api/v1/courses - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
        <Typography component="h5" variant="h5">
          PUT - {url}/api/v1/courses/:id - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
        <Typography component="h5" variant="h5">
          DELETE - {url}/api/v1/courses/:id - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
      </Grid>

      <Grid className={classes.grid} item md={12}>
        <Typography component="h4" variant="h4">
          Homework
        </Typography>
        <Typography component="h5" variant="h5">
          POST - {url}/api/v1/homework - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
        <Typography component="h5" variant="h5">
          GET - {url}/api/v1/homework - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
        <Typography component="h5" variant="h5">
          PUT - {url}/api/v1/homework/:id - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
        <Typography component="h5" variant="h5">
          DELETE - {url}/api/v1/homework/:id - <span className={classes.requests}>REQUEST TIMES</span>
        </Typography>
      </Grid>
    </Container>
  );
}
