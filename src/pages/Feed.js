import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';
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


const Feed = ({ logoutUser, history }) => {
    const classes = useStyles();

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
                    {featuredPosts.map(post => (
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
