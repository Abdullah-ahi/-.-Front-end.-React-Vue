import { createAction } from 'redux-actions';

export const signIn = createAction('[LoginForm] Sign In')
export const addUser = createAction('[Settings] Add User')
export const del = createAction('[Settings] Delete User')
export const delLogUser = createAction('[Settings] Delete Log User');
export const setApiData = createAction('[API ] Set current API data')