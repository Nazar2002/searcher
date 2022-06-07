import React, { FC } from 'react';
import { IRepository } from '../../common-types';
import './style.scss';

export const RepositoryItem: FC<IRepository> = ({
  name,
  stargazers_count,
  forks_count,
  html_url,
}: IRepository) => {
  return (
    <a href={html_url} target="_blank" rel="noreferrer" className="repository-item">
      <p>Repository name: {name}</p>
      <div>
        <p>Forks: {forks_count}</p>
        <p>Stars: {stargazers_count}</p>
      </div>
    </a>
  );
};
