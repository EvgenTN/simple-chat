import React, { useContext } from 'react'
// import style from './MessageBoard.module.scss'
import { MessageItem } from '../MessageItem/MessageItem'
import { FirebaseContext } from '../../context/firebase/firebaseContext'

export const MessageBoard = () => {

  const { messages } = useContext(FirebaseContext)

  // console.log('user', currentUserInfo)

  if (messages.length ===0) {
    return null
  }

  return (
    <div>
      
      <h3>This is message list</h3>
      {/* <div> */}
        {messages.map(message => (
          // <div className={`${style.allmess} ${message.userId === currentUser.id ? style.mine : ''}`}>
            <MessageItem  key={message.id} message={message}/>
          // </div>
        ))}
      {/* </div> */}
    </div>
  )
}