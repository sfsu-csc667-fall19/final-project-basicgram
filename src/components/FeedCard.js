import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, CardActions, Divider, Link, Button } from '@material-ui/core'
import moment from 'moment'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
  },
  media: {
    height: 0,
    paddingTop: '100%',
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

export default function FeedCard(props) {
  const [comment, setComment] = React.useState("");
  const classes = useStyles();

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
  const submit = async (e) => {
    e.preventDefault();
    makeNewComment(comment)
    setComment('')
  }
  return (
    <Grid item className={classes.mainGrid} xs={12} md={12}>
      <Card className={classes.card} elevation={3}>
        <CardActionArea onClick={props.onClickPost}>
          <CardContent>
            <Typography component="subtitle1" variant="subtitle1">
              <b>{props.post.author.username}</b>
            </Typography>
          </CardContent>
          <Divider />
          <CardMedia
            className={classes.media}
            image={props.post.image}
            title="Image title"
          />
          <CardContent>
            <Typography component="subtitle2" variant="subtitle2">
              <b>{props.post.author.username}</b> {props.post.caption}
            </Typography>
            <Typography component="p" variant="p" color="textSecondary">
              {moment(`${props.post.createdAt}`).startOf('hour').fromNow()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className={classes.inputBox}>
          <form onSubmit={submit}>
            <input type="text" placeholder="Add a comment" className={classes.commentInput} value={comment} onChange={e => setComment(e.target.value)} />
            <Button
              type="submit"
              component="button"
              style={{ fontSize: '13px' }}
            >Post</Button>
          </form>
        </CardActions>
      </Card>
    </Grid>
  );
}