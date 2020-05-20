import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {

            super(props);

            this.state = {
                error: null
            }



        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }


        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }


        render() {
            return <Aux>
                <Modal
                    modalClicked={this.errorConfirmedHandler}
                    show={this.state.error}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}></WrappedComponent>
            </Aux>
        }

    }
}

export default withErrorHandler;