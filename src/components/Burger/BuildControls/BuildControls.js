import React from 'react';
import { func } from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({ ingredientAdded, ingredientRemoved, disabled}) => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <BuildControl 
        label={ctrl.label} 
        key={ctrl.label} 
        added={() => ingredientAdded(ctrl.type)}
        removed={() => ingredientRemoved(ctrl.type)}
        disabled={disabled[ctrl.type]}
      />
    ))}
  </div>
);

BuildControls.propTypes = {
  ingredientAdded: func.isRequired,
  ingredientRemoved: func.isRequired,
};

export default BuildControls;
