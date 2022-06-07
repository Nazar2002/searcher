import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { RouteEnum } from '../../common-types';
import './style.scss';

interface IProps {
  login: string;
  image: string;
  repositoryUrl: string;
}

export const UserItem: FC<IProps> = memo(function UserItem({
  login,
  image,
  repositoryUrl,
}: IProps) {
  return (
    <div className="user-item">
      <Link to={`${RouteEnum.user}/${login}`}>
        <div>
          <div className="user-item__image">
            <img src={image} alt="user-image" />
          </div>
          <p>{login}</p>
        </div>
        <p className="hidden-text" title={repositoryUrl}>
          Repository: {repositoryUrl}
        </p>
      </Link>
    </div>
  );
});
