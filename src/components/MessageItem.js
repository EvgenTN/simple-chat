import React, { useContext } from 'react'
import { FirebaseContext } from '../context/firebase/firebaseContext'
import userPlaceholder from '../assets/user-placeholder.png'


export const MessageItem = ({ message }) => {

  const {currentUser} = useContext(FirebaseContext)

  const formatedDate = () => {
    return new Date(message.createdAt.seconds * 1000).toISOString().slice(0, -8).replace('T', ' ')
  }

  const align = currentUser.displayName === message.userName ? 'self-end' : 'self-start'

  return (
    <div className={`${align} flex rounded border bg-white py-4 pr-4 pl-2 m-2  w-auto max-w-md`}>
      <div>
        <img className="w-8 h-8 m-2 rounded-full" src={message.userLogo ? message.userLogo : userPlaceholder} alt=""></img>
      </div>
      <div>
        <h3 className="flex justify-between items-center text-lg mb-2">
          <p className="font-bold mr-2">
            {message.userName}
          </p>
          <p className="text-sm text-gray-600">{formatedDate()}</p>
        </h3>
        <p>
          {message.text}
        </p>
      </div>
    </div>
  )
}