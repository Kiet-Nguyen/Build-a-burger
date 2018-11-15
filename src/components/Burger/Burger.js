import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  console.log(props);
  // Output as many <BurgerIngredient /> as given in props.ingredients[key], i.e 2 cheese and 2 meat
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])]
      .map((currValue, currIndex) => {
        return <BurgerIngredient key={ingredientKey + currIndex} type={ingredientKey} />
      });
    })
    // Combine 4 arrays (salad, bacon, cheese, meat) into 1 array for the next conditional check
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
