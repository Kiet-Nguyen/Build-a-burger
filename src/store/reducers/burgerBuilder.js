import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
};

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.6,
	meat: 1.5,
	bacon: 0.8,
};

const addIngredient = (state, action) => {
	const updateIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	};
	const updateIngredients = updateObject(state.ingredients, updateIngredient);
	const updateState = {
		ingredients: updateIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
	};
	// return {
	// 	...state,
	// 	ingredients: {
	// 		...state.ingredients,
	// 		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	// 	},
	// 	totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
	// };
	return updateObject(state, updateState);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
				},
				totalPrice: 4,
				error: false,
			};

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, {
				error: true,
			});

		case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
			};

		default:
			return state;
	}
};

export default reducer;
