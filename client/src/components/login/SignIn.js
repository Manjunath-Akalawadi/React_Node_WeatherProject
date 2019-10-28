import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Main from '../weather/Main';
import Routes from '../routes/Routes';
import Navbar from '../navbar/Navbar';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

  const [email, setEmail] = useState();
  const [password, setPasword] = useState();
  const [redirect, setRedirect] = useState(false);
  const [admin, setAdmin] = useState(false);


  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();

    axios.post('api/login', {
      email: email,
      password: password
    })
      .then(res => {
        console.log(res);
        if (res.data.code === 200 && res.data.role === "admin") {
          console.log(res.data.role);
          setRedirect(true);
          setAdmin(true);
        }
        else {
          setRedirect(true);
        }
      })
  }

  const classes = useStyles();

  return (
    (redirect) ? ((admin) ? <Redirect to='/Dashboard' /> : <Redirect to='/Main' />) :
      <div>
        <Navbar />
        <Container component="main" maxWidth="xs">

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}

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
                value={password}
                autoComplete="current-password"
                onChange={e => setPasword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
          </Button>
            </form>
          </div>
        </Container>
      </div>

  );
}