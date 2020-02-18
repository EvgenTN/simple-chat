import React, { useContext } from 'react'
// import style from './MessageBoard.module.scss'
import { MessageItem } from './MessageItem'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const MessageBoard = () => {

  const { messages } = useContext(FirebaseContext)

  // console.log('user', currentUserInfo)

  // if (messages.length ===0) {
  //   return null
  // }

  return (
    <div className="flex flex-col overflow-y-auto flex-1 px-3 back-topography">
      {messages.map(message => (
        // <div className={`${style.allmess} ${message.userId === currentUser.id ? style.mine : ''}`}>
        <MessageItem key={message.id} message={message} />
        // </div> 
      ))}
    </div>
  )
}