import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TopAppBar from '../components/TopAppBar';
import FeedCard from '../components/FeedCard';
import BottomAppBar from "../components/BottomAppBar";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
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
        .catch((e) => {
            // redirect login here?
            console.log(`Could not get all ${userId}'s posts`);
        }); 
    }

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
            <BottomAppBar />
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
