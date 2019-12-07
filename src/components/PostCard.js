import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, CardActions, Link, Card, Hidden, CardMedia, Typography, Grid, List, ListItem, ListItemText } from '@material-ui/core'

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
                                authorname
                            </Typography>
                        </CardActions>
                        <Divider />
                        <div className={classes.commentSection}>
                            <List className={classes.root}>

                            </List>
                        </div>
                        <Divider />
                        <CardActions className={classes.inputSection}>
                            <input placeholder="Add a comment" className={classes.commentInput} />
                            <Link
                                component="button"
                                style={{ fontSize: '13px' }}
                            >Post</Link>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
        </Grid>
    );
}