import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount() {

        this.props.onFetchOrders();

    }

    render() {

        console.log(this.props.orders);

        let orders = <spinner></spinner>

        if (!this.props.loading)
            orders = this.props.orders.map(order => {
                return <Order
                    price={order.price}
                    ingredients={order.ingredients}
                    key={order.id}></Order>
            });

        return (<div>
            {orders}
        </div>);
    }

}

export const mapStateToProps = state => {
    return {

        'orders': state.order.orders,
        'loading': state.order.loading

    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders));