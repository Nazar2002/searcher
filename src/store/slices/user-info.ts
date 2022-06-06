import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { axiosInstance } from '../../utils';
import { UrlsEnum, IUser } from '../../common-types';

interface IUserInfoState {
  load: boolean;
  user: IUser | null;
}

const initialState: IUserInfoState = {
  load: false,
  user: null,
};

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoad: (state: IUserInfoState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },
    setUser: (state: IUserInfoState, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;

export const getUser =
  (name?: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`${UrlsEnum.user}/${name}`);

      dispatch(userInfoActions.setUser(data));
    } catch (e) {
      console.error(e);
    }
  };
