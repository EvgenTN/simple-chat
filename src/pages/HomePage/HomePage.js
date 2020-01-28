import React, { useContext } from 'react'
import { GroupsList } from '../../components/GroupsList/GroupsList';
import { MessageBoard } from '../../components/MessageBoard/MessageBoard';
import { NewMessage } from '../../components/NewMessage/NewMessage';
import { FirebaseContext } from '../../context/firebase/firebaseContext';
import { Search } from '../../components/Search';
import { SearchResultList } from '../../components/SearchResultList';

export const HomePage = () => {

  const { signOut } = useContext(FirebaseContext)

  return (
    <div>
      <Search />
      <button onClick={signOut}>Sign Out</button>
      <h2>This is homepage</h2>
      <GroupsList />
      <MessageBoard />
      <NewMessage />
      <SearchResultList />
    </div>
  )
}