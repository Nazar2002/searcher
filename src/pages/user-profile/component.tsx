import React, { ChangeEvent, FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRepositories, getUser, repositoryInfoActions } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RepositoryItem, Loader } from '../../components';
import { timeFormat } from '../../utils';
import './style.scss';

export const UserProfile: FC = memo(function UserProfile() {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();

  const user = useAppSelector((state) => state.userInfoStore.user);
  const { userRepositories, searchText, load } = useAppSelector(
    (state) => state.repositoryInfoStore,
  );

  useEffect(() => {
    dispatch(getUser(username));
    dispatch(getRepositories(username));
  }, [searchText]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(repositoryInfoActions.setSearchText(event.target.value));
  };

  return (
    <div className="users-searcher">
      <h1>Git hub Searcher</h1>
      <div className="user-page">
        <div className="user-page__image">
          <img alt="user-image" src={user?.avatar_url} />
        </div>
        <div className="user-page__info">
          <p>
            User name: <span>{user?.name}</span>
          </p>
          <p>
            Email: <span>{user?.email}</span>
          </p>
          <p>
            Location: <span>{user?.location}</span>
          </p>
          <p>
            Join date: <span>{timeFormat(user?.created_at)}</span>
          </p>
          <p>
            User followers: <span>{user?.followers}</span>
          </p>
          <p>
            User following: <span>{user?.following}</span>
          </p>
          <p>
            Company: <span>{user?.company}</span>
          </p>
          <p>
            Blog:{' '}
            <a href={user?.blog} target="_blank" rel="noreferrer">
              {user?.blog}
            </a>
          </p>
        </div>
      </div>
      <p className="user-description">
        Bio: <span>{user?.bio}</span>
      </p>
      <div className="search-input">
        <input onChange={handleChange} value={searchText} placeholder="Search user repositories" />
      </div>
      <div className="list-items">
        {load ? (
          <Loader />
        ) : (
          <>
            {userRepositories.map((el) => (
              <RepositoryItem
                key={el.id}
                id={el.id}
                name={el.name}
                forks_count={el.forks_count}
                stargazers_count={el.stargazers_count}
                html_url={el.html_url}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
});
