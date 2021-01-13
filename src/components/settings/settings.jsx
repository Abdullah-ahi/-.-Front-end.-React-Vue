import React, { Component } from 'react';
import { LogOutBlock } from 'components/logOutBlock'

import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Link } from 'react-router-dom';

import classNames from 'classnames'
import './settings.css'

export class Settings extends Component {
  state = {
    name: '',
    surname: '',
    tel: '',
    about: '',
    password: '',
    formIsVisible: false,
    btnIsVisible: true,
    editBtnIsVisible: false,
    changeUserId: '',
  }

  showForm = () => {
    const { formIsVisible, btnIsVisible } = this.state
    this.setState({
      formIsVisible: !formIsVisible,
      btnIsVisible: !btnIsVisible,
      editBtnIsVisible: false,
    })
  }
  handleInputChange = (event) => {
    const fieldName = event.target.name
    this.setState({
      [fieldName]: event.target.value
    })
  }
  handleUserAdd = (event, editId) => {
    const { addUser, id, checkTel, checkPassword, checkLogin, checkAbout, Login, SignIn } = this.props
    const { name, surname, tel, about, password, btnIsVisible, formIsVisible } = this.state;
    const newUserId = editId !== undefined ? editId : id
    if(!checkTel(tel) || !checkPassword(password) || !checkLogin(name) || !checkLogin(surname) || !checkAbout(about)){
      this.renderUserAddErrs(tel, password, name, surname, about)
      return
    }else{
      let err = document.getElementsByClassName('user-add-error')
      let length = err.length
      if (err.length){
        for (let i =0; i < length; i++){
          err[0].remove()
        }
      }
      if (Login.login.newUserId !==undefined){
        if (Login.login.newUserId === editId){
          SignIn({name, password, newUserId: editId})
        }
      }
      const newUserData = {
        newUserId,
        name,
        surname,
        tel,
        about,
        password
      }
      addUser(newUserData)
      this.setState({
        name: '',
        surname: '',
        tel: '',
        about: '',
        password: '',
        formIsVisible: !formIsVisible,
        btnIsVisible: !btnIsVisible
      })
    }
  }
  renderUserAddErrs = (tel, password, name, surname, about) => {
    const { checkTel, checkPassword, checkLogin, checkAbout } = this.props
    let err = document.getElementsByClassName('user-add-error')
    let length = err.length
    if (err.length){
      for (let i =0; i < length; i++){
        err[0].remove()
      }
    }
    const inputs = document.getElementsByClassName('user-input')
    for(let i = 0; i < inputs.length; i++){
      let error = document.createElement('span')
      error.classList.add('user-add-error')
      inputs[i].insertAdjacentElement('beforeend', error)

      if (inputs[i].dataset.name === 'name'){
        if (!checkLogin(name)){
          error.textContent = 'Имя должно быть введено на латинице';
        }
      }else if (inputs[i].dataset.name === 'surname'){
        if (!checkLogin(surname)){
          error.textContent = 'Фамилия должна быть введена на латинице'
        }
      }else if (inputs[i].dataset.name === 'tel'){
        if (!checkTel(tel)){
          error.textContent = 'Телефон должен быть введен в формате: +7-000-000-0000'
        }
      }else if (inputs[i].dataset.name === 'password'){
        if (!checkPassword(password)){
          error.textContent = 'Пароль должен быть не короче 6 символов и содеожать числа, латинские прописные и строчные буквы и спецсимволы'
        }
      }else{
        if (!checkAbout(about)){
          error.textContent = 'Поле не может быть пустым и должно быть заполнено на латинице'
        }
      }
    }
  }
  
  handleUserEdit = (id) => {
    const { editBtnIsVisible, changeUserId} = this.state;
    let err = document.getElementsByClassName('user-add-error')
    let length = err.length
    if (err.length){
      for (let i =0; i < length; i++){
        err[0].remove()
      }
    }
    this.showForm()
    this.setState({
      editBtnIsVisible: true,
      changeUserId: id,
    })
  }
  deleteUser = (id, password, name) => {
    const { delUser, delAuthor, Login } = this.props
    delUser(id)
    if (Login.login){
      if (Login.login.name === name && Login.login.password === password){
        delAuthor()
      }
    }
  }
  switchLogin = (user) => {
    const { SignIn } = this.props
    SignIn({name: user.name, password: user.password, id: user.newUserId})
  }

  render(){
    const { users, Login, SignIn, userId, currentUser } = this.props
    const { formIsVisible, btnIsVisible, name, editBtnIsVisible, changeUserId, surname, tel, about, password } = this.state
    const formClasses = classNames('add-user-form', {
      'show': formIsVisible,
      'hide': !formIsVisible
    })
    const btnClasses = classNames('add-user-btn', {
      'show': btnIsVisible,
      'hide': !btnIsVisible
    })
    const editBtnClasses = classNames({
      'show': editBtnIsVisible,
      'hide': !editBtnIsVisible
    })
    const addBtnClasses = classNames({
      'show': !editBtnIsVisible,
      'hide': editBtnIsVisible
    })
    const usersInfoBlockClasses = classNames('user-info', {
      'user-info-open-block': userId
    })
    const addUsersBlockClasses = classNames('add-user-block',{
      'small-add-users-block': userId
    })
    const usersBlockClasses = classNames('users', {
      'small-users-block': userId
    })
    return (
      users.length
      ?
      <div>
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
                      users.map((user, idx) => <li className="header-users-list-item" key={idx}><Link to={`/settings/users/${user.newUserId}`}><ExitToAppIcon onClick={() => SignIn({name: user.name, password: user.password, newUserId: user.newUserId})} className="log-in-icon"/></Link> <span>{`${user.name} ${user.surname ? user.surname : ''}`}</span></li>)
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
        <main>
          <div className="users-container">
            <div className={usersBlockClasses}>
              <List>
                {
                  users.map((user, idx) =>
                    <ListItem key={idx} className="users-item">
                      <ListItemText primary={`${user.name} ${user.surname ? user.surname : ''}`}/>
                      <Link to={`/settings/users/${user.newUserId}`} className="switch-btn" onClick={() => this.switchLogin(user)}>
                        <AddCircleOutlineIcon className="switch-btn-item"></AddCircleOutlineIcon>
                      </Link>
                      <Link to='/settings' className="switch-btn">
                        <DeleteForeverIcon onClick={() => this.deleteUser(user.newUserId, user.password, user.name)} className="switch-btn-item"></DeleteForeverIcon>
                      </Link>
                      <EditIcon onClick={() => this.handleUserEdit(user.newUserId)} className="edit-btn"></EditIcon>
                    </ListItem>)
                }
              </List>
            </div>

            <div className="user-data-container">
              <div className={addUsersBlockClasses}>
                <div className={formClasses}>
                  <TextField onChange={this.handleInputChange} data-name="name" name="name" className="user-input" label="Имя" variant="outlined"  value={name}/>
                  <TextField onChange={this.handleInputChange} data-name="surname" name="surname"className="user-input"  label="Фамилия" variant="outlined"  value={surname}/>
                  <TextField onChange={this.handleInputChange} data-name="tel" name="tel" className="user-input" label="Телефон" variant="outlined" value={tel} />
                  <TextField onChange={this.handleInputChange} data-name="password" name="password" className="user-input" label="Пароль" type="password" variant="outlined" value={password} />
                  <TextField onChange={this.handleInputChange} data-name="about" name="about" className="user-input user-info-textarea" label="О себе" variant="outlined" multiline={true} value={about}/>
                  <div className="form-control-btns">
                    <Button onClick={this.showForm} className="cancel-user-add" variant="outlined">Отмена</Button>
                    <Button className={addBtnClasses} onClick={this.handleUserAdd} variant="outlined">Добавить</Button>
                    <Button className={editBtnClasses} onClick={() => this.handleUserAdd(event, changeUserId)} variant="outlined">Изменить</Button>
                  </div>
                </div>

                <Button onClick={this.showForm} className={btnClasses} variant="outlined">+ Добавить пользователя</Button>
              </div>
              <div className={usersInfoBlockClasses}>
                {
                  currentUser
                  ?
                  <div className="user-info-container">
                    <Link to='/settings' className="user-info-block-close-link">
                      <HighlightOffIcon className = "user-info-block-close-icon"/>
                    </Link>
                    <div className="user-info-block">
                      <span className="name">{currentUser.name}</span>
                      <span className="surname">{currentUser.surname}</span>
                      <p className="tel"><span className="user-info-margin-item">Телефон:</span>{currentUser.tel}</p>
                      <p className="about"><span className="user-info-margin-item">О себе:</span>{currentUser.about}</p>
                    </div>
                  </div>
                  :
                  ''
                }
              </div>
            </div>
          </div>
        </main>
      </div>
      :
      <LogOutBlock/>
    )
  }
}