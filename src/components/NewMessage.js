import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'

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
    addMessage(payload).then(
      setNewMessage('')
    )
  }

  return (
    <form onSubmit={addNewMessage} className="w-full flex my-1 px-3">
      <input placeholder="Message..." value={newMessage} autoFocus type="text" onChange={e => setNewMessage(e.target.value)} className="appearance-none flex-1 block h-10 border rounded rounded-r-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 hover:border-gray-700 border-gray-400" />
      <button type="submit" className="bg-blue-900 block h-10 hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-blue-900 hover:border-gray-800 rounded rounded-l-none">
        Send
      </button>
    </form>
  )
}