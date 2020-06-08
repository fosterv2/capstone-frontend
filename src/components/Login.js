import React, { Component } from 'react';

const URL = "http://localhost:3000/auth"
const EMPTYFIELDS = {
    username: "",
    password: ""
}

class Login extends Component {
    state = {
        fields: EMPTYFIELDS,
        error: false
    }

    handleChange = event => {
        const newFields = {...this.state.fields, [event.target.name]: event.target.value}
        this.setState({ fields: newFields })
    }

    handleSubmit = event => {
        event.preventDefault()
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                username: this.state.fields.username,
                password: this.state.fields.password
            })
        })
        .then(resp => resp.json())
        .then(user => {
            if (!user.error) {
                this.props.onLogin(user)
                this.props.history.push('/')
            } else {
                this.setState({ error: true })
            }
        })
        this.setState({ fields: EMPTYFIELDS })
    }

    render() {
        const { username, password } = this.state.fields
        return (
            <div>
                {this.state.error ? <h1>Wrong inputs</h1> : null}
                <form onSubmit={this.handleSubmit}>
                    <div className="ui field">
                        <label>Username</label><br/>
                        <input
                            name="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="ui field">
                        <label>Password</label><br/>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form button">
                        <button type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <div className="toggle button">
                    <h2>or</h2>
                    <button type="submit" onClick={() => this.props.history.push("/signup")}>
                        Sign Up
                    </button>
                </div>
            </div>
        )
    }
}

export default Login

// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const Login = () => {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }

// export default Login
