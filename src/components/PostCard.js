import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, CardActions, Link, Card, Hidden, CardMedia, Typography, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core'
import axios from 'axios'
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

export default function PostCard(props) {
    const classes = useStyles();
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState("");

    const makeNewComment = (text) => {
        const body = {
            text,
            postId: props.post._id
        };
        axios
            .post(`/basicgrams/comment/new`, body)
            .then(res => {
                console.log(res.data.comment);
            })
            .catch((e) => {
                // redirect login here?
                console.log(`Could not make new comment`);
            });
    }

    const getCommentsByPost = (postId) => {
        axios
            .get(`/basicgrams/comment/post/${postId}`)
            .then(res => {
                setComments(res.data.comments)
            })
            .catch((e) => {
                // redirect login here?
                console.log(`Could not get comments`);
            });
    }

    const submit = async (e) => {
        e.preventDefault();
        makeNewComment(comment)
    }

    React.useEffect(() => {
        getCommentsByPost(props.post._id);
    }, []);

    console.log(comments)
    return (
        <Grid className={classes.mainGrid}>
            <Grid item sm={12} md={12}>
                <Card className={classes.card} elevation={3}>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={props.post.image} />
                    </Hidden>
                    <div className={classes.cardDetails}>
                        <CardActions className={classes.infoSection}>
                            <Typography component="subtitle1" variant="subtitle1">
                                <b>{props.post.author.username}</b>
                            </Typography>
                        </CardActions>
                        <Divider />
                        <div className={classes.commentSection}>
                            <List className={classes.root}>
                                {comments.map(comment => {
                                    return <ListItem>
                                        <ListItemText primary={comment.text} secondary={moment(`${comment.createdAt}`).startOf('hour').fromNow()}></ListItemText>
                                    </ListItem>
                                })
                                }
                            </List>
                        </div>
                        <Divider />
                        <CardActions className={classes.inputSection}>
                            <form onSubmit={submit}>
                                <input type="text" placeholder="Add a comment" className={classes.commentInput} value={comment} onChange={e => setComment(e.target.value)} />
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