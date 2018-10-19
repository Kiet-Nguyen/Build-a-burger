import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[OrderSummary] WillUpdate');
  }

  render() {
    const { ingredients, purchaseCanceled, purchaseContinued, totalPrice } = this.props;
    const ingredientSummary = Object.keys(ingredients)
      .map(key => {
        return (
          <li key={key}>
            <span style={{ textTransform: 'capitalize' }}>{ key }</span>: { ingredients[key] }
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          { ingredientSummary }
        </ul>
        <p><strong>Total Price: { totalPrice.toFixed(2) }</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={ purchaseCanceled }>CANCEL</Button>
        <Button btnType="Success" clicked={ purchaseContinued }>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
