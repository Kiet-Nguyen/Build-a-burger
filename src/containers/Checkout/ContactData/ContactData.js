import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderSummary = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Kiet',
        address: {
          street: 'Teststreet 1',
          zipCode: '358',
          country: 'Finland'
        },
        email: 'test@text.com'
      },
      deliveryMethod: 'fastest',
    };

    try {
      await axios.post('/orders.json', orderSummary);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
