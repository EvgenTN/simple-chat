import React, { useContext } from 'react'
import { GroupsList } from '../../components/GroupsList/GroupsList';
import { MessageBoard } from '../../components/MessageBoard/MessageBoard';
import { NewMessage } from '../../components/NewMessage/NewMessage';
import { FirebaseContext } from '../../context/firebase/firebaseContext';

export const HomePage = () => {

  const { signOut } = useContext(FirebaseContext)

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
      <h2>This is homepage</h2>
      <GroupsList />
      <MessageBoard />
      <NewMessage />
    </div>
  )
}