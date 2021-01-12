import React, { Component } from 'react'

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import { TextField } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './header.css'
export class Header extends Component {
  render(){
    const { users, Login, SignIn } = this.props
    return(
      <header>
        <AppBar position="static" className="page-header">
          <Toolbar className="header-content">
            <TextField id="outlined-basic" placeholder="Search" variant="outlined" className="search-input"/>
            <div>

              <label htmlFor="header-profile-input">
                <PersonIcon/>
              </label>
              <input type="checkbox" name="" id="header-profile-input"/>
              <div className="header-profile-block">
                {Login.login ? Login.login.name : ''}
              </div>

              <label htmlFor="header-users-input" className="header-users-icon">
                <PeopleAltIcon/>
              </label>
              <input type="checkbox" name="" id="header-users-input"/>
              <div className="header-users-block">
                <p className="current-login">{Login.login ? Login.login.name : ''}</p>
                <ul className="header-users-list">
                  {
                    users.map((user, idx) => <li className="header-users-list-item" key={idx}><Link to='/head'><ExitToAppIcon onClick={() => SignIn({name: user.name, password: user.password, newUserId: user.newUserId})} className="log-in-icon"/></Link> <span>{`${user.name} ${user.surname ? user.surname : ''}`}</span></li>)
                  }
                </ul>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <AppBar position="static" className="page-header-categories">
          <Toolbar className="menu-content">
            <div className="menu">
              <Link to='/head' className="nav-link">Главная</Link>
              <Link to='/settings' className="nav-link">Настройки</Link>
            </div>
          </Toolbar>
        </AppBar>
      </header>
    )
  }
}