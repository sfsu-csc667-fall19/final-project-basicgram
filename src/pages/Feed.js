import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logoutUser} from '../redux/actions/authActions'

const Feed = ({ logoutUser, auth }) => {
    const onLogoutClick = e => {
        e.preventDefault();
        logoutUser();
    }
    const { username } = auth;
    return (
        <div style={{ height: "75vh" }}>
            <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={onLogoutClick}
            >
                Logout
            </button>
        </div>
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