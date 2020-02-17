import React, { useContext, useEffect, useState } from 'react'
import { ChatList } from '../components/ChatList'
import { MessageBoard } from '../components/MessageBoard';
import { NewMessage } from '../components/NewMessage';
import { Search } from '../components/Search';
import { SearchResultList } from '../components/SearchResultList';
import { AppHeader } from '../components/AppHeader';
import { NewGroupModal } from '../components/NewGroupModal';
import { NewFriendModal } from '../components/NewFriendModal';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { AddButton } from '../components/AddButton';
import { SettingsModal } from '../components/SettingsModal';
import { GroupInfo } from '../components/GroupInfo';

export const HomePage = () => {

  const { searchResult, currentChat, groupIdList } = useContext(FirebaseContext)
  const [isInList, setIsInList] = useState(true)

  const checkGroup = () => {
    if (!currentChat.id) return;
    if (currentChat.uName1) {
      setIsInList(true)
      return
    }
    const groupAdded = groupIdList.find(id => id === currentChat.id)
    if (groupAdded) {
      setIsInList(true)
    } else {
      setIsInList(false)
    }
  }

  useEffect(() => {
    checkGroup()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, groupIdList])

  return (
    <div className="relative" >
      <NewFriendModal />
      <NewGroupModal />
      <SettingsModal />
      <AppHeader />
      <div className="w-full flex h-else">
        <div className="w-1/5">
          <Search />
          {!searchResult ? 
            <ChatList /> :
            <SearchResultList />
          }
        </div>
        <div className="w-3/5 flex flex-col justify-between">
          <MessageBoard />
          {isInList ? 
            <NewMessage /> :
            <AddButton />
          }
        </div>
        <div className="w-1/5" >
          <GroupInfo />
        </div>
      </div>
    </div>
  )
}