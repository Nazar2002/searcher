import React, { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { UserProfile, UsersList } from '../pages';
import { RouteEnum } from '../common-types';

export const App: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={RouteEnum.main} element={<UsersList />}></Route>
        <Route path={`${RouteEnum.user}/:username`} element={<UserProfile />}></Route>
      </Routes>
    </HashRouter>
  );
};
