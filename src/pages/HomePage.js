import React from 'react'
import { GroupsList } from '../components/GroupsList';
import { MessageBoard } from '../components/MessageBoard';
import { NewMessage } from '../components/NewMessage';
import { Search } from '../components/Search';
import { SearchResultList } from '../components/SearchResultList';
import { AppHeader } from '../components/AppHeader';

export const HomePage = () => {


  return (
    <div>
      <AppHeader />
      <div className="w-full flex h-else">
        <div className="w-1/5">
          <Search />
          <GroupsList />
          <SearchResultList />
        </div>
        <div className="w-4/5 flex flex-col justify-between">
          <MessageBoard />
          <NewMessage />
        </div>
      </div>
    </div>
  )
}