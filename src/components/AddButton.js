import React, { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const AddButton = () => {

  const {currentGroup, addGroupToList} = useContext(FirebaseContext)

  console.log(currentGroup.id)

  if(!currentGroup.id) {
    return null
  }

  return (
    <div className="w-full flex my-1 px-3">
      <button onClick={() => addGroupToList(currentGroup.id)} className="bg-blue-900 w-full block h-10 hover:bg-gray-800 text-white font-semibold  py-2 px-4 border border-blue-900 hover:border-gray-800 rounded">
        Join
      </button>
    </div>
  )
}