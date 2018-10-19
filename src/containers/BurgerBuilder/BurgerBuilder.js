import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // Disable Less button of a respective ingredient if its amount is equal to 0
    for (let key in disabledInfo) {
      // Truthy or Falsy, i.e meat: true, salad: false
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }
    
    return (
      <Aux>
        <Modal show={ this.state.purchasing }>
          <OrderSummary ingredients={ this.state.ingredients } />
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

export default BurgerBuilder;
