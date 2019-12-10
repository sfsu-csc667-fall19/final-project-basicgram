import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';
import { fetchAllPosts } from '../redux/actions/postActions';

import TopAppBar from '../components/TopAppBar';
import FeedCard from '../components/FeedCard';
import BottomAppBar from "../components/BottomAppBar";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
}));

// Courtesy of stack over flow :D
const getCook = (cookiename) => {
    // Get name followed by anything except a semicolon
    let cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
}

const Feed = ({ logoutUser, history, fetchAllPosts, posts }) => {
    const classes = useStyles();
    
    React.useEffect(() => {
        fetchAllPosts();
    }, [fetchAllPosts]);

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    } 

    console.log(posts.posts)

    return (
        <React.Fragment>
            <TopAppBar onLogoutClick={onLogoutClick} />
            <Container className={classes.container} maxWidth="sm">
                {/* posts */}
                <Grid container spacing={3}>
                    {posts.posts ? (posts.posts.map(post => (
                        <FeedCard post={post} onClickPost={() => history.push({
                            pathname: `/feed/post/${post._id}`,
                            state: { post: post }
                          })} />
                    ))) : <h1>No Posts Available</h1>}
                </Grid>
                {/* End sub featured posts */}
            </Container>
            <BottomAppBar />
        </React.Fragment>
    );
}

Feed.propTypes = {
    fetchAllPosts: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts,
});
export default connect(
    mapStateToProps,
    { logoutUser, fetchAllPosts }
)(Feed);
