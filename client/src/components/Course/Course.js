import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
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

export default function Course({ onCreate }) {
	const classes = useStyles();
	const [courseID, setCourseID] = useState();
	const [courseName, setCourseName] = useState();
	return (
		<Grid item sm={12} md={6}>
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Course
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => {
						e.preventDefault();
						const courseInfo = { code: courseID, name: courseName };
						onCreate(courseInfo);
					}}
					noValidate
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="courseID"
						label="Course ID"
						name="courseID"
						onChange={(e) => setCourseID(e.target.value)}
						autoComplete="courseID"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="courseName"
						label="Course Name"
						id="courseName"
						onChange={(e) => setCourseName(e.target.value)}
						autoComplete="courseName"
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Create Course
					</Button>
				</form>
			</div>
		</Grid>
	);
}
