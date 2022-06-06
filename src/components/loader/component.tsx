import React, { FC } from 'react';
import './style.scss';

export const Loader: FC = () => {
  return (
    <div className="big-loader__loading">
      <div className="big-loader__preloader">
        <div className="big-loader__loader one" />
        <div className="big-loader__loader two" />
        <div className="big-loader__loader three" />
      </div>
    </div>
  );
};
