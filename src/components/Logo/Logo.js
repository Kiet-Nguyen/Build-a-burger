import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = ({height}) => (
  <div className={ classes.Logo } style={{ height: height }}>
    <img src={ burgerLogo } alt="Logo"/>
  </div>
);

export default Logo;
