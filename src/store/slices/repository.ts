import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { axiosInstance } from '../../utils';
import { UrlsEnum, IRepository } from '../../common-types';

interface IRepositoryInfoState {
  load: boolean;
  userRepositories: IRepository[];
  searchText: string;
}

const initialState: IRepositoryInfoState = {
  load: false,
  userRepositories: [],
  searchText: '',
};

export const repositoryInfoSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setLoad: (state: IRepositoryInfoState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },
    setRepositories: (state: IRepositoryInfoState, { payload }: PayloadAction<IRepository[]>) => {
      state.userRepositories = payload;
    },
    setSearchText: (state: IRepositoryInfoState, { payload }: PayloadAction<string>) => {
      state.searchText = payload;
    },
  },
});

export const repositoryInfoActions = repositoryInfoSlice.actions;
export const repositoryInfoReducer = repositoryInfoSlice.reducer;

export const getRepositories =
  (username?: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { searchText } = getState().repositoryInfoStore;
    dispatch(repositoryInfoActions.setLoad(true));

    try {
      const { data } = await axiosInstance.get(`${UrlsEnum.searchRepository}`, {
        params: {
          q: searchText ? `${searchText}+user:${username}` : `user:${username}`,
        },
      });

      const filteredData = data.items.map((el: IRepository) => {
        return {
          id: el.id,
          forks_count: el.forks_count,
          name: el.name,
          stargazers_count: el.stargazers_count,
          html_url: el.html_url,
        };
      });

      dispatch(repositoryInfoActions.setRepositories(filteredData));
      dispatch(repositoryInfoActions.setLoad(false));
    } catch (e) {
      console.error(e);
    }
  };
