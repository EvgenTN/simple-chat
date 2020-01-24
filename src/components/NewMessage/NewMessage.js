import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const NewMessage = () => {
  const [newMessage, setNewMessage] = useState('')
  const { currentGroup, currentUser, addMessage } = useContext(FirebaseContext)

  if(!currentGroup.id) {
    return null
  }

  const addNewMessage = (e) => {
    e.preventDefault()
    const payload = {
      text: newMessage,
      groupId: currentGroup.id,
      userId: currentUser.uid,
      userName: currentUser.displayName
    }
    addMessage(payload)
  } 

  return (
    <form onSubmit={addNewMessage}>
      <input placeholder="new message" value={newMessage} onChange={e => setNewMessage(e.target.value)} type="text" />
      <button type="submit">Send</button>
    </form>
  )
}