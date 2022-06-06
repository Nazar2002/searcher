import React, { ChangeEvent, FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUsersList, usersListActions } from '../../store/slices';
import { Loader, UserItem } from '../../components';
import './style.scss';

export const UsersList: FC = memo(function UsersList() {
  const { users, searchText, load } = useAppSelector((state) => state.usersListStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, [searchText]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(usersListActions.setSearchText(event.target.value));
  };

  return (
    <div className="users-searcher">
      <h1>Git hub Searcher</h1>
      <div className="search-input">
        <input onChange={handleChange} value={searchText} placeholder="Search users" />
      </div>
      <div className="list-items">
        {load ? (
          <Loader />
        ) : (
          <>
            {users?.map((el) => (
              <UserItem
                key={el.id}
                login={el.login}
                image={el.avatar_url}
                repositoryUrl={el.repos_url}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
});
