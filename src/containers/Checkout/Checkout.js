import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class Checkout extends Component {



    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to="/"></Redirect>


        if (this.props.ings) {

            console.log(this.props);

            const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect> : null;

            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}></Route>
            </div>

        }

        return (

            <div>
                   { summary }
        </div>



        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);