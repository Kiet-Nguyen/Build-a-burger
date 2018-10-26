import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.5,
  bacon: 0.8
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
  }

  updatePurchaseState = ingredients => {
    const ingredientsKeyArr = Object.keys(ingredients);
    const sum = ingredientsKeyArr.map(key => {
      return ingredients[key];
    }).reduce((accummulator, currValue) => {
      return accummulator + currValue;
    }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    // Update ingredients
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    // Update totalPrice
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;

    this.setState({ 
      totalPrice: updatedPrice, 
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = type => {
    // Update ingredients
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    // Update totalPrice
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = async () => {
    // alert('You continue!');
    this.setState({ loading: true });
    const orderSummary = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
      this.setState({ loading: false, purchasing: false });
    } catch (error) {
      this.setState({ loading: false, purchasing: false });
    }
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // Disable Less button of a respective ingredient if its amount is equal to 0
    for (let key in disabledInfo) {
      // Truthy or Falsy, i.e meat: true, salad: false
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    // Spinner
    let orderSummary = <OrderSummary
      ingredients={ this.state.ingredients }
      totalPrice={ this.state.totalPrice }
      purchaseCanceled={ this.purchaseCancelHandler }
      purchaseContinued={ this.purchaseContinueHandler }
    />
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    
    return (
      <Aux>
        <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
          { orderSummary }
        </Modal>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls 
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          price={ this.state.totalPrice }
          purchaseable={ !this.state.purchaseable }
          ordered={ this.purchaseHandler }
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
