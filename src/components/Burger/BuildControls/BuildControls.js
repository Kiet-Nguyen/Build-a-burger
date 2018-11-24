import React from 'react';
import { func, number } from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = ({
	ingredientAdded,
	ingredientRemoved,
	disabled,
	price,
	purchaseable,
  ordered,
  isAuth,
}) => (
	<div className={classes.BuildControls}>
		<p>
			Current price: <strong>{price.toFixed(2)}</strong>
		</p>
		{controls.map(ctrl => (
			<BuildControl
				label={ctrl.label}
				key={ctrl.label}
				added={() => ingredientAdded(ctrl.type)}
				removed={() => ingredientRemoved(ctrl.type)}
				disabled={disabled[ctrl.type]}
			/>
		))}
		<button className={classes.OrderButton} disabled={purchaseable} onClick={ordered} >
			{isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
		</button>
	</div>
);

BuildControls.propTypes = {
	ingredientAdded: func.isRequired,
	ingredientRemoved: func.isRequired,
	price: number.isRequired,
	ordered: func.isRequired,
};

export default BuildControls;
