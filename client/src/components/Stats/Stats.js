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
  const [stats, setStats] = useState();

  const handleGetStats = async () => {
    try {
      const res = await getStats();
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
      {stats?.map((stat) => {
        return (
          <Grid className={classes.grid} item md={12}>
            <Typography component="h5" variant="h5">
              {stat.method}
            </Typography>
            <Typography component="h5" variant="h5">
              {stat.endpoint} - <span className={classes.requests}>{stat.count} Requests</span>
            </Typography>
          </Grid>
        );
      })}
    </Container>
  );
}
