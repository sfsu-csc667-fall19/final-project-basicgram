import React from "react";
import PropTypes from "prop-types";
import '../Profile.css'
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import TopAppBar from '../components/TopAppBar'
import Typography from '@material-ui/core/Typography';
import { fetchPostsByUserId } from '../redux/actions/postActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import { logoutUser } from '../redux/actions/authActions';
import BottomAppBar from '../components/BottomAppBar';
import Axios from "axios";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    // toolbar: {
    //     borderBottom: `1px solid ${theme.palette.divider}`,
    // },
    toolbarTitle: {
        flex: 1,
        alignContent: 'center',
        fontFamily: 'Abril Fatface, cursive'
    },
    NameTitle: {
        flex: 1,
        paddingBottom: '3rem',
        alignContent: 'center',
        fontFamily: '-apple-system, system-ui, "Segoe UI"',
    },
    userNameTitle: {
        flex: 1,
        paddingTop: '2rem',
        paddingBottom: '0.5rem',
        alignContent: 'center',
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    mainGrid: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
    card: {
        // display: 'flex',
        flex: 1,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    appBar: {
        background: '#fff',
        color: '#000'
    },
    appBarBottom: {
        background: '#fff',
        color: '#000',
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    commentInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '13px',
    },
    inputBox: {
        padding: theme.spacing(2)
    },
}));

const Profile = ({ logoutUser, history, posts, fetchPostsByUserId, width }) => {

    const classes = useStyles();
    const [user, setUser] = React.useState('');

    // Courtesy of stack over flow :D
    const getCook = (cookiename) => {
        // Get name followed by anything except a semicolon
        let cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
        // Return everything after the equal sign, or an empty string if the cookie name not found
        return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    }

    // 1) retrieve userId by calling the getCook function
    // 2) axios call to retrieve username and full name
    // 3) store them in the user state
    // 4) fetch all the posts made by the user
    React.useEffect(() => {
        const userId = getCook('userId')
        Axios.get(`/user/${userId}`)
            .then(res => { setUser(res.data.user) })
            .catch(err => { console.log(err) })
        fetchPostsByUserId(userId);
    }, []);

    // 1) logs out f the given account
    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    const onFeedClick = () => {
        history.push("/feed")
    }

    const onProfileClick = () => {
        history.push("/profile")
    }

    return(
        <React.Fragment>
            {/* Essentially modified TopAppBar for profile page*/}
            <TopAppBar onLogoutClick={onLogoutClick} />
            <Container className={classes.container} maxWidth="md">
                <Typography
                    component="h2"
                    variant="subtitle"
                    align="center"
                    noWrap
                    className={classes.userNameTitle}
                >
                    {user.username}
                </Typography>
                <Typography
                    component="h5"
                    align="center"
                    noWrap
                    className={classes.NameTitle}
                >
                    {user.name}
                </Typography>
                <GridList cellHeight={300} cols={3} spacing={20}>
                    {posts.posts ? ([...posts.posts].reverse().map(post => (
                        <GridListTile 
                            key={post._id} 
                            post={post} 
                            className='tileStyle'
                            onClick={() => history.push({
                                pathname: `/feed/post/${post._id}`,
                                state: { post: post }
                            })}
                        >
                            <img src={post.image} />
                        </GridListTile>
                    ))) : <h1>No Posts Available</h1>}
                </GridList>
            </Container>
            <BottomAppBar onProfileClick={onProfileClick} onFeedClick={onFeedClick}/>
        </React.Fragment>
    );
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    fetchPostsByUserId: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
});

export default connect(
    mapStateToProps,
    { logoutUser, fetchPostsByUserId }
)(Profile);
