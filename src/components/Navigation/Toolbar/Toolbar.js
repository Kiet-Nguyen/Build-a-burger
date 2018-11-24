import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className={ classes.Toolbar }>
    <DrawerToggle clicked={ drawerToggleClicked } />
    <div className={ classes.Logo }>
      <Logo />
    </div>
    <nav className={ classes.DesktopOnly }>
      <Navigationitems isAuthenticated={isAuth} />
    </nav>
  </header>
);

export default Toolbar;
