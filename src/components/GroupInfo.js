import React, { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const GroupInfo = () => {

  const { currentGroup } = useContext(FirebaseContext)
  
  return (
    <div>
      <h3 className="text-center uppercase text-lg font-bold" >{currentGroup.name}</h3>
    </div>
  )
}