import React from 'react'
import { GroupsList } from '../../components/GroupsList/GroupsList';
import { MessageBoard } from '../../components/MessageBoard/MessageBoard';
import { NewMessage } from '../../components/NewMessage/NewMessage';

export const HomePage = () => {
  return (
    <div>
      <h2>This is homepage</h2>
      <GroupsList />
      <MessageBoard />
      <NewMessage />
    </div>
  )
}