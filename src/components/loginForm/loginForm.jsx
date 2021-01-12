import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './loginForm.css'
export class LoginForm extends Component {
  state = {
    newUserId: 0,
    name: '',
    password: ''
  }
  checkLogin = (login) => {
    let result;
    if (login){
      if (login.match(/[a-z]/gi) === null){
        result = false;
      }else{
        result = login === login.match(/[a-z]/gi).join('');
      }
      return result;
    }else{
      return
    }
  }

  checkPassword = (password) => {
    let result;
    const validation = /(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
    if (password){
      if (password.match(validation) === null){
        result = false;
      }else{
        result = password === password.match(validation).join('');
      }
      return result;
    }else{
      return
    }
  }
  checkLinkPath = (name, password) => {
    let result;
    if (!this.checkLogin(name) || !this.checkPassword(password)){
      result =  false;
    }else{
      result =  true
    }
    return result
  }
  renderLoginErrs = (name, password) => {
    if (document.querySelector('.format-error')){
      document.querySelector('.format-error').remove()
    }
    const error = document.createElement('div');
    error.classList.add('format-error')
    if (!this.checkLogin(name) && !this.checkPassword(password)){
      error.textContent = 'Имя должно быть введено на латинице \n Пароль должен быть не короче 6 символов и содержать числа, латинские прописные и строчные буквы и спецсимволы';
    }else if (!this.checkLogin(name)){
      error.textContent = 'Имя должно быть введено на латинице'
    }else{
      error.textContent = 'Пароль должен быть не короче 6 символов и содержать числа, латинские прописные и строчные буквы и спецсимволы'
    }
    document.querySelector('.login-form').append(error)
  }

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    this.setState({
      [fieldName]: event.target.value
    })
  }
  handleLogin = () => {
    const { SignIn, addUser } = this.props;
    const { name, password } = this.state
    if (!this.checkLogin(name) || !this.checkPassword(password)){
      this.renderLoginErrs(name, password)
      return
    }else{
      SignIn(this.state);
      addUser(this.state)
    }
  }
  render(){
    const { name, password } = this.state;
    return(
      <div className="login-form">
        <TextField name="name" onChange={this.handleInputChange} className="text-input login" id="standard-required" label="Login"/>
        <TextField name="password" onChange={this.handleInputChange} className="text-input password" id="standard-password-input" label="Password" type="password" autoComplete="current-password"/>
        <Link to={!this.checkLinkPath(name, password) ? () => {return} : '/head'} className="login-link">
          <Button onClick={this.handleLogin} className="login-btn" variant="outlined" color="primary">LOGIN</Button>
        </Link>
      </div>
    )
  }
}