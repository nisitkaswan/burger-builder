import React, { Component } from "react";
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        alert('You continue!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        Axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="your name"></input>
            <input className={classes.Input} type="text" name="email" placeholder="your email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal code"></input>
            <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner></Spinner>
        }
        return (<div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>)
    }

}

export default withRouter(ContactData);