import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Divider, CardActions, Link, Card, Hidden, CardMedia, Typography, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core'
import {fetchCommentsByPost, addComment} from '../redux/actions/commentActions'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        height: '75vh'
    },
    cardDetails: {
        flex: 2,
    },
    cardMedia: {
        flex: 3.5,
    },
    mainGrid: {
        marginTop: theme.spacing(10),
    },
    root: {
        width: '100%',
    },
    commentSection: {
        height: '65vh',
        overflowY: 'auto'
    },
    commentInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '13px',
    },
}));

const PostCard = ({fetchCommentsByPost, addComment, comment, comments, post}) => {
    const classes = useStyles();

    const submit = async (e) => {
        e.preventDefault();
        addComment(post._id, comment)
    }

    React.useEffect(() => {
        fetchCommentsByPost(post._id);
    }, [fetchCommentsByPost]);

    return (
        <Grid className={classes.mainGrid}>
            <Grid item sm={12} md={12}>
                <Card className={classes.card} elevation={3}>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={post.image} />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardActions className={classes.infoSection}>
                            <Typography component="subtitle1" variant="subtitle1">
                                <b>{post.author.username}</b>
                            </Typography>
                        </CardActions>
                        <Divider />
                        <div className={classes.commentSection}>
                            <List className={classes.root}>
                                {comments.comments.map(commentPost => {
                                    return <ListItem key={commentPost._id}>
                                        <ListItemText primary={commentPost.text} secondary={moment(`${commentPost.createdAt}`).startOf('second').fromNow()}></ListItemText>
                                    </ListItem>
                                })
                                }
                            </List>
                        </div>
                        <Divider />
                        <CardActions className={classes.inputSection}>
                            <form onSubmit={submit}>
                                {/* <input type="text" placeholder="Add a comment" className={classes.commentInput} value={comment.comment} onChange={e => comment.comment(e.target.value)} /> */}
                                <Button
                                    type="submit"
                                    component="button"
                                    style={{ fontSize: '13px' }}
                                >Post</Button>
                            </form>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
        </Grid>
    );
}

PostCard.propTypes = {
    fetchCommentsByPost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    comment: state.comment,
    comments: state.comments
})

export default connect(
    mapStateToProps,
    { fetchCommentsByPost, addComment }
)(PostCard);