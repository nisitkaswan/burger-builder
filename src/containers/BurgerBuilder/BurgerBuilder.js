import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        const updatedCount = oldCount + 1;

        const updatedIngredient = {
            ...this.state.ingredients
        }

        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;

        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        })

        this.updatePurchaseState(updatedIngredient);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount > 0) {

            const updatedCount = oldCount - 1;

            const updatedIngredient = {
                ...this.state.ingredients
            }

            updatedIngredient[type] = updatedCount;

            const priceSubtraction = INGREDIENT_PRICES[type];

            const oldPrice = this.state.totalPrice;

            const newPrice = oldPrice - priceSubtraction;

            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredient
            })

            this.updatePurchaseState(updatedIngredient);
        }
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients = {
            ...updatedIngredients
        }

        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)

        this.setState({
            purchasable: sum > 0
        });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelled = () => {
        this.setState({ purchasing: false });
    }

    purchaseCancelHandler = () => { }

    purchaseContinueHandler = () => { }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (

            <Aux>
                <Modal modalClosed={this.purchaseCancelled}
                    show={this.state.purchasing}>
                    <OrderSummary
                        purchaseContinued={this.purchaseContinueHandler}
                        purchaseCancelled={this.purchaseCancelHandler}
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice.toFixed(2)}>
                    </OrderSummary>
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients} ></Burger>
                </div>
                <div>
                    <BuildControls
                        disabled={disabledInfo}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}>
                    </BuildControls>
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;