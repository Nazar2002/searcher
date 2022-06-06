import { combineReducers } from '@reduxjs/toolkit';
import { userInfoReducer, usersListReducer, repositoryInfoReducer } from '../slices';

export const rootReducer = combineReducers({
  usersListStore: usersListReducer,
  userInfoStore: userInfoReducer,
  repositoryInfoStore: repositoryInfoReducer,
});
