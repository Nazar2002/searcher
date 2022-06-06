import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { axiosInstance } from '../../utils';
import { UrlsEnum, IUser } from '../../common-types';

interface IUsersListState {
  load: boolean;
  users: IUser[] | null;
  searchText: string;
}

const initialState: IUsersListState = {
  load: false,
  users: [],
  searchText: '',
};

export const usersListSlice = createSlice({
  name: 'users-list',
  initialState,
  reducers: {
    setLoad: (state: IUsersListState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },
    setUsers: (state: IUsersListState, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },
    setSearchText: (state: IUsersListState, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
  },
});

export const usersListActions = usersListSlice.actions;
export const usersListReducer = usersListSlice.reducer;

export const getUsersList =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const searchText = getState().usersListStore.searchText;
    dispatch(usersListActions.setLoad(true));

    try {
      const { data } = await axiosInstance.get(UrlsEnum.users, {
        params: {
          q: searchText ? searchText : '""',
        },
      });

      dispatch(usersListActions.setUsers(data.items));
      dispatch(usersListActions.setLoad(false));
    } catch (e) {
      console.error(e);
    }
  };
