import { combineReducers } from 'redux';
import formReducer from './formReducer';
import tabReducer from './tabReducer';
import userListReducer from './userListReducer';

const rootReducer = combineReducers({
  form: formReducer,
  tab: tabReducer,
  userList: userListReducer
});

export default rootReducer;