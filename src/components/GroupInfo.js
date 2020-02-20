import React, { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import { FileInput } from './FileInput'

export const GroupInfo = () => {

  const { currentChat, uploadGroupLogo } = useContext(FirebaseContext)

  if (!currentChat.id) return null;

  return (
    <div>
      <h3 className="text-center uppercase text-lg font-bold" >{currentChat.name}</h3>
      {
        !currentChat.isContact &&
        <FileInput uploadFn={uploadGroupLogo} />
      }
    </div>
  )
}