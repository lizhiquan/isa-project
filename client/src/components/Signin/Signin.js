import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginUser } from '../../api/apiService';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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

export default function SignIn() {
	const classes = useStyles();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const history = useHistory();

	const handleLogin = async (username, password) => {
		const data = { username, password };
		try {
			const res = await loginUser(data);
			localStorage.setItem('token', res.token);
			history.push('/admin');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleLogin(username, password);
					}}
					noValidate
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
}
