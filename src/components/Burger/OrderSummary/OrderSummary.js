import React from 'react';

import Aux from '../../../hoc/Aux';

const OrderSummary = ({ ingredients }) => {
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
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
