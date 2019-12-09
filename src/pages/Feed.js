import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton,  AppBar, Grid, Container, Fab } from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TopAppBar from '../components/TopAppBar';
import FeedCard from '../components/FeedCard';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
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
}));

const featuredPosts = [
    {
        title: 'abc21',
        date: 'Nov 12',
        time: '3 hours ago',
        description: 'Hello World',
        comments: [
            'Amazing',
            'Beautiful Photo'
        ]
    },
    {
        title: 'abc22',
        date: 'Nov 11',
        time: '5 hours ago',
        description: 'Hello World',
        comments: [
        ]
    },
    {
        title: 'Featured post',
        date: 'Nov 12',
        time: '2 hours ago',
        description: 'Hello World',
        comments: [
        ]
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        time: '1 hour ago',
        description: 'Hello World',
        comments: [
            'Amazing',
            'Beautiful Photo'
        ]
    },
];
// Courtesy of stack over flow :D
const getCook = (cookiename) => {
    // Get name followed by anything except a semicolon
    let cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

const Feed = ({ logoutUser, history }) => {
    const classes = useStyles();

    const [posts, setPosts] = React.useState([]);

    const setNewPosts = (newPosts) => {
        setPosts(newPosts);
        console.log(newPosts);
        // Use reducer action here for all posts
    };

    const getAllPosts = () => {
        axios
        .get('/basicgrams')
        .then(res => {
            if ( res.data.basicgrams ) {
                setNewPosts(res.data.basicgrams);
            } else {
                // some error
                throw new Error("Error getting all posts");
            }
        })
        .catch((e) => {
            // redirect login here?
            console.log("Could not get all posts");
        }); 
    };

    const getUserPosts = (userId) => {
        axios
        .get(`/basicgrams/user/${userId}`)
        .then(res => {
            if ( res.data.basicgrams ) {
                console.log(res.data.basicgrams);
            } else {
                // some error
                throw new Error(`Error getting all ${userId}'s posts`);
            }
        })
        .then(() => {
            makeNewComment("blahblahblah");// test
        })
        .then(() => {
            getCommentsByPost("5de8b38c6064fe3df299f88c"); //test
        })
        .catch((e) => {
            // redirect login here?
            console.log(`Could not get all ${userId}'s posts`);
        }); 
    }

    const makeNewComment = (text) => {
        const body = {
            text,
            postId: "5de8b38c6064fe3df299f88c"
        };
        axios
        .post(`/basicgrams/comment/new`, body)
        .then(res => {
            if ( res.data && res.data.comment ) {
                console.log(res.data.comment);
            } else {
                // some error
                throw new Error(`Error making new comment`);
            }
        })
        .catch((e) => {
            // redirect login here?
            console.log(`Could not make new comment`);
        }); 
    };

    const getCommentsByPost = (postId) => {
        axios
        .get(`/basicgrams/comment/post/${postId}`)
        .then(res => {
            if ( res.data && res.data.comments ) {
                console.log(res.data.comments);
            } else {
                // some error
                throw new Error(`Error getting comments by post`);
            }
        })
        .catch((e) => {
            // redirect login here?
            console.log(`Could not get comments`);
        }); 
    };

    // TODO: Pull posts from redux?
    React.useEffect(() => {
        getAllPosts();
        getUserPosts(getCook('userId'));
    }, []);

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    const onClickPost = e => {
        e.preventDefault();
        history.push("/feed/post")
    }

    return (
        <React.Fragment>
            <TopAppBar onLogoutClick={onLogoutClick} />
            <Container className={classes.container} maxWidth="sm">
                {/* posts */}
                <Grid container spacing={3}>
                    {posts.map(post => (
                        <FeedCard post={post} onClickPost={onClickPost}  />
                    ))}
                </Grid>
                {/* End sub featured posts */}
            </Container>
            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Container maxWidth="sm">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={()=>history.push("/feed")}>
                            <HomeRoundedIcon />
                        </IconButton>
                        <Fab color="primary" aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <Link to="/profile">
                        <IconButton onClick={() => history.push("/profile")}>
                            <PersonRoundedIcon />
                        </IconButton>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

Feed.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Feed);
