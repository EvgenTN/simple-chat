import React, { useContext } from 'react';
import { FirebaseContext } from '../context/firebase/firebaseContext';
import defaultLogo from '../assets/logo192.png'

export const SearchResultList = () => {
  const {searchResult, fetchMessages, selectGroup} = useContext(FirebaseContext)

  const selectGroupFromList = (id) => {
    fetchMessages(id)
    selectGroup(searchResult.find(group => group.id === id))
  }

  return (
    <div className="px-2">
      {
        searchResult.map(i => {
          return (
            <div className="flex items-center cursor-pointer hover:bg-gray-200 justify-start" key={i.id} onClick={() => selectGroupFromList(i.id)}>
              <img className="w-1/6 h-10 rounded-full" src={defaultLogo} alt="ava" />
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