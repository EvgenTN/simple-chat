import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const SearchResultList = () => {
  const {searchResult, searchContactList, fetchMessages, currentChat, selectChat} = useContext(FirebaseContext)

  const [unitedSearchResult, setUnitedSearchResult] = useState([])

  const collectChats = () => {
    const colList = searchContactList.concat(searchResult)
    colList.sort((a, b) => b.lastMessageCreatedAt?.seconds - a.lastMessageCreatedAt?.seconds)
    setUnitedSearchResult(colList)
  }

  useEffect(() => {
    collectChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult, searchContactList])
  
  const selectChatFromList = (id) => {
    fetchMessages(id)
    selectChat(unitedSearchResult.find(chat => chat.id === id))
  }

  return (
    <div className="px-2">
      {
        unitedSearchResult.map(i => {
          return (
            <div className={`flex items-center cursor-pointer hover:bg-gray-200 justify-start ${currentChat.id === i.id ? 'bg-gray-200' : ''}`} key={i.id} onClick={() => selectChatFromList(i.id)}>
              <div className="w-1/6 h-10 rounded-full border border-gray-400 flex justify-center items-center">
                {
                  i.logo ?
                    <img className="w-8 h-8 rounded-full" src={i.logo} alt="" /> :
                    <svg className="w-8 h-8 rounded-full" viewBox="0 0 24 24">
                      <path d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z" />
                    </svg>
                }
              </div>
              <div className="text-sm w-5/6">
                <p className="text-gray-900 pl-1 truncate">{i.name}</p>
                <p className="text-gray-600 pl-1 truncate">{i.lastMessage}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}