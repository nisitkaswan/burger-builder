import React, { Component } from 'react';
import * as actions from '../../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to="/"></Redirect>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}


export default connect(null,mapDispatchToProps)(Logout);