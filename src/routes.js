import { loginRedux } from 'containers/loginFormContainer';
import { headRedux } from './containers/headContainer';
import { settingsRedux } from 'containers/settingsContainer';
import { apiDataRedux } from 'containers/apiDataContainer';

export const routes = [
  {
    path: '/',
    exact: true,
    component: loginRedux
  },
  {
    path: '/head',
    exact: true,
    component: headRedux
  },
  {
    path: '/settings',
    exact: true,
    component: settingsRedux
  },
  {
    path: '/settings/users/:id',
    exact: true,
    component: settingsRedux
  },
  {
    path: '/api',
    exact: true,
    component: apiDataRedux
  }
]