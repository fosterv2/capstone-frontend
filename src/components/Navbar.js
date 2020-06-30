import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedIn, signOut }) => {
    return(
        <div className="navbar">
            <div><NavLink to="/" exact><img src="https://i.imgur.com/CeNqBPn.png" alt="cat-logo" /></NavLink></div>
            <div><NavLink to="/about">About</NavLink></div>
            <div><NavLink to="/" exact>Home</NavLink></div>
            {loggedIn ? <div><NavLink to="/new_post" exact>Make a Post</NavLink></div> : null}
            <div>{loggedIn ?
            <NavLink to="/login" exact onClick={signOut}>Sign Out</NavLink>
            : <NavLink to="/login">Login</NavLink>
            }</div>
        </div>
    )
}

export default Navbar

// import { makeStyles } from '@material-ui/core/styles';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     justifyContent: 'space-between',
//     overflowX: 'auto',
//   },
//   toolbarLink: {
//     padding: theme.spacing(1),
//     flexShrink: 0,
//   },
// }));

// export default function Navbar() {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       <Toolbar component="nav" variant="dense" className={classes.toolbar}>
//       <Typography>
//         <NavLink to="/" exact color="inherit" className={classes.toolbarLink}>Home</NavLink>
//         {/* <Typography
//           component="h2"
//           variant="h5"
//           color="inherit"
//           align="center"
//           noWrap
//           className={classes.toolbarTitle}
//         >
//           {title}
//         </Typography> */}
//         <NavLink to="/about" className={classes.toolbarLink}>About</NavLink>
//         <NavLink to="/login" className={classes.toolbarLink}>Login</NavLink>
//         </Typography>
//       </Toolbar>
//     </React.Fragment>
//   );
// }
