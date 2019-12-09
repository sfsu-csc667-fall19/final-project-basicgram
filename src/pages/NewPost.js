import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Toolbar, Fab, IconButton, Card, AppBar, Grid } from '@material-ui/core'
import { logoutUser } from '../redux/actions/authActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import TopAppBar from '../components/TopAppBar';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';


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
        // background: 'green',
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

const NewPost = ({ logoutUser, history }) => {
    const classes = useStyles();
    const [postCaption, setPostCaption] = useState('');
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }

    const backButton = e => {
        e.preventDefault();
        history.push('/feed')
    }

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
      };
    
      const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('caption', postCaption);
    
        console.log("body: " + formData.body)

        console.log(formData)
    
        try {
          const res = await axios.post('/basicgrams/new', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
    
          const { fileName, filePath } = res.data;
    
          setUploadedFile({ fileName, filePath });
    
          setMessage('File Uploaded');
        } catch (err) {
          if (err.response.status === 500) {
            setMessage('There was a problem with the server');
          } else {
            setMessage(err.response.data.msg);
          }
        }
      };

    return (
        <React.Fragment>
            <TopAppBar onLogoutClick={onLogoutClick} backButton={backButton} />
            <Container maxWidth="md">
                <main>
                    <Grid className={classes.mainGrid}>
                        <Grid item sm={12} md={12}>
                            <Card className={classes.card} elevation={3}>
                                <div className="caption-input">
                                    <p>Enter caption</p>
                                    <input type="text" onChange={e => setPostCaption(e.target.value)} value={postCaption} />
                                    <p>{postCaption}</p>
                                </div>
                                <br/>
                                <br/>
                                <div className="file-upload">
                                    {message ? message : null}
                                    <form onSubmit={onSubmit}>
                                        <div className='custom-file mb-4'>
                                            <input
                                                type='file'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                {filename}
                                            </label>
                                        </div>

                                        <input
                                            type='submit'
                                            value='Upload'
                                            className='btn btn-primary btn-block mt-4'
                                        />
                                    </form>
                                    {uploadedFile ? (
                                        <div className='row mt-5'>
                                            <div className='col-md-6 m-auto'>
                                                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                            </Card>
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Container maxWidth="sm">
                    <Toolbar>
                        <IconButton edge="start" color="inherit">
                            <HomeRoundedIcon />
                        </IconButton>
                        <Fab color="primary" aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <IconButton edge="end" color="inherit">
                            <PersonRoundedIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

NewPost.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(NewPost);
