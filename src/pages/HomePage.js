import React, { useContext, useEffect, useState } from 'react'
import { GroupsList } from '../components/GroupsList';
import { MessageBoard } from '../components/MessageBoard';
import { NewMessage } from '../components/NewMessage';
import { Search } from '../components/Search';
import { SearchResultList } from '../components/SearchResultList';
import { AppHeader } from '../components/AppHeader';
import { NewGroupModal } from '../components/NewGroupModal';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import { AddButton } from '../components/AddButton';
import { SettingsModal } from '../components/SettingsModal';
import { GroupInfo } from '../components/GroupInfo';

export const HomePage = () => {

  const { searchResult, currentGroup, groupsIdList } = useContext(FirebaseContext)
  const [isInList, setIsInList] = useState(true)

  const checkGroup = () => {
    if (!currentGroup.id) return
    const groupAdded = groupsIdList.find(id => id === currentGroup.id)
    if (groupAdded) {
      setIsInList(true)
    } else {
      setIsInList(false)
    }
  }

  useEffect(() => {
    checkGroup()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup, groupsIdList])

  return (
    <div className="relative" >
      <NewGroupModal />
      <SettingsModal />
      <AppHeader />
      <div className="w-full flex h-else">
        <div className="w-1/5">
          <Search />
          {!searchResult ? 
            <GroupsList /> :
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