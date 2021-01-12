import React, { PureComponent } from 'react';
import { Settings } from 'components/settings';
import { connect } from 'react-redux';

import { addUser, del, signIn, delLogUser } from 'actions'

class settingsContainer extends PureComponent {

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

  checkTel(tel){
    let result;
    if (tel.match(/\+7[\-]\d{3}[\-]\d{3}[\-]\d{4}/) === null){
      result = false;
    }else{
      result = tel === tel.match(/\+7[\-]\d{3}[\-]\d{3}[\-]\d{4}/).join('');
    }
    return result;
  }
  render(){
    const { addUser, users, id, delUser, SignIn, loginData, delAuthor, userId, currentUser } = this.props
    return (
      <Settings checkTel={this.checkTel} checkPassword={this.checkPassword} checkLogin={this.checkLogin} addUser = {addUser} users={users} id={id} delUser={delUser} SignIn={SignIn} Login={loginData} delAuthor={delAuthor} userId={userId} currentUser={currentUser}/>
    )
  }
}
function mapStateToProps(state, ownProps){
  const { match } = ownProps;
  const users = state.data.getIn(['entries', 'users']).toList().toJS()
  const lastId = state.data.getIn(['entries', 'users']).size ? state.data.getIn(['entries', 'users']).last().get('newUserId') : -1
  const id = +lastId+1;
  const loginData = state.data.getIn(['entries', 'profile']).toJS()
  let userId = null;
  let currentUser = null
  if (match && users[match.params.id]){
    userId = match.params.id
    currentUser = users[match.params.id]
  }
  return {
    userId,
    users,
    id,
    loginData,
    currentUser,
  }
}
function mapDispatchToProps(dispatch){

  return {
    addUser: (userData) => dispatch(addUser(userData)),
    delUser: (id) => dispatch(del(id)),
    SignIn: (data) => dispatch(signIn(data)),
    delAuthor: () => dispatch(delLogUser())
  }
}
export const settingsRedux = connect(mapStateToProps, mapDispatchToProps)(settingsContainer)