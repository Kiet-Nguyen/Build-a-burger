import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

// const INGREDIENT_PRICE = {
//   salad: 0.5,
//   cheese: 0.6,
//   meat: 1.5,
//   bacon: 0.8
// };

class BurgerBuilder extends Component {
  state = {
    // purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount = () => {
    console.log(this.props);
    
    // try {
    //   const response = await axios.get('https://build-a-burger-85408.firebaseio.com/ingredients.json');
    //   this.setState({ ingredients: response.data });
    // } catch (error) {
    //   this.setState({ error: true });
    // }
  }

  updatePurchaseState = ingredients => {
    const ingredientsKeyArr = Object.keys(ingredients);
    const sum = ingredientsKeyArr.map(key => {
      return ingredients[key];
    }).reduce((accummulator, currValue) => {
      return accummulator + currValue;
    }, 0);

    // this.setState({ purchaseable: sum > 0 });
    return sum > 0;
  }

  // addIngredientHandler = type => {
  //   // Update ingredients
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   // Update totalPrice
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice + priceAddition;

  //   this.setState({ 
  //     totalPrice: updatedPrice, 
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = type => {
  //   // Update ingredients
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   // Update totalPrice
  //   const priceDeduction = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice - priceDeduction;

  //   this.setState({
  //     totalPrice: updatedPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = async () => {
    // alert('You continue!');
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push('price=' + this.props.price);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    // Disable Less button of a respective ingredient if its amount is equal to 0
    for (let key in disabledInfo) {
      // Truthy or Falsy, i.e meat: true, salad: false
      disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    /* Spinner */
    let orderSummary = null;
    let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={!this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    
    return (
      <Aux>
        <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
          { orderSummary }
        </Modal>
          { burger }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ 
      type: actionTypes.ADD_INGREDIENT, 
      ingredientName: ingName, 
    }),
    onIngredientRemoved: (ingName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
