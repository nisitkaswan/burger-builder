import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {


        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
            {this.props.ingredients[igKey]}</li>
        })

        return <Aux>
            <h3>Your Order</h3>
            <p>Delicious Burger with following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>TotalPrice:{this.props.totalPrice}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={this.props.purchaseCancelled} btnType='Danger'>
                CANCEL
        </Button>
            <Button clicked={this.props.purchaseContinued} btnType='Success'>
                CONTINUE
        </Button>
        </Aux >
    }

}

export default OrderSummary;