import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { signIn, addUser, del, delLogUser, setApiData } from 'actions'

const initialState = new Map({
  entries: new Map({
    profile: new Map(),
    users: new Map(),
    currentApi: new Map(),
  })
})

export const dataReducer = handleActions({
  [signIn]: (state, action) => {
    const login = 'login'
    return state.setIn(['entries', 'profile', login], fromJS({...action.payload}))
  },
  [delLogUser]: (state, action) => {
    return state.removeIn(['entries', 'profile', 'login'])
  },
  [addUser]: (state, action) => {
    const { newUserId } = action.payload
    return state.setIn(['entries', 'users', newUserId], fromJS({...action.payload}))
  },
  [del]: (state, action) => {
    return state.removeIn(['entries', 'users', action.payload])
  },
  [setApiData]: (state, action) => {
    return state.setIn(['entries', 'currentApi'], fromJS({...action.payload}))
  }
}, initialState)